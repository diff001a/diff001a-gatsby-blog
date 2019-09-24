exports.extractRelatedPosts = extractRelatedPosts
exports.defaultConfig = {
  keywords: 100,
  tags: 50,
  threshold: 50,
  number: 5,
}

function extractRelatedPosts(posts, post, config) {
  const tags = post.node.frontmatter.tags
  const keywords = post.node.frontmatter.keywords
  const temp_arr = []
  posts.map(e => {
    let score = 0
    const frontmatter = e.node.frontmatter
    const temp_keywords = frontmatter.keywords
    const temp_tags = frontmatter.tags
    // 自分を除外 //
    if (post.node.frontmatter.title === frontmatter.title) {
      return
    }
    // keywords //
    if (temp_keywords === keywords) {
      score += config.keywords
    }
    // tags //
    temp_tags.map(e => {
      tags.map(f => {
        if (e === f) {
          score += config.tags
        }
      })
    })
    // スコアがthresholdを下回る記事を除外 //
    if (score < config.threshold) {
      return
    }
    const temp = {
      title: frontmatter.title,
      slug: frontmatter.slug,
      date: frontmatter.date,
      score: score,
    }
    temp_arr.push(temp)
  })
  // score順に並び替え //
  temp_arr.sort(function(a, b) {
    return a.score < b.score ? 1 : -1
  })
  return temp_arr.slice(0, config.number)
}
