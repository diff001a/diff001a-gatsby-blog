const path = require(`path`)
const relatedPost = require(`./gatsby-related-post`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post/index.js`)
  const tagPage = path.resolve(`./src/templates/tag-page/index.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                date(formatString: "YYYY-MM-DD")
                tags
                slug
                keywords
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // 記事個別ページ //
  const posts = result.data.allMarkdownRemark.edges
  posts.forEach((post, index) => {
    // 次の記事と前の記事 //
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    // 最新記事 //
    const latestPosts_temp = []
    posts.map(e => {
      // 自分を除外 //
      if (e.node.frontmatter.slug !== post.node.frontmatter.slug) {
        const frontmatter = e.node.frontmatter
        const temp = {
          title: frontmatter.title,
          slug: frontmatter.slug,
          date: frontmatter.date,
        }
        latestPosts_temp.push(temp)
      }
    })
    const latestPosts = latestPosts_temp.slice(0, 5)
    // 関連記事 //
    const relatedPosts = relatedPost.extractRelatedPosts(
      posts,
      post,
      relatedPost.defaultConfig
    )
    // 記事ページ生成 //
    createPage({
      path: `/${post.node.frontmatter.slug}/`,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        relatedPosts,
        latestPosts,
        previous,
        next,
      },
    })
  })

  // tagページ //
  const tagListTemp = []
  posts.forEach(post => {
    const tags = post.node.frontmatter.tags
    tags.forEach(tag => {
      tagListTemp.push(tag)
    })
  })
  // 被ってるタグを削除して配列に再変換 //
  const tagSet = new Set(tagListTemp)
  const tagList = Array.from(tagSet)
  // タグページ生成 //
  if (tagList.length !== 0) {
    tagList.forEach(tag => {
      createPage({
        path: `/tags/${tag}/`,
        component: tagPage,
        context: {
          slug: tag,
        },
      })
    })
  }
}
