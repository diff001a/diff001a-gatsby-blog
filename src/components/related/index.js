import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  .tab-header-wrapper {
    display: flex;
    border: 1px solid var(--lightGray);
    border-bottom: none;
    span {
      width: 50%;
      padding: 10px;
      text-align: center;
      font-size: 0.85rem;
      cursor: pointer;
      background: var(--paleGray);
      color: var(--gray);
      font-weight: 600;
      border-bottom: 1px solid var(--lightGray);
      &:first-child {
        border-right: 1px solid var(--lightGray);
      }
      &.active {
        background: var(--background);
        color: var(--text);
        border-bottom: none;
      }
    }
  }
  .tab-wrapper {
    width: 100%;
    border-top: none;
    overflow: hidden;
    .tab-item {
      width: 100%;
      border: 1px solid var(--lightGray);
      border-top: 0;
      padding: 30px 20px;
      transition: 0.3s ease;
    }
  }
  .tab-post-item {
    padding: 12px 0;
    border-bottom: 1px dashed var(--lightGray);
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .date {
      font-size: 0.75rem;
      color: var(--gray);
      padding: 3px 12px;
      margin-right: 20px;
      background: var(--paleGray);
      font-weight: 600;
      border: 1px solid var(--lightGray);
      border-radius: 3px;
    }
    .title {
      font-size: 0.9rem;
      a {
        text-decoration: none;
        font-weight: 600;
        transition: 0.3s ease;
        &:hover {
          color: var(--primary);
        }
      }
    }
  }
  @media screen and (max-width: 780px) {
    .tab-post-item {
      display: flex;
      flex-direction: column;
      .date {
        padding: 0;
      }
    }
  }
`

const Related = props => {
  const [amount, setAmount] = useState(0)
  const [isRelated, setIsRelated] = useState(true)
  const [data, setData] = useState(props.related)
  const related = () => {
    setIsRelated(true)
  }
  const latest = () => {
    setIsRelated(false)
  }
  const latestPosts = props.latest.map(e => {
    const frontmatter = e.node.frontmatter
    const temp = {
      slug: frontmatter.slug,
      date: frontmatter.date,
      title: frontmatter.title,
    }
    return temp
  })
  useEffect(() => {
    if (isRelated) {
      setData(props.related)
    } else {
      setData(latestPosts)
    }
  }, [isRelated])

  return (
    <Wrapper amount={amount}>
      <div className="tab-header-wrapper">
        <span onClick={related} className={`${isRelated ? "active" : ""}`}>
          RELATED POSTS
        </span>
        <span onClick={latest} className={`${!isRelated ? "active" : ""}`}>
          LATEST POSTS
        </span>
      </div>
      <div className="tab-wrapper">
        <div className="tab-item">
          {data.map(e => {
            return (
              <div key={`${e.slug}`} className="tab-post-item">
                <span className="date">{e.date}</span>
                <span className="title">
                  <Link to={`/${e.slug}/`}>{e.title} </Link>
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </Wrapper>
  )
}

export default Related
