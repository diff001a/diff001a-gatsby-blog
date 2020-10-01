import styled from "styled-components"
import { rgba } from "polished"
import { colors } from "../../style/GlobalStyle"

const Wrapper = styled.div`
  padding-bottom: 800px;
  /* ===============================================
  #  title area
  =============================================== */
  .info {
    margin-top: 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .date {
      font-size: 0.9rem;
      font-style: italic;
      position: relative;
      padding: 0 35px;
      &:before,
      &:after {
        content: "";
        width: 20px;
        height: 1px;
        background: ${rgba(colors.primary, 0.6)};
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
      }
      &:before {
        left: 0;
      }
      &:after {
        right: 0;
      }
    }
    h1 {
      font-size: 1.8rem;
      font-weight: 600;
      text-align: center;
      padding: 30px 0;
    }
  }
  article {
    section {
      /* ===============================================
      #  midashi
      =============================================== */
      p {
        line-height: 2;
        margin: 20px 0;
      }
      h2 {
        width: 100%;
        position: relative;
        font-size: 1.2rem;
        margin-top: 50px;
        padding-bottom: 10px;
        margin-bottom: 20px;
        font-weight: 600;
        width: 100%;
        vertical-align: center;
        &:before {
          position: absolute;
          content: "";
          background: linear-gradient(
            45deg,
            #c488d0 0%,
            #fdb6c6 50%,
            #ffbe74 100%
          );
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          z-index: 0;
          opacity: 0.7;
        }
        &:after {
          content: "";
          position: absolute;
          width: 50%;
          height: 2px;
          bottom: 0;
          right: 0;
          right: 0;
          margin: auto;
          z-index: 1;
          opacity: 1;
          border-bottom: 2px dashed var(--background);
        }
      }
      h3 {
        font-size: 1.1rem;
        font-weight: 600;
        margin-top: 35px;
        margin-bottom: 15px;
        display: flex;
        padding: 7px 0 7px 15px;
        position: relative;
        &:before {
          content: "";
          width: 3px;
          height: 100%;
          background: linear-gradient(180deg, #e49df2 0%, #fdb6c6 100%);
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          border-radius: 5px;
          opacity: 0.8;
        }
      }
      h4 {
        font-size: 1rem;
        margin: 20px 0 10px 0;
        padding: 14px 10px;
        background: var(--paleGray);
      }
      h5,
      h6 {
        font-weight: 600;
        padding-top: 20px;
        margin-bottom: 10px;
      }
      /* ===============================================
      #  list 
      =============================================== */
      ul,
      ol {
        padding: 20px;
        background: var(--paleGray);
        margin: 10px 0;
        border-radius: 3px;
        li {
          list-style: none;
          position: relative;
        }
      }
      ul {
        li {
          padding: 10px 0 10px 25px;
          border-bottom: 1px dashed var(--lightGray);
          &:last-child {
            border-bottom: 0;
          }
          &:before {
            content: "";
            width: 8px;
            height: 8px;
            border-right: 2px solid var(--primary);
            border-bottom: 2px solid var(--primary);
            transform: rotate(-45deg);
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            margin: auto;
          }
        }
      }
      ol {
        counter-reset: number 0;
        li {
          padding: 10px 0 10px 0px;
          border-bottom: 1px dashed var(--lightGray);
          &:last-child {
            border-bottom: 0;
          }
          &:before {
            counter-increment: number 1;
            content: counter(number) ".";
            font-weight: 600;
            color: var(--primary);
            margin-right: 12px;
          }
        }
      }
    }
    /* ===============================================
    #  img
    =============================================== */
    .gatsby-resp-image-wrapper {
      overflow: hidden;
      box-shadow: rgba(20, 20, 20, 0.1) 1px 1px 20px;
      transition: 0.2s ease-in-out;
      margin: 20px 0;
      border-radius: 3px;
      &:hover {
        box-shadow: rgba(20, 20, 20, 0.2) 1px 1px 20px;
      }
    }
    .gatsby-highlight {
      margin: 15px 0;
    }
    section {
      padding-bottom: 50px;
      a {
        color: var(--primary);
        font-weight: 600;
        position: relative;
        display: inline-block;
        text-decoration: none;
        transition: 0.3s ease;
        padding: 0 2px;
        &:before {
          width: 0%;
          height: 70%;
          content: "";
          background: ${rgba(colors.primary, 0.15)};
          position: absolute;
          z-index: 0;
          top: 4px;
          left: -1px;
          transition: 0.3s ease;
        }
        &:hover {
          &:before {
            width: 100%;
          }
        }
      }
    }
    .footer-midashi {
      width: 100%;
      position: relative;
      padding-top: 10px;
      padding-bottom: 10px;
      font-weight: 600;
      width: 100%;
      vertical-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
      &:before {
        position: absolute;
        content: "";
        background: linear-gradient(
          45deg,
          #c488d0 0%,
          #fdb6c6 50%,
          #ffbe74 100%
        );
        width: 100%;
        height: 2px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 0;
        opacity: 0.7;
      }
      span {
        background: var(--background);
        z-index: 999;
        position: absolute;
        padding: 0 30px;
      }
    }
  }
  .placeholder {
    font-size: 14px;
  }
  #disqus_thread {
    padding-top: 20px;
    margin-bottom: 50px;
  }

  @media screen and (max-width: 780px) {
    .info {
      margin-top: 10px;
      margin-bottom: 60px;
      h1 {
        font-size: 1.5rem;
      }
    }
  }
`

export default Wrapper
