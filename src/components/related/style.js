import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  .tab-header-wrapper {
    display: flex;
    border: 1px solid var(--lightGray);
    border-bottom: none;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    overflow: hidden;
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
      &.auto {
        cursor: auto;
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
      border-bottom-right-radius: 3px;
      border-bottom-left-radius: 3px;
    }
  }
  .tab-post-item {
    padding: 12px 0;
    border-bottom: 1px dashed var(--lightGray);
    display: flex;
    align-items: center;
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .date {
      font-size: 0.75rem;
      color: var(--gray);
      display: flex;
      align-items: center;
      font-weight: 600;
      margin-right: 10px;
      width: 120px;
      svg {
        margin-right: 10px;
        font-size: 0.8rem;
      }
      span {
        padding-top: 1px;
      }
    }
    .title {
      font-size: 0.85rem;
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
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      .date {
        background: none;
        padding: 0;
        border: 0;
        margin-bottom: 5px;
        svg {
          margin-right: 5px;
        }
      }
    }
    .tab-wrapper {
      .tab-item {
        padding: 10px 10px 20px 10px;
      }
    }
  }
`

export default Wrapper
