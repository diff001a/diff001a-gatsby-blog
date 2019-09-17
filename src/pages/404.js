import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Polygon from "../components/polygon"
import SEO from "../components/seo"
import GlobalStyle from "../style/GlobalStyle"

const Wrapper = styled.div`
  position: relative;
  .polygon {
    z-index: -1;
  }
  .not-found {
    width: 100%;
    height: 100vh;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    top: 0;
    z-index: 9999;
    h1 {
      font-size: 2rem;
    }
  }
  a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.25);
    padding: 10px 30px;
    margin-top: 30px;
    font-size: 0.8rem;
    border-radius: 33px;
  }
`

const NotFoundPage = () => (
  <Wrapper>
    <SEO title="404: Not found" />
    <Polygon width="100%" height="100vh" />
    <div className="not-found">
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Link to="/">BACK TO TOP</Link>
    </div>
    <GlobalStyle />
  </Wrapper>
)

export default NotFoundPage
