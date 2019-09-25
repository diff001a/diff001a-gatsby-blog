import { css, createGlobalStyle, keyframes } from "styled-components"
import { rgba } from "polished"

/* ===============================================
#  color setting
=============================================== */
export const colors = {}

colors.background = "#fffeff"
colors.text = "#617e8c"

colors.paleGray = "#f9f9f9"
colors.lightGray = "#ddd"
colors.gray = "#96acb3"

colors.primaryPurple = "#9E69D7"
colors.primary = "#FA96BB"
colors.primaryLight = rgba("#FA96BB", 0.15)
colors.primaryPale = rgba("#FA96BB", 0.07)

colors.secondary = "#FFB238"
colors.danger = "#FF5C55"
colors.success = "#4FCE7A"
colors.warn = "#feaa2e"
colors.info = "#2490eb"

/* ===============================================
#  other variables
=============================================== */

export const fadeIn = keyframes`
  0% {
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`

export const fadeOut = keyframes`
  0% {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
  }
`

export const size = {
  width: "800px",
  topHeight: "370px",
}

/* ===============================================
#  set css variables
=============================================== */
function setColor() {
  let styles = ""
  for (const key in colors) {
    styles += `--${key}: ${colors[key]};`
  }
  return css`
    :root {
      ${styles}
      --width: ${size.width};
      --topHeight: ${size.topHeight};
    }
  `
}

/* ===============================================
#  font setting
=============================================== */
const font = css`
  font-family: -apple-system, system-ui, "Helvetica Neue", "Segoe UI",
    "Hiragino Kaku Gothic ProN", "Hiragino Sans", "ヒラギノ角ゴ ProN W3", Arial,
    メイリオ, Meiryo, sans-serif;
  word-wrap: break-word;
  word-break: break-all;
  -moz-font-feature-settings: "palt";
  -webkit-font-feature-settings: "palt";
  font-feature-settings: "palt";
  font-variant-ligatures: no-common-ligatures;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: auto;
  -webkit-text-stroke: 1px transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  letter-spacing: 0.05rem;
  font-weight: 400;
  color: var(--text);
`

/* ===============================================
#  global style
=============================================== */
const GlobalStyle = createGlobalStyle`
  ${setColor}
  html {
    font-size: 16px;
  }
  body {
    ${font}
    font-size: 16px;
    line-height: 1.5;
    padding: 0;
    margin: 0;
    min-height: 100vh;
    position: relative;
    background: var(--background);
    a {
      color: var(--text);
    } 
  }
  * {
    box-sizing: boreder-box;
    margin: 0;
    padding: 0;

  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 400;
  }
  *:before, *:after {
    box-sizing: border-box;
  }
  input, button, textarea, button, select {
    ${font}
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background: none;
    line-height: 1.5;
    font-size: 16px;
    -webkit-appearance: none; 
    &:focus {
      border: none;
      outline: none;
    }
  }
  ::selection {
    background: rgba(255, 250, 118, 0.35);
  }

  /* ===============================================
  # smart phone
  =============================================== */
  @media screen and (max-width: 780px) { 
    html, body {
      font-size: 15px;
    }
    .pc {
      display: none !important;
    }
  }

  /* ===============================================
  # pc
  =============================================== */
  @media screen and (min-width: 781px) { 
    .sp {
      display: none !important;
    }
  }
`

export default GlobalStyle
