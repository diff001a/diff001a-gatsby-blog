import styled from "styled-components"

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
  .polygon-area {
    position: fixed;
    top: 0;
    .gatsby-image-wrapper {
      width: 100%;
      height: 400px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--background);
    .inner {
      width: 100%;
      padding: 0 10px;
      max-width: calc(var(--width) + 18px);
      position: relative;
    }
    &.home {
      top: var(--topHeight);
      position: absolute;
    }
    &.notHome {
      padding-top: 100px;
      padding-bottom: 100px;
    }
  }
`

export default Wrapper
