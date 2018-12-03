# [storybook for styleguide](https://kzhrk-sandbox.github.io/storybook-for-styleguide/)

Webアプリケーションとしてではなく、HTML/CSS/JSのモジュール、モックページの管理ツールとしてStorybookを利用する。

## ディレクトリ構成

```
.
├── src
│   ├── webpack
│   ├── pug
│   │   ├── component
│   │   │   ├── button
│   │   │   │   ├── icon.pug
│   │   │   │   ├── mixin.pug
│   │   │   │   └── text.pug
│   │   │   ├── ...
│   │   │   └── index.pug
│   │   ├── page
│   │   │   ├── top
│   │   │   │   ├ index.pug
│   │   │   │   └ no_login.pug
│   │   │   └── ...
│   │   └── config.pug
│   └── scss 
│       ├── foundation
│       ├── layout
│       └── object
│           ├── component
│           │   ├── _button.scss
│           │   └── ...
│           ├── project
│           └── utility
└── stories
    ├── page
    |   ├── index.js
    |   ├── user.js
    |   └── ...
    └── component
        ├── button.js
        └── ...
```

### scss

[FLOCSS](https://github.com/hiloki/flocss)のcss構成に準拠する。  
運用でUI更新を行う際はcomponent、project配下のscssの更新に留める。  
component配下に作成するscssファイル名は、[WAI-ARIAのRoleのカテゴリ](https://www.w3.org/TR/wai-aria/#roles_categorization)に準拠する。

### pug

#### component

`src/pug/component`配下にFLOCSSの`src/scss/object/component`と対になるディレクトリを作成する。

ディレクトリ内には必ず`_mixin.pug`を作成し、該当ディレクトリのコンポーネント出力に必要なmixinを定義する。  
mixinは下記のフォーマットで記述する。第1引数にコンポーネントの種類が渡され、第2引数にコンポーネント内で使用するデータが渡される。

```pug
mixin sectionhead(type, data)
  case type
    when type1
      h1= data.text
```

`_mixin.pug`をincludeしたpugファイルでStorybookに出力するUIコンポーネントのHTMLを作成する。このpugファイルはmixinの実行と、コンポーネントのセクショニングのみを行う。

`src/pug/config.pug`には`_mixin.pug`のswitch構文（case, when）で使用するコンポーネント名が階層構造で定義された、下記のようなconfig変数を定義している。

```pug
-
  var config = {
    component_dirname: {
      pug_filename: {
        component_type: 'type1'
      }
    }
  }
```

まとめると、`src/pug/component/sectionhead`ディレクトリ配下の`_mixin.pug`と`_icon.pug`は下記のような構成になる。

```pug
// mixin.pug
include ../../config

mixin sectionhead(type, data)
  case type
    when config.sectionhead.icon.circle
      h1.c-sectionhead__icon--circle= data.text
    when config.sectionhead.icon.square
      h1.c-sectionhead__icon--square= data.text
```

```pug
// icon.pug
include ../../config
include ./mixin.pug

+sectionhead(config.sectionhead.icon.square, {
  text: '四角アイコン付き見出し'
})

hr

+sectionhead(config.sectionhead.icon.circle, {
  text: '丸アイコン付き見出し'
})
```

`src/pug/component`の各ディレクトリで定義されたmixinは、`src/pug/component/index.pug`でincludeして集約する。

```pug
include ./sectionhead/mixin
include ./list/mixin
include ./listitem/mixin
```

#### page

`src/pug/page`にはcomponentを組み合わせたサンプルページを作成する。このモックページはFLOCSSのLayout、Objectの確認のために利用される。

`src/pug/config.pug`と`src/pug/component/index.pug`を読み込んでmixinを実行してコンポーネントを組み合わせていく。

```pug
include ../../config
include ../../components/index

header.l-header header

main
  .l-main
    section.p-articles
      +sectionhead(config.sectionhead.icon.circle, {
        text: '丸アイコン付き見出し'
      })

      +list(config.list.index.link, [{
        text: 'リンクリスト1',
        url: '//example.com#1'
      }, {
        text: 'リンクリスト2',
        url: '//example.com#2'
      }, {
        text: 'リンクリスト3',
        url: '//example.com#3'
      }])

footer.l-footer footer
```

### stories

`stories/index.js`で`src/scss/style.scss`をrequireする。

`stories/component`、`stories/page`配下に`src/pug`に対応するstoriesファイルを作成する。

UIコンポーネントの説明文が必要な場合は、`description.js`にマークダウンを記述する。

```js
import { storiesOf } from '@storybook/html';
import iconTemplate from '../../../src/pug/component/sectionhead/icon';
import * as description from './description';

storiesOf('sectionhead', module)
  .add('アイコン付き見出し', () => {
    return iconTemplate();
  }, {
    notes: {
      markdown: description.icon
    }
  })
```

## npm scripts

| コマンド | 説明 |
|:--------|:----|
| start | scss, pug, webpackのwatch。webpack-dev-serverでlocalhost:3000を立ち上げ |
| build | scss, pug, jsをminifyして出力 |
| storybook | storybookのwatch。localhost:3001を立ち上げ |
| build:storybook | docsディレクトリにStorybookを静的出力 |

## UI追加手順

1. `npm run storybook`もしくは`yarn storybook`でStorybookを実行
2. `src/pug/config.pug`に追加するコンポーネントを登録
3. `src/pug/component/{dirname}/mixin.pug`にmixinを追加
4. `src/pug/component/{dirname}/{component_name}.pug`にサンプルUIを追加
5. `src/pug/component/index.pug`に2で追加したmixin.pugのincludeを追記
6. `stories`にstoriesファイルを追加
7. `src/scss/object`にscssを追加
