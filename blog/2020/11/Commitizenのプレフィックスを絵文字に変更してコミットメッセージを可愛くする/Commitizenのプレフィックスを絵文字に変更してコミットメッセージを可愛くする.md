---
title: Commitizenのプレフィックスを絵文字に変更してコミットメッセージを可愛くしました
date: 2020-11-22T00:00:00.000Z
description: 綺麗なコミットメッセージを書く為のCommitizenというツールで、コミットのタイプを表すプレフィックスを絵文字で表現できるようになるcz-emojiというアダプタがあるんですが、それを和訳して少し使いやすくカスタマイズしたものを、cz-emoji-japaneseという名前のnpmパッケージとして公開してみました🎉
slug: commitizen-with-emojis
tags:
  - Git
  - Commitizen
keywords: Git
---

綺麗なコミットメッセージを書く為の**Commitizen**というツールで、コミットのタイプを表すプレフィックスを絵文字で表現できるようになる**cz-emoji**というアダプタがあるんですが、それを和訳して少し使いやすくカスタマイズしたものを、**cz-emoji-japanese**という名前のnpmパッケージとして公開してみました🎉

この記事では**Commitizen**と今回公開した**cz-emoji-japanese**の概要やインストール方法についてまとめておきます。

## Commitizenとは

Commitizenは対話型でコミットメッセージを作成できるツールです。

![commitizenのスクリーンショット](screenshot.png)

- コミットのタイプ(prefix)
- コミットのスコープ
- コミットのタイトル
- コミットの本文
- 破壊的変更の有無
- 関連issueの有無

上記の質問に順番に答えていくだけで、ルールに沿った適切なコミットメッセージを作成することができます。

Commitizenで作成されたコミットメッセージはこんな形式になります。

```bash
type(scope): タイトル

本文
```

## cz-emoji(cz-emoji-japanese)とは

githubとかでよく見かけるプレフィックスに絵文字を使っているコミットメッセージを、Commitizenでも使えるようにするためのアダプタです。

そのまま使おうとするとあまりにもコミットタイプの種類が多すぎるので、カスタマイズして使用することが前提とされているように感じました。そこでよく使いそうなタイプに絞り、質問文やタイプの説明などを日本語に翻訳して使いやすくしたものが`cz-emoji-japanese`です。

[githubリポジトリはこちらです！](https://github.com/diff001a/cz-emoji-japanese)

## インストール方法と使い方

```bash
yarn global add commitizen # commitizenインストール
yarn global add cz-emoji-japanese # cz-emoji-japaneseインストール
echo '{ "path": "cz-emoji-japanese" }' > ~/.czrc
```

後はコミットを行いたいディレクトリ内で、`git commit`とする代わりに`git cz`と打つと、コミットメッセージを作成するための質問が表示されていくので、それに順番に答えていくだけです！

## おわり🎉

タイプの種類や対応する絵文字などは[gitmoji](https://gitmoji.carloscuesta.me/)などを参考にしながら考えてみたんですが、まだまだ改善の余地があると思うのでもっといいアイディアがある方は是非issueなどお寄せください😊
