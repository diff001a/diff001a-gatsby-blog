import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Blog from "../components/blog"
import Polygon from "../components/polygon"

/* ===============================================
#  page component
=============================================== */

const Wrapper = styled.div`
  background: var(--background);
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 370px;
  padding-top: 50px;
  padding-bottom: 50px;
  z-index: 999;
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout location={location} title={siteTitle} description={siteDescription}>
      <SEO title="diff001a's blog" />
      <Polygon
        height="400px"
        background="linear-gradient(45deg, #7bc6e2 0%, #fdb6c6 50%, #ffbe74 100%)"
      />
      <Wrapper>
        <div className="inner">
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
        </div>
      </Wrapper>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
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
            date(formatString: "MMMM DD, YYYY")
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
