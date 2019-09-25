import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Wrapper from "./style"
import Search from "../search"
import { useSiteMetadata } from "../queries"

const Header = props => {
  const { title } = useSiteMetadata()
  // スクロール量でデザインを変える(home) //
  const [fix, setFix] = useState(false)
  useEffect(() => {
    if (props.isHome) {
      window.addEventListener("scroll", scroll)
      return () => {
        window.removeEventListener("scroll", scroll)
      }
    }
  }, [props.isHome])
  const scroll = () => {
    const amount = window.pageYOffset
    if (amount > 380) {
      setFix(true)
    } else {
      setFix(false)
    }
  }

  return (
    <Wrapper className={`${props.className} ${fix ? "fixed" : ""}`}>
      <div className="line"></div>
      <div className="inner">
        <Link to="/" className="logo">
          {title}
        </Link>
        <div className="right">
          <Search className={`${props.className} ${fix ? "fixed" : ""}`} />
        </div>
      </div>
    </Wrapper>
  )
}

export default Header
