# git-recap

GitHubユーザー名を入力すると、その人の1年間の活動をWrapped風のカードで見せるWebアプリ。

詳細な仕様は [CLAUDE.md](./CLAUDE.md) を参照してください。

## セットアップ

```bash
pnpm install
```

`.env.local` に `GITHUB_TOKEN` を設定してください（コミット禁止）。

## 開発コマンド

```bash
pnpm dev    # 開発サーバー
pnpm lint   # ESLint
pnpm test   # テスト（Vitest）
pnpm build  # 本番ビルド
```
