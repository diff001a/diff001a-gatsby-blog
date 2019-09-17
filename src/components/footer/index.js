import React from "react"
import { useStaticQuery } from "gatsby"
import styled from "styled-components"
import { FaRss, FaSitemap } from "react-icons/fa"

const Wrapper = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  z-index: 9999999;
  padding: 10px 0;
  display: flex;
  margin-top: auto;
  justify-content: center;
  background: var(--background);
  margin: 0;
  .inner {
    font-size: 0.9rem;
    display: flex;
    width: 100%;
    max-width: var(--width);
    address {
      font-weight: 600;
    }
    .right {
      margin-left: auto;
      a {
        font-size: 1rem;
        text-decoration: none;
        margin-right: 35px;
        font-weight: 600;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  @media screen and (max-width: 780px) {
    .inner {
      padding: 0 10px;
    }
  }
`

const Footer = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            social {
              twitter
              github
            }
          }
        }
      }
    `
  )
  return (
    <Wrapper>
      <div className="inner">
        <address>© {site.siteMetadata.author}. All rights reserved.</address>
        <div className="right">
          <a href={`${site.siteMetadata.siteUrl}/sitemap.xml`}>
            <FaSitemap />
          </a>
          <a href={`${site.siteMetadata.siteUrl}/rss.xml`}>
            <FaRss />
          </a>
        </div>
      </div>
    </Wrapper>
  )
}

export default Footer
