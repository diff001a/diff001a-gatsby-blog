import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Wrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 40px;
  .related-inner {
    background: var(--paleGray);
    padding: 20px;
    border-radius: 5px;
    .related-post {
      padding: 10px 0;
      text-decoration: none;
      display: flex;
      align-items: center;
      border-bottom: 1px dashed var(--lightGray);
      &:last-child {
        border-bottom: none;
      }
      span {
        display: inline-block;
      }
      .date {
        margin-right: 10px;
        font-size: 0.8rem;
        font-style: italic;
        text-align: center;
        width: 110px;
        letter-spacing: 0.1rem;
      }
      .title {
        font-size: 0.9rem;
        font-weight: 600;
        a {
          transition: 0.3s ease;
          text-decoration: none;
          &:hover {
            color: var(--primary);
          }
        }
      }
    }
  }
  @media screen and (max-width: 780px) {
    .related-inner {
      padding: 15px;
      .related-post {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .date {
          text-align: left;
        }
      }
    }
  }
`

const Related = props => {
  return (
    <Wrapper>
      <h4 className="footer-midashi">
        <span>RELATED POSTS</span>
      </h4>
      <div className="related-inner">
        {props.data.map(e => {
          return (
            <div key={e.slug} className="related-post">
              <span className="date">{e.date}</span>
              <span className="title">
                <Link to={`/${e.slug}/`}>{e.title} </Link>
              </span>
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}

export default Related
