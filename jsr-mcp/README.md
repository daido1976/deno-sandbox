# JSR Documentation MCP Server

最新の JSR パッケージ（特に Deno 標準ライブラリ）のドキュメントを生成 AI に提供する MCP サーバーです。

## 機能

- **get_jsr_docs**: JSR パッケージのドキュメント取得
- **search_jsr_exports**: パッケージ内の関数・型の検索
- **list_deno_std_packages**: Deno 標準ライブラリパッケージ一覧（動的取得）

## セットアップ

### 1. 動作確認

```bash
cd jsr-mcp
deno task dev
```

### 2. Claude Code に登録

`~/.claude/claude_desktop_config.json`に追加:

```json
{
  "mcpServers": {
    "deno-std": {
      "command": "deno",
      "args": ["run", "--allow-all", "/path/to/jsr-mcp/mod.ts"]
    }
  }
}
```

## 使用例

### CSV 関連のエクスポート検索

```
search_jsr_exports("@std/csv", "parse")
```

### ファイルシステムのドキュメント取得

```
get_jsr_docs("@std/fs")
```

### Deno パッケージ一覧表示

```
list_deno_std_packages()
```

## 特徴

- ✅ 最新の JSR パッケージ情報を動的取得
- ✅ `deno doc`を使った正確なドキュメント取得
- ✅ 関数・型の検索機能
- ✅ エラーハンドリングとフォールバック
- ✅ TypeScript 型安全
