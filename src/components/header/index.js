import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import { FaTwitter, FaGithub } from "react-icons/fa"
import Wrapper from "./style"
import feedly from "../../images/feedly.png"
import feedlyWhite from "../../images/feedly-white.png"

const Header = props => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            social {
              twitter
              github
            }
          }
        }
      }
    `
  )
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
          {site.siteMetadata.title}
        </Link>
        <div className="right">
          {site.siteMetadata.social.twitter !== "" ? (
            <a
              href={`https://twitter.com/${site.siteMetadata.social.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          ) : (
            ""
          )}
          {site.siteMetadata.social.github !== "" ? (
            <a
              href={`https://github.com/${site.siteMetadata.social.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          ) : (
            ""
          )}
          <a
            href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fdiff001a.netlify.com%2Frss.xml"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              id="feedlyFollow"
              className="feedly-img"
              src={fix || !props.isHome ? feedly : feedlyWhite}
              alt="follow us in feedly"
              style={{ marginTop: "-1px" }}
            />
          </a>
        </div>
      </div>
    </Wrapper>
  )
}

export default Header
