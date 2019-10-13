---
title: Firebaseでbasic認証をかける方法
date: "2019-07-09T22:40:32.169Z"
description: ポートフォリオをホスティングするのにbasic認証をかけたいなと思ったんですが、Netlifyの無料プランでは無理みたいだったので、はじめてFirebaseを使ってみました🔥 デプロイまでの手順や、つまったところをメモしておこうと思います。
slug: firebase-basic-authorization
keywords: Platform
tags:
  - firebase
---

ポートフォリオをホスティングするのにbasic認証をかけたいなと思ったんですが、Netlifyの無料プランでは無理みたいだったので、はじめてFirebaseを使ってみました:fire:

デプロイまでの手順や、つまったところをメモしておこうと思います。

## デプロイまでの手順

### firebaseにアカウント登録&プロジェクトを作っておく

アカウント登録してから、トップページからプロジェクトを追加しておきます。

### firebase-toolsをインストール

npm経由でfirebase-toolsをインストールします。

```
$ npm install -g firebase-tools
```

### firebaseにログイン

```
$ firebase login
```

ブラウザが立ち上がるので認証ボタンをクリック！これでログイン完了です。

### firebaseプロジェクトの初期化

適当にフォルダを作ってそこにターミナルで移動してから、firebaseプロジェクトの初期化をします。

```
$ firebase init
```

FunctionsとHostingにスペースキーでチェックを入れます。

いろいろ聞かれますが、基本はデフォルトのままでOK。

プロジェクトを聞かれた時に、最初にFirebaseサイトから追加したプロジェクトを選択します。

### ファイルを書き換える

以下の内容にファイルを書き換えます。

#### functions/index.js

```javascript
const functions = require('firebase-functions')
const express = require('express')
const basicAuth = require('basic-auth-connect')
const app = express()

app.all('/*', basicAuth(function(user, password) {
  return user === 'username' && password === 'password';
}));

app.use(express.static(__dirname + '/static/'))

exports.app = functions.https.onRequest(app)
```

#### firebase.json

```json
{
  "hosting": {
    "public": "public",
    "rewrites": [
      {
        "source": "**",
        "function": "app"
      }
    ],
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

### コマンドから必要なプラグインのインストール

functionsフォルダに移動してから、必要なプラグインをインストールします。

```
$ cd functions
$ npm install --save express
$ npm install --save basic-auth-connect
```

### Publicフォルダ内のファイルを全て削除して、staticフォルダを追加

**publicフォルダ内が空だった時、独自の静的ファイル(static)のホスティングを行う**という設定を上記のfirebase.jsonとfunctions/index.js内でしているので、publicフォルダ内を空っぽにして、functionsフォルダの中にstaticフォルダを作って、staticフォルダ以下にホストしたいファイルを置いておきます。

### デプロイする

```
firebase deploy
```

しばらく待って、Deploy complete!が表示されればデプロイ完了です🎉



## 詰まったところ

### 1: deployが失敗する(TypeError: Cannot read property 'wanted' of undefined)

手順通りにデプロイを行いましたが、`TypeError: Cannot read property 'wanted' of undefined`というエラーがでてしまい、デプロイが完了しませんでした。

私の場合はnpmを最新バージョン(6.10.0)にアップグレードしていたのが原因で、6.9.2にダウングレードすると問題なくデプロイが完了しました。以下のコマンドでダウングレードできます。

```
$ npm install -g npm@6.9.2
```

あとデプロイ時にエラーが出た場合、`firebase-debug.log`というファイルが同階層に生成されて、その中に詳しいエラーの原因が書かれているので、何かエラーが出た場合はこちらを参考にするとよさそうです。

### 2: CANNOT GET/が表示される

functionsフォルダと同じ階層にstaticフォルダを作っていたのが原因でした😱

functions/index.js内の`__dirname`はfunctionsフォルダまでの階層を表しているので、**functionsフォルダの中に**staticフォルダを置くように気をつけましょう！(自戒)

## 参考

以下の記事を参考にさせていただきました🙏

[https://qiita.com/567000/items/65f55eda8d7c6df09138](https://qiita.com/567000/items/65f55eda8d7c6df09138)

[https://qiita.com/ohana/items/f334c096727740f0df4a](https://qiita.com/ohana/items/f334c096727740f0df4a)