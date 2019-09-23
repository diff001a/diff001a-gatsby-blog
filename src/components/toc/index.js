import React, { useState } from "react"
import styled from "styled-components"
import { FaCaretDown } from "react-icons/fa"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .mokuji-midashi {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      font-weight: 600;
      padding-bottom: 5px;
    }
    .open-button {
      transition: 0.3s ease;
      cursor: pointer;
      padding: 5px 5px 5px 5px;
      svg {
        font-size: 1.3rem;
      }
      &.open {
        transform: rotate(180deg) translateY(5px);
      }
      &.close {
        transform: rotate(0deg) translateY(0px);
      }
    }
  }
  .mokuji {
    width: auto;
    background: var(--paleGray);
    padding: 20px 30px 10px 30px;
    font-size: 0.9rem;
    margin: 50px 0;
    border-radius: 3px;
    ul {
      width: auto;
      margin: 0;
      padding-left: 20px;
      li {
        padding: 10px 0;
        color: #96acb3;
        border-bottom: 1px dashed #c3d8de;
        list-style: decimal;
        line-height: 1.5;
        p {
          border-bottom: 1px dashed #c3d8de;
          padding-bottom: 10px;
        }
        &:last-child {
          border-bottom: none;
        }
      }
      a {
        text-decoration: none;
      }
      ul {
        padding-left: 30px;
      }
    }
    .mokuji-content {
      overflow: hidden;
      transition: max-height 0.4s ease, padding 0s ease 0.3s;
      &.open {
        max-height: 1000px;
        padding-top: 10px;
        padding-bottom: 10px;
        transition: max-height 0.4s ease, padding 0s ease 0s;
      }
      &.close {
        max-height: 0;
      }
    }
  }
  @media screen and (max-width: 780px) {
    .mokuji {
      margin: 0 0 30px 0;
      padding: 20px 20px 10px 20px;
    }
  }
`

const TOC = props => {
  const [open, switchOpen] = useState(false)
  return (
    <Wrapper className="mokuji-wrapper">
      <div className="mokuji">
        <div className="mokuji-midashi">
          <h4>目次</h4>
          <div
            onClick={() => switchOpen(!open)}
            className={`open-button ${open ? "open" : "close"}`}
          >
            <FaCaretDown />
          </div>
        </div>
        <div
          className={`mokuji-content ${open ? "open" : "close"}`}
          dangerouslySetInnerHTML={{
            __html: props.data,
          }}
        />
      </div>
    </Wrapper>
  )
}

export default TOC
