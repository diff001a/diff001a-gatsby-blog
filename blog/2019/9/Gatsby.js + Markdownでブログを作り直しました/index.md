---
title: Gatsby + Markdownでブログを作り直しました
date: 2019-09-12T00:00:00.000Z
description: 元々Gatsby + Contentful + Netlifyという構成でこのブログを運営していたのですが、記事を書いていくうちに普段から愛用しているMarkdownエディタで記事を書きたい気持ちが強くなってきたので、Contentfulを辞めてMarkdownファイルをコンテンツソースとして利用する構成に変更しました。
slug: gatsby-blog-with-markdown
keywords: JavaScript
tags:
  - React
  - Gatsby
  - Markdown
---

元々Gatsby + Contentful + Netlifyという構成でこのブログを運営していたのですが、記事を書いていくうちに[普段から愛用しているMarkdownエディタ](https://www.typora.io/)で記事を書きたい気持ちが強くなってきたので、Contentfulを辞めてMarkdownファイルをコンテンツソースとして利用する構成に変更しました。

今回の記事ではこのブログを制作するのに使った[スターターセット](https://github.com/gatsbyjs/gatsby-starter-blog)のコードを見ながら、Gatsbyの基礎的な部分を勉強していこうと思います。

## Gatsbyはスターターライブラリが豊富！

[Gatsby ではたくさんのスターターライブラリが公開されています。](https://www.gatsbyjs.org/starters/?v=2)

以前はデフォルトのスターターセットからスタートしたんですが、今回はここから自分が作りたいサイトに近い構成のものを選択することにしました。今回はMarkdownをコンテンツソースとして利用するブログサイトを作りたいので、[gatsby-starter-blog](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/)というスターターセットを選びます。

ターミナルから作業フォルダに移動して、以下のコマンドを実行してください。

```
gatsby new gatsby-starter-blog https://github.com/gatsbyjs/gatsby-starter-blog
```

ダウンロードが完了したら、**gatsby-starter-blog**フォルダに移動して、`yarn start`してください。

**localhost:8000**にアクセスして、無事にブログ画面が表示されていれば準備完了です:tada:

この時点で既にトップページ(記事一覧ページ)と記事ページがあるので、そこで使われているReactのコードやGraphQLのクエリを見ることで、どのようにしてMarkdownのデータを、Reactコンポーネントで取得し、表示しているのかがなんとなくわかるのではないかなと思います。

具体的にどういう部分を見ていけばいいのかをまとめてみます。

## Gatsbyブログ向けのMarkdownの書き方 ( YAML Front-matter )

**content/blog**の中に記事データがあるのでどういう形で書かれているのか見てみます。

Contentfulではデータベース構造を管理画面から編集することができましたが、Markdownをコンテンツソースとする場合はタイトルや日付などといった記事に関するデータを、どこでどのようにして持つんだろう、というのが疑問だったんですが、これは**YAMLという形式でMarkdownファイルの冒頭部分にメタ情報を書くという方法で解決されているようです。**つまり記事データの構造はどこにも定義されておらず、記事ごとにメタ情報を設定するという形になるようです。

このYAMLで書かれたメタ情報ブロックを**Front-matter**と言います。以下の部分です。

```markdown
---
title: New Beginnings
date: "2015-05-28T22:40:32.169Z"
description: This is a custom description for SEO and Open Graph purposes, rather than the default generated excerpt. Simply add a description field to the frontmatter.
---
## ここから下に本文
```

カテゴリーやサムネイルなどを持たせたい場合はこのブロックの中に追加していくことになります。

デフォルトの状態では、 **title, date, description** の3つの項目が設定されています。このブログの場合はタグページを作りたかったので、**tags**という項目を追加したりしました。

## Markdownをコンテンツソースとする場合のプラグイン設定 (gatsby-config.js)

**gatsby-config.js**の中では、利用するプラグインの定義・設定を行ったり、サイトのメタデータの定義を行います。

Markdownをコンテンツソースとして扱う為には、`gatsby-source-filesystem`というプラグインが必須です。今回使用したスターターセットでは最初からこのプラグインのインストールとgatsby-config.jsでの設定が終わった状態になっていますが、一応パスなどを確認する為に見ておきましょう。gatsby-config.jsのpluginsの中の以下の部分がそれに該当します。

```javascript
{
  resolve: `gatsby-source-filesystem`,
  options: {
    path: `${__dirname}/content/blog`,
    name: `blog`,
  },
},
```

## Gatsby ルーティングの基本 (src/pages)

**src/pages**がルーティングの基本になるディレクトリです。

このディレクトリ内に置かれたjsファイルは、ファイル名をパスとしてページが生成されます。

今回のスターターセットの場合は、トップページ(index.js)と404ページ(404.js)がここに置いてあります。

index.jsを見てみると、ページの最後にGraphQLのクエリがあります。**このクエリを介して取得したデータは、その直前で`export default`されたReactコンポーネントにdataというpropとして渡っています。**

そのindex.jsの中で定義されているBlogIndexコンポーネントの内容をみると、そうやってpropsに渡されたデータを利用して、記事の一覧を表示させているのがわかると思います。

## 記事ページ (gatsby-node.js)

**gatsby-node.js**から[Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/)とのやりとりをします。このスターターセットの場合は、Markdownファイルを元に動的にページを生成する為の処理( createPages )をここに記述しています。どういう処理が行われているか順番に見てみます。

### Markdownファイルを全て取得

```javascript
const result = await graphql(
  `
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `
)
```

ここでは、date(日付)を基準にdesc(降順)に並び替えて、1000件を上限として、Markdownファイルを全件取得しています。ここで取得している項目は`slug`と`title`で、対象となるディレクトリは**gatsby-config.js**で指定されたパスです。

###全記事分のページを生成する

```javascript
const posts = result.data.allMarkdownRemark.edges
posts.forEach((post, index) => {
  const previous = index === posts.length - 1 ? null : posts[index + 1].node
  const next = index === 0 ? null : posts[index - 1].node

  createPage({
    path: post.node.fields.slug,
    component: blogPost,
    context: {
      slug: post.node.fields.slug,
      previous,
      next,
    },
  })
})
...
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
```

GraphQLで取得したデータが`result.data.allMarkDownRemark.edges`に入っているので、これを`posts`という定数に入れて、ループで回し、全記事分の静的ページを生成しています。ここでcreatePage関数というページを生成する関数がでてきます。この関数は**path**と**component**と**context**を引数に持ちます。

pathはページのスラッグになる部分で、componentは適用されるテンプレートで、contextはテンプレートのコンポーネントに渡すデータです。ここではslugを記事ページ用のテンプレートに渡し、それを元に記事ページ用のテンプレートから記事データを特定し取得できるようにしているようです。

記事ページ用のテンプレートコンポーネントでのクエリは以下のようになっています。

### src/templates/blog-post.js

```javascript
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
```

同じ要領でタグやカテゴリーを全件取得して、ループで回してcreatePage関数を実行すればタグページやカテゴリーページが作れますよね！なのでこの部分はよく見ておきましょう:sparkles:

## 感想

Gatsbyでブログを作るってなった時は、

- 複数人で更新する事が想定される
- githubの使い方やMarkdownの書き方がわからない人が更新する事が想定される

このいずれかの条件に当てはまる場合のみ、ContentfulやNetlify CMSやWordPressなどをバックエンドとして使うという選択肢を取ればいいのかなと思いました。

自分一人で更新するブログで、日頃からgithubやMarkdownをよく使っている場合には、Markdownをコンテンツソースとして利用する方がシンプルだし手軽だと思います。

ブラウザから管理画面にログインしてブラウザ上でブログを書くより、いつも使っているMarkdownエディタで記事を書いて、書き終わったらgithubのリポジトリにプッシュするだけで更新されるようにしておけば、ブログを更新する事に対する精神的なハードルがだいぶ下がるな〜って感じました〜

あと、[このブログのコードはGithubで公開してます！](https://github.com/diff001a/diff001a-gatsby-blog)

Gatsbyでブログを作ってみたい方は是非参考にしてみてください:blush: