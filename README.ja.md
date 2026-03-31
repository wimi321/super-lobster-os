<div align="center">
  <img src="./docs/assets/lobster-hero.svg" alt="Super Lobster OS hero" width="100%">
</div>

<h1 align="center">Super Lobster OS</h1>

<p align="center">
  <strong>現実の開発ミッションに向けた、ターミナルファーストの AI オペレーティングシステム。</strong>
</p>

<p align="center">
  Super Lobster OS は、次の 2 つを 1 つの公開プロジェクトとして再構築する clean-room 実装です。<br>
  <strong>チャネルネイティブなオーケストレーション</strong> と <strong>ワークスペースネイティブな実行</strong>。
</p>

<p align="center">
  <a href="./README.md">English</a>
  ·
  <a href="./README.zh-CN.md">简体中文</a>
  ·
  <strong>日本語</strong>
</p>

<p align="center">
  <a href="https://github.com/wimi321/super-lobster-os/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/wimi321/super-lobster-os/ci.yml?style=for-the-badge&label=CI"></a>
  <a href="./LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-0f172a?style=for-the-badge"></a>
  <img alt="Node 20+" src="https://img.shields.io/badge/node-20%2B-0f766e?style=for-the-badge">
  <img alt="Status Alpha" src="https://img.shields.io/badge/status-alpha-f97316?style=for-the-badge">
</p>

## プロジェクトの狙い

いまの AI 開発ツールは、だいたい次の 2 つのどちらかに偏っています。

- チャット面には強いが、リポジトリ理解が浅い。
- リポジトリ理解は深いが、実態は高機能なターミナルタブに近い。

**Super Lobster OS** は、その中間ではなく、両方を本気で取りにいくプロジェクトです。

- ワークスペースを理解する
- チームの知見を継続的に覚える
- 実行前に操作リスクを判定する
- 次の一手を terminal、GitHub、Slack、モバイル向けの面へ適切にルーティングする
- しかも公開・fork・継続開発が可能な形で保つ

## 何が違うのか

| 機能 | 実際の価値 |
| --- | --- |
| Mission Planning | 現在のワークスペースに基づく実行計画を生成する |
| Safety Guardrails | 危険なコマンドを止め、重要な操作にはレビューを要求する |
| Persistent Memory | `.lobsteros/memory.json` に長期的な知見を保存する |
| Channel Routing | タスクを terminal、GitHub、Slack、モバイルのどこで扱うべきか提案する |
| Clean-room Posture | 優れたエコシステムに学びつつ、コードは公開可能な独自実装 |
| Markdown Reports | issue、PR、handoff に使える読みやすいレポートを出力する |

## なぜこのプロジェクトを作るのか

Super Lobster OS は **clean-room** 方針で構築されています。主な着想源は次の通りです。

- OpenClaw の channel-native operator 哲学
- モダンな coding agent に見られる workspace-aware な作業体験

このリポジトリは Claude Code のプロプライエタリなソースコードを配布しません。
価値のあるインタラクションパターンを、公開可能なオリジナル実装として再構築することが目的です。

## 現在できること

- `lobsteros init` で `.lobsteros/config.json` を初期化
- `lobsteros plan` でワークスペース対応のミッション計画を生成
- `lobsteros report` で markdown ミッションレポートを出力
- `lobsteros guard` でコマンドを `allow`、`review`、`deny` に分類
- `lobsteros route` で最適な作業面を提案
- `lobsteros learn` で継続的な知見を保存
- `lobsteros doctor` でリポジトリ状態とメモリの健康度を診断

## クイックスタート

```bash
git clone https://github.com/wimi321/super-lobster-os.git
cd super-lobster-os
npm test
node src/cli.mjs init --workspace "Payments Core"
node src/cli.mjs plan --message "refactor the billing retry worker"
node src/cli.mjs report --message "prepare the release checklist"
node src/cli.mjs guard --command "git push origin main"
node src/cli.mjs route --target github
node src/cli.mjs learn --note "billing retries depend on redis locks"
node src/cli.mjs doctor
```

