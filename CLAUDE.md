@AGENTS.md

# git-recap

GitHubユーザー名を入力すると、その人の1年間の活動をWrapped風のカードで見せるWebアプリ。

## 技術スタック
- Next.js（App Router）/ TypeScript / Tailwind CSS / ESLint
- バージョンは `package.json` を正とする
- DBは使わない。データはGitHub APIから取得し、Nextの `fetch` キャッシュで再利用する
- パッケージマネージャーに `pnpm` を使用する

## 画面とルート
- `/` : トップ。ユーザー名入力フォーム（Server Actionで `/u/[username]` へ `redirect`）
- `/u/[username]` : 結果ページ（Server Componentでデータ取得）
  - `loading.tsx` : 取得中の表示
  - `not-found.tsx` : 存在しないユーザー
  - `opengraph-image.tsx` : 共有用OGP画像（`next/og`）

## コンポーネント方針
- 基本はServer Component。`"use client"` は必要な部品だけに付ける（例: 共有ボタン）
- 想定コンポーネント: `UsernameForm` / `ProfileHeader` / `StatCard` / `ActivityHeatmap` / `WeekdayBars` / `TitleCard` / `ShareActions`
- `StatCard` を共通の枠として使い回す

## データ取得
- GitHub GraphQL APIの `contributionsCollection(from, to)` を使う（年間集計はREST APIの events では足りない）
- 取得と整形は `lib/github.ts` に集約し、UIは整形済みの型だけを受け取る
- 型は `types/` に置く（総コミット数、日別配列、言語トップ、曜日別、称号など）
- 開発中は、同じ型に沿ったダミーデータ（`lib/mock.ts`）でUIを先に作る
- 対象は公開データのみ

## 環境変数
- `GITHUB_TOKEN`（`.env.local`）: サーバー側でのみ使う。クライアントに渡さない、`NEXT_PUBLIC_` を付けない
- `.env.local` はコミットしない

## デザイン方針
- ダーク背景（`#0d1117` 系）、アクセントは緑1色（`#3fb950` 系）、カード構成
- 1カード1メッセージ。数字を大きく見せる
- スタイルはTailwindのユーティリティで書く。独自CSSは最小限
- 装飾（グラデーション、影、ネオン効果）は使わず、フラットに保つ

## 開発コマンド
- `npm run dev` : 開発サーバー
- `npm run lint` : ESLint
- `npm run build` : 本番ビルド（デプロイ前に通ることを確認する）

## 作業ルール
- 学習目的なので、Next.js特有の判断（Server/Client Componentの切り分け、キャッシュ設定など）をしたときは、理由を1〜2行で説明する
- 機能は小さく分けて追加し、1つ動いたらコミットする
- 今回のスコープ外: ログイン、DB保存、非公開リポジトリ、履歴の保存
