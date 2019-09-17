import React from "react"
import styled, { keyframes } from "styled-components"
import { useStaticQuery } from "gatsby"
import Image from "gatsby-image"

const delay = props => {
  return keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: ${props};
    }
  `
}

const Style = styled.div`
  background: ${props => props.background || "#999"};
  background: linear-gradient(45deg, #7bc6e2 0%, #fdb6c6 50%, #ffbe74 100%);
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "400px"};
  position: fixed;
  top: 0;
  left: 0;
  #bg {
    width: ${props => props.width || "100%"};
    height: ${props => props.height || "400px"};
    overflow: hidden;
    opacity: 0;
    animation: 0.4s ${delay(1)} linear 0s forwards;
    position: relative;
    z-index: 1;
    .gatsby-image-wrapper {
      width: 100vw;
      height: 100%;
      img {
        width: 100vw;
        height: 100%;
        object-fit: cover;
        position: relative;
      }
    }
    &:after {
      width: 100%;
      height: 100%;
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      background: linear-gradient(45deg, #7bc6e2 0%, #fdb6c6 50%, #ffbe74 100%);
      opacity: 1;
      z-index: 999;
      mix-blend-mode: overlay;
    }
    &:before {
      width: 100%;
      height: 100%;
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      background: linear-gradient(45deg, #7bc6e2 0%, #fdb6c6 50%, #ffbe74 100%);
      opacity: 0.6;
      z-index: 9999;
      mix-blend-mode: multiply;
    }
  }
`
const Polygon = props => {
  const data = useStaticQuery(graphql`
    query AuthQuery {
      avatar: file(absolutePath: { regex: "/tony.jpg/" }) {
        childImageSharp {
          fixed(width: 80, height: 80) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      backgroundImage: file(absolutePath: { regex: "/poly-black.png/" }) {
        childImageSharp {
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Style
      className="polygon"
      width={props.width}
      height={props.height}
      background={props.background}
    >
      <div id="bg">
        <Image
          fluid={data.backgroundImage.childImageSharp.fluid}
          style={{ width: "100%", height: "400px" }}
          objectFit="cover"
        />
      </div>
    </Style>
  )
}

export default Polygon