## アーキテクチャ

<div align="center">
  <img src="./docs/assets/mission-map.svg" alt="Super Lobster OS architecture map" width="100%">
</div>

### コアモジュール

- `src/core/config.mjs`: ワークスペース初期化と設定ロード
- `src/core/workspace-memory.mjs`: 長期的なミッション記憶
- `src/core/planner.mjs`: プロンプトとワークスペース形状から計画を生成
- `src/core/safety-policy.mjs`: コマンド安全性の判定
- `src/core/channel-router.mjs`: terminal、GitHub、Slack、Telegram などへのルーティング
- `src/core/reporter.mjs`: markdown レポート生成
- `src/core/mission-control.mjs`: 全体のオーケストレーション層
- `src/cli.mjs`: 依存の少ない CLI エントリポイント

詳細は [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) を参照してください。

## コマンド一覧

| コマンド | 用途 |
| --- | --- |
| `lobsteros init --workspace "Payments Core"` | リポジトリ設定を初期化 |
| `lobsteros plan --message "audit auth flow"` | 構造化された実行計画を生成 |
| `lobsteros report --message "ship release candidate"` | markdown ミッションレポートを出力 |
| `lobsteros guard --command "git push origin main"` | コマンドの安全性を判定 |
| `lobsteros route --target github` | 次に使うべき面を提案 |
| `lobsteros learn --note "staging uses synthetic data"` | 継続的な知見を保存 |
| `lobsteros doctor` | リポジトリ状態とメモリ状況を表示 |

## 設計原則

1. **Workspace over thread**: 会話履歴よりリポジトリを主語にする。
2. **Safety over bravado**: 危険操作は見せ場ではなく制御対象。
3. **Operator UX**: 出力は常に人の判断を助けるものであるべき。
4. **Multi-surface by default**: terminal は中心だが、製品の全てではない。
5. **Public engineering quality**: テスト、文書、リポジトリ衛生を最初から重視する。

## ロードマップ

### 近い将来

- より豊富な設定プロファイルとポリシーパック
- 承認ゲート付きの shell 実行アダプタ
- GitHub issue / PR ワークフロー
- Slack / Telegram の実運用向け連携
- 現実的なチームタスクに基づく評価フィクスチャ

### 中期

- 常駐ミッションデーモン
- ライブ TUI ダッシュボード
- 役割別エージェントフロー
- プラグイン SDK とアダプタマーケットプレイス

詳細は [docs/ROADMAP.md](./docs/ROADMAP.md) を参照してください。

## 比較

Super Lobster OS は次の立ち位置を目指しています。

- メッセージ中心のアシスタントよりワークスペースネイティブ
- ターミナル専用の coding agent よりチャネルネイティブ
- 私有・専用派生物より公開プロジェクトとして育てやすい

詳しくは [docs/COMPARISON.md](./docs/COMPARISON.md) を参照してください。

## 開発

```bash
npm test
npm run demo
npm run report
```

## コントリビュート

歓迎する方向性は次の通りです。

1. 実リポジトリに対する計画品質の改善
2. 安全ポリシーの強化
3. 実運用チャネル連携の追加
4. ベンチマークと評価フィクスチャの拡充

PR の前に [CONTRIBUTING.md](./CONTRIBUTING.md) を読んでください。

## セキュリティ

脆弱性を見つけた場合は [SECURITY.md](./SECURITY.md) に従って報告してください。

## Notice

プロジェクトの来歴と clean-room 境界については [NOTICE.md](./NOTICE.md) を参照してください。

## Credits

- OpenClaw: channel-native assistant の可能性を大きく押し広げた存在。
- 広い coding-agent エコシステム: terminal UX と workspace awareness の基準を引き上げた存在。
