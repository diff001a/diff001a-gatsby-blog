---
title: Gatsby製ブログでサイト内検索を実装しました
date: 2019-10-25T00:00:00.000Z
description: Gatsbyではビルド時に静的ページを生成する為、検索結果ページのように入力された検索ワードによって動的に内容が変わるようなページは生成することができません。なので検索機能はSaaSなどを利用して実装するのが一般的になっているみたいなんですが、こちらのブログで検索機能を自前実装する方法が紹介されていて、参考にさせていただいたところ思った以上に手軽にできたので、今回の記事ではその実装の記録を残しておきたいと思います。
slug: gatsby-site-search
tags:
  - React
  - Gatsby
keywords: JavaScript
---

Gatsbyではビルド時に静的ページを生成する為、検索結果ページのように入力された検索ワードによって動的に内容が変わるようなページは生成することができません。

なので検索機能はSaaSなどを利用して実装するのが一般的になっているみたいなんですが、[こちらのブログ](https://mottox2.com/posts/268)で検索機能を自前実装する方法が紹介されていて、参考にさせていただいたところ思った以上に手軽にできたので、今回の記事ではその実装の記録を残しておきたいと思います。

## 実装方法

以下のような手順を踏んで実装していきます。

1. useStaticQueryを使って検索コンポーネント内で全記事データを取得する
2. 検索コンポーネント内で検索処理

参考にさせていただいたブログ記事では、ビルドの度に全記事分の情報が格納されたjsonファイルを生成し、それをReactコンポーネントからaxiosを使って取得していましたが、今回は`useStaticQuery`を利用して、検索用のコンポーネント内から全記事データを取得してみる事にしました。

## useStaticQueryで全記事データを取得

```javascript
const tempData = useStaticQuery(graphql`
  query SearchData {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            tags
            keywords
          }
        }
      }
    }
  }
`)
const [data, setData] = useState([])
useEffect(() => {
  const temp = []
  tempData.allMarkdownRemark.edges.map(e => {
    temp.push(e.node.frontmatter)
  })
  setData(temp)
}, [])
```

全件取得なので、トップページで使うクエリとよく似た感じのクエリになります。検索対象にタイトルとタグとキーワードを含めたいと思っているので、その三つとスラッグをGraphQLを介して取得して、扱いやすい形に変換したものを`data`に格納しています。`data`に入っているデータは以下のような形になっています。

```javascript
[
  {
    title: "Gatsby製ブログでサイト内検索を実装しました",
    slug: "gatsby-site-search",
    tags: Array(2),
    keywords: "JavaScript",
  },
  {
    title: "VSCodeのMarketplaceに自作拡張機能を公開する方法",
    slug: "publish-vscode-extension",
    tags: Array(2),
    keywords: "開発ツール",
  }
]
```


## 検索処理

まず、検索対象にするタイトル・タグ・キーワードを一つの文字列として連結させ、その文字列が入力された値を含むかどうかでfilterをかけています。

```javascript
const [result, setResult] = useState([])
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
```

検索ワード(`props.value`)が変更される度に検索処理が走り、`result`には検索ワードを含む記事だけが格納されます。あとはこれを表示させるUIを作れば完了です🙆‍

## 検索ワードをハイライトさせてみる

タイトルに含まれる検索ワードをハイライトするコンポーネントを作ってみました。タイトルから検索ワード部分を抜き出して、spanタグで囲んだものに置き換えるというだけの簡単な作りですが、ちょっと見た目が華やかになるんじゃないかなと思います💅✨

```javascript
const TextHighlighter = props => {
  const { str, includes } = props
  const temp = str.toLowerCase()
  const start = temp.indexOf(includes.toLowerCase())
  const end = start + includes.length
  const item = str.slice(start, end)
  const res = str.replace(
    item,
    `<span style="background: rgba(255, 250, 118, 0.4); padding: 3px 0">${item}</span>`
  )
  return <span dangerouslySetInnerHTML={{ __html: res }} />
}
```

呼び出す時はこんな感じです↓
strにタイトル、includesに検索文字列を渡します。

```javascript
<TextHighLighter str={post.title} includes={props.value} />
```

## 雑感

[実際のコードはこちらから！](https://github.com/diff001a/diff001a-gatsby-blog/blob/master/src/components/search/index.js)

最初はビルドの度にjsonを生成する方法で実装していたんですが、useStaticQueryを使う方法で作り直してみたので、それに伴い記事の内容も変更しました。

シンプルな記述のみで実装できるので、個人ブログの検索機能程度であれば[Gatsbyの公式リファレンスガイド](https://www.gatsbyjs.org/docs/adding-search/)で紹介されているSaaSやライブラリを使用する方法よりも自前実装の方が早いんじゃないかな？という気さえしています。いろいろカスタマイズもしやすいですし、おすすめです。