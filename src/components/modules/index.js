import React from "react"
import styled from "styled-components"
import _ from "lodash"
import { rgba } from "polished"
import { colors } from "../../style/GlobalStyle"
import { Link } from "gatsby"
import { FaHashtag, FaCalendarAlt } from "react-icons/fa"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  svg {
    color: ${rgba(colors.primary, 0.4)};
    margin-right: 5px;
  }
  a.tag {
    margin-right: 15px;
    color: ${colors.primary};
    text-decoration: none;
    border-radius: 5px;
    transition: 0.3s ease;
    font-weight: 500;
    font-size: 0.85rem;
    position: relative;
    &:after {
      content: " ,";
      position: absolute;
      right: -7px;
      bottom: 0;
    }
    &:last-child {
      margin-right: 0;
      &:after {
        content: "";
      }
    }
    &:hover {
      text-decoration: underline;
    }
  }
  &.date {
    color: ${rgba(colors.text, 0.7)};
    svg {
      color: ${rgba(colors.text, 0.4)};
      margin-right: 10px;
    }
  }
`

export const Tags = props => {
  const tags =
    props.tags.length !== 0 ? (
      <Wrapper className="tags">
        <FaHashtag />
        {_.map(props.tags, e => (
          <Link to={`/tags/${e}/`} className="tag" key={e}>
            {e}
          </Link>
        ))}
      </Wrapper>
    ) : (
      ""
    )
  return tags
}

export const PublishDate = props => {
  return (
    <Wrapper className="date">
      <FaCalendarAlt />
      <span>{props.date}</span>
    </Wrapper>
  )
}
