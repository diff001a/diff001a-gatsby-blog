---
title: Sass(SCSS)の関数をstyled-componentsでも使いたい
date: "2019-08-11T22:40:32.169Z"
description: Sass(SCSS)でよく使う関数を styled-components でも使いたくて、いろいろ調べてみました。
slug: sass-styled-components
keywords: JavaScript
tags:
  - React
  - styled-components
  - polished
---

Sass(SCSS)でよく使う関数を styled-components でも使いたくて、いろいろ調べてみました。

## まずは自力でなんとかしてみる

`rgba` `lighten` `darken`など色に関わる sass 関数を使いたい場面が出てきた為、以下のような関数を定義して一箇所にまとめておき、必要な場面で呼び出す、というような事をしていました。

### rgba function

```javascript
export const rgba = (hex, alpha = 1) => {
  let r = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  let c = null
  if (r) {
    c = r.slice(1, 4).map(x => parseInt(x, 16))
  }
  r = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i)
  if (r) {
    c = r.slice(1, 4).map(x => 0x11 * parseInt(x, 16))
  }
  if (!c) {
    return null
  }
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`
}
```

### rgba function 呼び出し

```javascript
const color = rgba("#999999", 0.5)
```

### lighten function と darken function

```javascript
// lighten //
export const lighten = (hex, amount = 1) => {
  const amt = amount * 100
  const temp = getColor(hex, amt)
  return temp
}
// darken //
export const darken = (hex, amount = 1) => {
  const amt = -(amount * 100)
  const temp = getColor(hex, amt)
  return temp
}
// 共通 //
const getColor = (hex, amt) => {
  let usePound = false
  if (hex[0] == "#") {
    hex = hex.slice(1)
    usePound = true
  }
  const num = parseInt(hex, 16)
  let r = (num >> 16) + amt
  if (r > 255) {
    r = 255
  } else if (r < 0) {
    r = 0
  }
  let b = ((num >> 8) & 0x00ff) + amt
  if (b > 255) {
    b = 255
  } else if (b < 0) {
    b = 0
  }
  let g = (num & 0x0000ff) + amt
  if (g > 255) {
    g = 255
  } else if (g < 0) {
    g = 0
  }
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
}
```

### lighten & darken 呼び出し

```javascript
const lightenColor = lighten("#999999", 0.5)
const darkenColor = darken("#999999", 0.5)
```

## 結論: そんなことしなくても polished を使えばよかった！

とりあえずは上記の方法で解決したんですが、よく考えたらそういうライブラリありそうだなと思って調べてみたらやっぱりありました！[polished](https://github.com/styled-components/polished)というライブラリで、様々な Sass の便利な機能が styled-components で使えるようになります。　[ドキュメントはこちらから！](https://polished.js.org/docs/)

styled-components のチームでメンテナンスしてるみたいです。もっと早くに知りたかった 😭

### polished インストール

yarn or npm でインストール

```
yarn add polished --dev
```

### polished を使ってみる

```javascript
import { rgba, darken, lighten } from "polished"

const Style = styled.div`
  h1 {
    color: rgba("#000", 0.5);
  }
  h2 {
    color: lighten(0.5 "#000");
  }
  h3 {
    color: darken(0.5, "#000");
  }
`
```

rgba ではカラーコードが第一引数にきて、darken と lighten ではカラーコードが第二引数にくるみたいですね...！ちょっとややこしい...？

謎な部分もあるけど、色関連以外にもいろんな機能が網羅されててめっちゃ便利そうなので今後styled-componentsを使う時は絶対セットで入れると思います！おすすめ〜