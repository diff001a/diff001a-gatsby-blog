---
title: Gatsby製ブログでサイト内検索を実装しました
date: 2019-09-28T00:00:00.000Z
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

[こちらのブログ](https://mottox2.com/posts/268)で紹介されている方法を参考にさせていただきました！以下のような手順です。

1. 検索用のJSONファイルを作っておき、ビルド時に内容を更新する
2. ReactコンポーネントからJSONを呼び出す
3. Reactコンポーネント内で検索処理

検索用のJSONファイルをビルドの度に更新するというのが斬新なアイディアですよね！この方法であれば確かにバックエンドなしで検索機能が実装できそうです✨

## 検索用のJSONを生成 & ビルド時に内容を更新する設定

まずは作業ディレクトリ直下に**static**というフォルダを作って、その中に**search.json**という名前の空のjsonファイルを追加しておきます。

それから、**gatsby-node.js**内の**createPages**の中に以下のような処理を追加して、ビルドするたびに**search.json**の内容が書き換えられるように設定しておきます。

```javascript
// "posts" にはGraphQLを介して取得した全記事データが格納されています //
const searchJSON = posts.map(post => {
  const { title, slug, tags, keywords } = post.node.frontmatter
  return {
    title,
    keywords,
    tags,
    path: `/${slug}/`,
  }
})
fs.writeFileSync("./static/search.json", JSON.stringify(searchJSON, null, 2))
```

これでビルドすると、**search.json**の内容が以下のような感じに書き換えられています。

```json
[
  {
    "title": "Gatsby製ブログでサイト内検索を実装しました",
    "keywords": "gatsby",
    "tags": [
      "Gatsby"
    ],
    "path": "/gatsby-site-search/"
  },
  {
    "title": "Gatsby + Markdownでブログを作り直しました",
    "keywords": "gatsby",
    "tags": [
      "Gatsby",
      "Markdown"
    ],
    "path": "/gatsby-blog-with-markdown/"
  },
  ...
]
```

## Reactコンポーネントからjsonデータを呼び出す

Reactコンポーネントからjsonデータを呼び出す為に[axios](https://github.com/axios/axios)というプラグインを使っています

```javascript
const [data, setData] = useState([])
const getData = async () => {
  const res = await axios.get("/search.json")
  setData(res.data)
}
useEffect(() => {
  getData()
}, [])
```
これで`data`に全記事分の情報が格納されるので、検索ワードでfilterする処理を書いていきます。

## 検索処理

このブログではタイトルとタグとキーワードを検索対象にすることにしたので、タイトルとタグとキーワードを以下のように一つの文字列として連結させ、その文字列が入力された値を含むかどうかでfilterをかけています。

```javascript
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

記事書き終わってからちょっと思ったんですが...検索機能用のコンポーネントで`useStaticQuery`を使って全記事分のデータを取得して、それをfilterして表示させるという方法でも多分実装できましたねwどっちの方がパフォーマンス的に良いとかあるんかなー

とにかく、サイト内検索のような機能もバックエンド一切なしでGatsbyだけで実装できるというところが個人的には大きな発見で、勉強になりました。

[Gatsbyの公式リファレンスガイド](https://www.gatsbyjs.org/docs/adding-search/)ではSaaSやライブラリを使用する方法が紹介されているので、自分の興味に合わせて実装方法を選べばいいのかなと思います。