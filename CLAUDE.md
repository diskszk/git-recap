@AGENTS.md

# git-recap

GitHubユーザー名を入力すると、その人の1年間の活動をWrapped風のカードで見せるWebアプリ。

## 技術スタック

- Next.js（App Router）/ TypeScript / Tailwind CSS / ESLint
- バージョンは `package.json` を正とする
- DBは使わない。データはGitHub APIから取得し、Nextの `fetch` キャッシュで再利用する
- パッケージマネージャーに `pnpm` を使用する

## ディレクトリ構成

プロダクトコードはルート直下の `src/` に置く。設定ファイル類（`next.config.ts` / `tsconfig.json` / `vitest.config.mts` など）と `public/` はルートに残す。

```
src/
├── app/          # App Routerのルート（page / layout / loading など）
├── components/   # UIコンポーネント（1コンポーネント1ディレクトリ）
├── lib/          # データ取得・整形（github.ts, mock.ts）
└── types/        # 型定義
```

- コンポーネントは `src/components/Foo/` ディレクトリにまとめ、`Foo.tsx` / `Foo.test.tsx` / `index.ts`（`export { Foo } from "./Foo";`）の3ファイルを置く。importは `@/components/Foo` と書く
- テストは対象ファイルの隣に置く（コロケーション）。ページ（`app/` 配下の `page.tsx`）の単体テストは、中身が固まるまで書かない
- パスエイリアス `@/*` は `src/*` を指す（例: `@/components/StatCard`）

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
- 取得と整形は `src/lib/github.ts` に集約し、UIは整形済みの型だけを受け取る
- 型は `src/types/` に置く（総コミット数、日別配列、言語トップ、曜日別、称号など）
- 開発中は、同じ型に沿ったダミーデータ（`src/lib/mock.ts`）でUIを先に作る
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

- `pnpm run dev` : 開発サーバー
- `pnpm run lint` : ESLint
- `pnpm run test` : Vitestでテスト実行
- `pnpm run format` : Prettierでフォーマット
- `pnpm run format:check` : フォーマットの確認（CI用）
- `pnpm run build` : 本番ビルド（デプロイ前に通ることを確認する）

## 作業ルール

- 学習目的のため、Claude Codeは学習補助モード（`Learning`）で実行する。`.claude/settings.json` の `outputStyle` で既定値にしてあり、切り替えは `/output-style Learning`（Insightの解説や、設計判断の一部を自分で実装する「Learn by Doing」が出る）
- 学習目的なので、Next.js特有の判断（Server/Client Componentの切り分け、キャッシュ設定など）をしたときは、理由を1〜2行で説明する
- 機能は小さく分けて追加し、1つ動いたらコミットする
- 作業ブランチ名は `feat/作業内容` `fix/作業内容` のように接頭辞を付ける
- 新規issueに対応する時は必ずmainブランチに移動し、最新のmainブランチの内容を反映した上で作業ブランチを作成する（`git checkout main && git pull`）
- 作業ブランチに移動したら `pnpm install` を実行して `node_modules` を最新にする
- 今回のスコープ外: ログイン、DB保存、非公開リポジトリ、履歴の保存
