import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import axios from "axios"
import { FaSearch } from "react-icons/fa"
import TextHighlighter from "./highlight"
import { Wrapper, ResultWrapper } from "./style"

const SearchResult = props => {
  // 表示非表示切り替え //
  const [className, setClassName] = useState("")
  useEffect(() => {
    let id
    if (props.focus && props.value !== "") {
      id = setTimeout(() => {
        setClassName("active")
      }, 100)
    } else {
      id = setTimeout(() => {
        setClassName("")
      }, 100)
    }
    return () => {
      clearTimeout(id)
    }
  }, [props.focus, props.value])
  // 全記事データ取得 //
  const [data, setData] = useState([])
  const getData = async () => {
    const res = await axios.get("./search.json")
    setData(res.data)
  }
  useEffect(() => {
    getData()
  }, [])
  // 記事検索 //
  const [result, setResult] = useState(data)
  const search = () => {
    const value = props.value.toLowerCase()
    const temp = data.filter(e => {
      const target = `
        ${e.title.toLowerCase()}
        ${e.tags.join(" ").toLowerCase()}
        ${e.keywords.toLowerCase()}
      `
      return target.indexOf(value) !== -1
    })
    setResult(temp)
  }
  useEffect(() => {
    if (props.value !== "") {
      search()
    }
  }, [props.value])
  return (
    <ResultWrapper className={className}>
      <div className="result-inner">
        <span className="res">
          <b>{result.length}</b>件ヒットしました
        </span>
        <ul>
          {result.map(e => {
            return (
              <li key={e.path}>
                <Link to={e.path}>
                  <TextHighlighter str={e.title} includes={props.value} />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </ResultWrapper>
  )
}

const Search = props => {
  const [focus, setFocus] = useState(false)
  const [value, setValue] = useState("")
  const onFocus = () => {
    setFocus(true)
  }
  const onBlur = () => {
    setFocus(false)
  }
  const onChange = e => {
    setValue(e.target.value)
  }
  return (
    <Wrapper className={props.className} focus={focus}>
      <FaSearch />
      <input
        type="text"
        placeholder="Search..."
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
      <SearchResult focus={focus} value={value} />
    </Wrapper>
  )
}

export default Search
