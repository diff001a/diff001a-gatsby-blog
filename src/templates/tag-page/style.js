import styled from "styled-components"
import { rgba } from "polished"
import { colors } from "../../style/GlobalStyle"

const Wrapper = styled.div`
  .top {
    padding-top: 30px;
    padding-bottom: 110px;
    text-align: center;
    h1 {
      font-size: 1.8rem;
      font-weight: 600;
      padding-bottom: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        margin-right: 5px;
        margin-bottom: 3px;
        color: ${rgba(colors.text, 0.4)};
      }
    }
    p {
      font-size: 0.9rem;
    }
  }
`

export default Wrapper
