import React from "react"
import styled from "styled-components"
const Wrapper = styled.span`
  span {
    background: rgba(255, 250, 118, 0.4);
    padding: 3px 0;
  }
`
const TextHighlighter = props => {
  const { str, includes } = props
  const temp = str.toLowerCase()
  let res = temp.replace(includes, `<span>${includes}</span>`)
  return <Wrapper dangerouslySetInnerHTML={{ __html: res }} />
}
export default TextHighlighter
