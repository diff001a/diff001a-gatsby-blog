import React from "react"
import { FaHashtag } from "react-icons/fa"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Blog from "../../components/blog"
import Wrapper from "./style"

const TagPageTemplate = ({ data, location, pageContext }) => {
  const tagName = pageContext.slug
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout location={location} title="title">
      <SEO
        title={`タグ: ${tagName}`}
        description={`${tagName}タグを含む記事の一覧ページです`}
        noindex
      />
      <Wrapper className="inner">
        <div className="top">
          <h1>
            <FaHashtag />
            <span>{tagName}</span>
          </h1>
          <p>
            <b>{posts.length}</b>件の投稿があります
          </p>
        </div>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <Blog
              title={title}
              key={node.fields.slug}
              slug={`/${node.frontmatter.slug}/`}
              date={node.frontmatter.date}
              description={node.frontmatter.description}
              excerpt={node.excerpt}
              tags={node.frontmatter.tags}
            />
          )
        })}
      </Wrapper>
    </Layout>
  )
}

export default TagPageTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$slug] } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            description
            tags
            slug
          }
        }
      }
    }
  }
`
