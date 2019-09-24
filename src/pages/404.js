import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Wrapper = styled.div`
  width: var(--width);
  text-align: center;
  h1 {
    font-size: 1.4rem;
    font-weight: 600;
    padding: 10px 0;
  }
  p {
    font-size: 0.9rem;
  }
`

const NotFoundPage = (props, location) => (
  <Layout location={location} title="NOT FOUND">
    <SEO title="NOT FOUND" noindex />
    <Wrapper>
      <h1>NOT FOUND</h1>
      <p>ページが見つかりませんでした</p>
    </Wrapper>
  </Layout>
)

export default NotFoundPage
