---
title: 【styled-components】keyframesにpropsを渡す方法
date: "2019-08-06T22:12:03.284Z"
description: "React で styled-components を使っている時に、keyframes に props を渡す方法です。
よく忘れるので忘備録代わりにメモしておきます ✍️"
slug: "styled-components-keyframes"
keywords: JavaScript
tags:
    - React
    - styled-components
---

React で styled-components を使っている時に、keyframes に props を渡す方法です。
よく忘れるので忘備録代わりにメモしておきます ✍️

## やりたいこと (これは動きません)

```javascript
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    // ここでpropsを使いたい... //
    transform: rotate(${props.rotation});
  }
`

export const Wrapper = styled.div`
  &.rotate {
    animation: ${rotate} 0.4s ease forwards;
  }
`
```

## 解決策: keyframes を返す関数を定義する

```javascript
const rotate = props => {
  return keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(${props.rotation});
    }
  `
}
```

## Wrapper 内で props を渡して呼び出し

```javascript
export const Wrapper = styled.div`
  &.rotate {
    animation: ${props => rotate(props.deg)} 0.4s ease forwards;
  }
`
```

## DONE🎉
