import React from "react"
import { StaticQuery } from "gatsby"
import styled from "styled-components"
import { FaGithub, FaRss, FaSitemap } from "react-icons/fa"
import { useSiteMetadata } from "../queries"
import Img from "gatsby-image"

const Wrapper = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  z-index: 9999999;
  padding: 20px 0;
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
      font-weight: 400;
    }
    .right {
      margin-left: auto;
      display: flex;
      align-items: center;
      a {
        font-size: 1.1rem;
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
      flex-direction: column-reverse;
      address,
      .right {
        width: 100%;
        display: flex;
        justify-content: center;
      }
      .right {
        margin-bottom: 20px;
      }
    }
  }
`

const Feedly = () => {
  return (
    <StaticQuery
      query={graphql`
        query FeedlyQuery {
          avatar: file(absolutePath: { regex: "/feedly.png/" }) {
            childImageSharp {
              fixed(width: 22, height: 22) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={data => <Img fixed={data.avatar.childImageSharp.fixed} />}
    />
  )
}

const Footer = () => {
  const { author, social, siteUrl } = useSiteMetadata()
  return (
    <Wrapper>
      <div className="inner">
        <address>© {author}. All rights reserved.</address>
        <div className="right">
          {social.github !== "" ? (
            <a
              href={`https://github.com/${social.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          ) : (
            ""
          )}
          <a
            href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fdiff001a.netlify.com%2Frss.xml"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Feedly />
          </a>
          <a href={`${siteUrl}/sitemap.xml`}>
            <FaSitemap />
          </a>
          <a href={`${siteUrl}/rss.xml`}>
            <FaRss />
          </a>
        </div>
      </div>
    </Wrapper>
  )
}

export default Footer
