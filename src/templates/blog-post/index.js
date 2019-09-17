import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { Tags } from "../../components/modules"
import Paging from "../../components/paging-single"
import Share from "../../components/share"
import Wrapper from "./style"

const BlogPostTemplate = ({ data, location, pageContext }) => {
  const post = data.markdownRemark
  const site = data.site.siteMetadata
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Wrapper className="inner">
        <article>
          <div className="info">
            <div className="date">{post.frontmatter.date}</div>
            <h1>{post.frontmatter.title}</h1>
            <Tags tags={post.frontmatter.tags} />
          </div>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <Share
            title={post.frontmatter.title}
            url={`${site.siteUrl}/${post.frontmatter.slug}/`}
          />
        </article>
        <Paging
          prev={{
            slug: previous ? `/${previous.frontmatter.slug}/` : "",
            title: previous ? previous.frontmatter.title : "",
          }}
          next={{
            slug: next ? `/${next.frontmatter.slug}/` : "",
            title: next ? next.frontmatter.title : "",
          }}
        />
      </Wrapper>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        slug
      }
    }
  }
`
