- 静的ファイルを返せるようにする（router にマッチしなかった場合はリクエストされたサーバ側のリソースをそのまま返す PHP 方式 or static/public ディレクトリ決め打ちでリクエスト来たらそっち返す flask 方式）
  - ディレクトリ・トラバーサルの対応 https://www.ipa.go.jp/security/vuln/websecurity-HTML-1_3.html

## やらないこと

極限まで薄くしたいのでやらないかも

- SPA のホスティングサーバ兼 API サーバになるための最低限の機能を備える（CSR する SPA のためのマイクロ web framework、client 以下に react アプリ、server 以下に deno のコード置けるようにしたい）
- "path/:id" で named params としてアクセスできるようにする
