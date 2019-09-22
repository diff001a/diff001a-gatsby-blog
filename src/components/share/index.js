import React from "react"
import styled from "styled-components"
import Button from "./button"
import { FaTwitter, FaGetPocket, FaFacebookSquare } from "react-icons/fa"

const Wrapper = styled.div`
  width: 100%;
  .inner {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin: 10px 0 50px 0;
  }
  @media screen and (max-width: 780px) {
    .inner {
      flex-wrap: wrap;
    }
  }
`

const Share = props => {
  return (
    <Wrapper>
      <h4 className="footer-midashi">
        <span>SHARE</span>
      </h4>
      <div className="inner">
        <Button
          className="twitter"
          href={`http://twitter.com/share?url=${props.url}&text=${props.title}`}
        >
          <FaTwitter />
          <span>Twitter</span>
        </Button>
        <Button
          className="facebook"
          href={`http://www.facebook.com/sharer.php?u=${props.url}&amp;t=${props.title}`}
        >
          <FaFacebookSquare />
          <span>Facebook</span>
        </Button>
        <Button
          className="hatena"
          href={`http://b.hatena.ne.jp/add?mode=confirm&amp;url=${props.url}&amp;title=${props.title}`}
        >
          <b>B!</b>
          <span>Hatena</span>
        </Button>
        <Button
          className="pocket"
          href={`http://getpocket.com/edit?url=${props.url}&title=${props.title}`}
        >
          <FaGetPocket />
          <span>Pocket</span>
        </Button>
      </div>
    </Wrapper>
  )
}

export default Share
