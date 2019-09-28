import styled from "styled-components"

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  color: #ffffff;
  z-index: 99999;
  height: 70px;
  padding-top: 5px;
  transition: 0.6s ease;
  background: rgba(255, 255, 255, 0);
  a {
    color: #fff;
    text-decoration: none;
  }
  .line {
    transition: 0.4s ease;
  }
  .inner {
    display: flex;
    align-items: center;
    width: var(--width);
    .logo {
      font-weight: 600;
      text-transform: uppercase;
    }
    .right {
      margin-left: auto;
      font-size: 1.1rem;
      display: flex;
      align-items: flex-start;
      a {
        margin-right: 30px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  &.notHome,
  &.fixed {
    background: var(--background);
    .line {
      opacity: 1;
      transition: 0.3s ease-in-out;
      width: 100%;
      height: 5px;
      background: linear-gradient(45deg, #7bc6e2 0%, #fdb6c6 50%, #ffbe74 100%);
      position: absolute;
      left: 0;
      top: 0;
    }
    color: var(--text);
    a {
      color: var(--text);
      transition: 0.3s ease;
      img {
        transition: 0.3s;
      }
      &:hover {
        opacity: 0.5;
      }
      &.logo {
        &:hover {
          color: var(--primary);
          opacity: 1;
        }
      }
    }
  }
  @media screen and (max-width: 780px) {
    padding: 0 10px;
    .inner {
      .feedly-img {
        width: 20px;
        height: 20px;
      }
    }
  }
`

export default Wrapper
