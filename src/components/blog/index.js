import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { rgba } from "polished"
import { Tags, PublishDate } from "../../components/modules"
import { colors } from "../../style/GlobalStyle"

/* ===============================================
#  style
=============================================== */
const BlogWrapper = styled.article`
  margin-bottom: 35px;
  padding-bottom: 35px;
  border-bottom: 1px solid ${rgba(colors.gray, 0.3)};
  &:last-child {
    border-bottom: none;
  }
  a {
    text-decoration: none;
  }
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    padding-bottom: 5px;
    a {
      transition: 0.3s ease;
      &:hover {
        color: var(--primary);
      }
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
  }
  p {
    line-height: 1.8;
    padding: 15px 0 25px 0;
    font-size: 0.95rem;
  }
  @media screen and (max-width: 780px) {
    margin-bottom: 25px;
    padding-bottom: 25px;
    .info {
      flex-direction: column;
      .date {
        margin-bottom: 7px;
      }
    }
  }
`
/* ===============================================
#  Blog
=============================================== */
const Blog = props => {
  let content = props.description || props.excerpt
  if (content.length >= 105) {
    content = `${content.substr(0, 105)}...`
  }
  return (
    <BlogWrapper key={props.slug}>
      <div>
        <h2>
          <Link to={props.slug}>{props.title}</Link>
        </h2>
      </div>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </section>
      <div className="info">
        <PublishDate date={props.date} />
        <Tags tags={props.tags} />
      </div>
    </BlogWrapper>
  )
}

export default Blog
