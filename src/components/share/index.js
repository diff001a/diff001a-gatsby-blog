import React from "react"
import styled from "styled-components"
import Button from "./button"
import { FaTwitter, FaGetPocket, FaFacebookSquare } from "react-icons/fa"
import { StaticQuery } from "gatsby"
import { colors } from "../../style/GlobalStyle"
import { rgba } from "polished"
import Img from "gatsby-image"
import { useSiteMetadata } from "../queries"

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  margin-top: 20px;
  margin-bottom: 40px;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background: var(--lightGray);
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .share-header {
    background: var(--background);
    padding: 0 20px 0 0px;
    left: 0px;
    position: absolute;
    font-weight: 600;
    color: var(--gray);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
    .gatsby-image-wrapper {
      border-radius: 50%;
      margin-right: 15px;
      box-shadow: 0 2px 8px -1px rgba(0, 0, 0, 0.1),
        0 2px 10px -1px ${rgba(colors.text, 0.2)};
    }
  }
  .share-inner {
    display: flex;
    align-items: stretch;
    position: absolute;
    padding: 0 0 0 10px;
    right: 0px;
    background: var(--background);
  }

  @media screen and (max-width: 780px) {
    .inner {
      flex-wrap: wrap;
    }
    .share-header {
      display: none;
    }
    .share-inner {
      display: flex;
      position: relative;
      padding: 0 20px 0 10px;
    }
  }
`

const Share = props => {
  const { author } = useSiteMetadata()
  const data = (
    <StaticQuery
      query={graphql`
        query AuthorQuery {
          avatar: file(absolutePath: { regex: "/tony.jpg/" }) {
            childImageSharp {
              fixed(width: 40, height: 40) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={data => <Img fixed={data.avatar.childImageSharp.fixed} />}
    />
  )
  return (
    <Wrapper>
      <span className="share-header">
        {data}Written by {author}
      </span>
      <div className="share-inner">
        <Button
          className="twitter"
          href={`http://twitter.com/share?url=${props.url}&text=${props.title}`}
        >
          <FaTwitter />
        </Button>
        <Button
          className="facebook"
          href={`http://www.facebook.com/sharer.php?u=${props.url}&amp;t=${props.title}`}
        >
          <FaFacebookSquare />
        </Button>
        <Button
          className="hatena"
          href={`http://b.hatena.ne.jp/add?mode=confirm&amp;url=${props.url}&amp;title=${props.title}`}
        >
          <b>B!</b>
        </Button>
        <Button
          className="pocket"
          href={`http://getpocket.com/edit?url=${props.url}&title=${props.title}`}
        >
          <FaGetPocket />
        </Button>
      </div>
    </Wrapper>
  )
}

export default Share
