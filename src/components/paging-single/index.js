import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
  .paging-item {
    width: 50%;
    display: flex;
    align-items: center;
    padding: 15px 0px 20px 0;
    font-size: 0.85rem;
    a {
      text-decoration: none;
      width: 100%;
      transition: 0.3s ease;
      &:hover {
        color: var(--primary);
      }
      i {
        letter-spacing: 0.02rem;
        color: var(--gray);
        font-style: italic;
        display: inline-block;
        margin-bottom: 7px;
        font-weight: 600;
      }
      div {
        display: flex;
        align-items: center;
        font-weight: 600;
        width: 100%;
        svg {
          width: 20px;
          color: var(--gray);
        }
      }
    }
    &.prev {
      padding-right: 10px;
      a {
        div {
          svg {
            margin-right: 8px;
          }
        }
      }
    }
    &.next {
      text-align: right;
      padding-left: 10px;
      a {
        div {
          justify-content: flex-end;
          svg {
            margin-left: 8px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 780px) {
    flex-direction: column;
    .paging-item {
      width: 100%;
      padding: 0;
      padding: 10px 0px 10px 0;
      justify-content: center;
      &.prev {
        border-right: none;
        border-bottom: 1px solid var(--lightGray);
      }
      &.prev,
      &.next {
        text-align: center;
        padding: 15px 0;
        a div {
          text-align: center;
          justify-content: center;
          svg {
            display: none;
          }
        }
      }
    }
  }
`

const Paging = props => {
  const isNextExit =
    props.next.slug !== "" && props.next.title !== "" ? true : false
  const isPrevExit =
    props.prev.slug !== "" && props.prev.title !== "" ? true : false
  return (
    <Wrapper className="paging">
      <div className="paging-item prev">
        {isPrevExit ? (
          <Link to={props.prev.slug}>
            <i>Prev Post</i>
            <div>
              <FaAngleDoubleLeft />
              <span>{props.prev.title}</span>
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="paging-item next">
        {isNextExit ? (
          <Link to={props.next.slug}>
            <i>Next Post</i>
            <div>
              <span>{props.next.title}</span>
              <FaAngleDoubleRight />
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>
    </Wrapper>
  )
}

export default Paging
