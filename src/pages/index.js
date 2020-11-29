import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Blog from "../components/blog"
import Polygon from "../components/polygon"
import Image from "gatsby-image"

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
  .message {
    position: absolute;
    width: 100%;
    padding: 0 10px;
    max-width: var(--width);
    top: 0;
    right: 0;
    left: 0;
    margin: auto;
    text-align: center;
    height: var(--topHeight);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #ffffff;
    z-index: 9999;
    h1 {
      font-size: 1.8rem;
      text-transform: uppercase;
      font-weight: 600;
    }
    .gatsby-image-wrapper {
      border-radius: 50%;
      opacity: 0.8;
      margin-top: 15px;
      margin-bottom: 15px;
    }
  }
  @media screen and (max-width: 780px) {
    margin-bottom: 40px;
  }
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
        <div className="message">
          <Image fixed={data.avatar.childImageSharp.fixed} alt="author" />
          <h1>{data.site.siteMetadata.title}</h1>
          <p>{data.site.siteMetadata.description}</p>
        </div>
        <div className="inner" itemScope itemType="http://schema.org/Blog">
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
    avatar: file(absolutePath: { regex: "/tony.jpg/" }) {
      childImageSharp {
        fixed(width: 80, height: 80) {
          ...GatsbyImageSharpFixed
        }
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
