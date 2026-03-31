<div align="center">
  <img src="./docs/assets/lobster-hero.svg" alt="Super Lobster OS 视觉头图" width="960">
</div>

<h1 align="center">Super Lobster OS</h1>

<p align="center">
  <strong>一个面向真实开发任务的终端优先 AI 操作系统。</strong>
</p>

<p align="center">
  Super Lobster OS 是一个 clean-room 公共项目，把两种强能力真正结合到一起：<br>
  <strong>面向渠道的编排能力</strong> 和 <strong>面向工作区的执行能力</strong>。
</p>

<p align="center">
  <a href="./README.md">English</a>
  ·
  <strong>简体中文</strong>
  ·
  <a href="./README.ja.md">日本語</a>
  ·
  <a href="./README.es.md">Español</a>
  ·
  <a href="./README.ko.md">한국어</a>
</p>

<p align="center">
  <a href="https://github.com/wimi321/super-lobster-os/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/wimi321/super-lobster-os/ci.yml?style=for-the-badge&label=CI"></a>
  <a href="./LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-0f172a?style=for-the-badge"></a>
  <img alt="Node 20+" src="https://img.shields.io/badge/node-20%2B-0f766e?style=for-the-badge">
  <img alt="Status Alpha" src="https://img.shields.io/badge/status-alpha-f97316?style=for-the-badge">
</p>

## 项目定位

现在大多数 AI 开发者产品都卡在两个极端里：

- 要么活在聊天渠道里，但对代码仓库理解很浅。
- 要么很懂代码仓库，但本质上只是一个更聪明的终端窗口。

**Super Lobster OS** 想做的是第三条路：

- 理解当前工作区
- 记住团队已经验证过的经验
- 在真正执行前判断操作风险
- 把下一步路由到合适的表面，比如 terminal、GitHub、Slack 或移动端
- 还要保持可公开、可 fork、可长期演进

## 为什么它不一样

| 能力 | 实际价值 |
| --- | --- |
| Mission Planning | 把一句任务描述变成与工作区相关的结构化执行计划 |
| Safety Guardrails | 阻断明显危险的命令，并把敏感操作标记为需要复核 |
| Persistent Memory | 把仓库长期知识沉淀到 `.lobsteros/memory.json` |
| Channel Routing | 判断一个任务更适合在 terminal、GitHub、Slack 还是移动端完成 |
| Clean-room Posture | 借鉴优秀生态的产品思想，但代码是原创、可公开演进的 |
| Markdown Reports | 直接导出适合 issue、PR、handoff 的任务报告 |

## 为什么要做这个项目

Super Lobster OS 明确以 **clean-room** 方式构建，灵感主要来自：

- OpenClaw 的 channel-native operator 哲学
- 现代 coding agent 的 workspace-aware 工作方式

这个仓库**不会**分发 Claude Code 的专有源码。
我们的目标是把有价值的交互模式用原创实现重建出来，做成一个真正适合公开运营的 GitHub 项目，而不是版权风险很高的私有拼装品。

## 当前能力

- `lobsteros init` 初始化 `.lobsteros/config.json`
- `lobsteros plan` 生成基于工作区的任务计划
- `lobsteros report` 导出 markdown 任务报告
- `lobsteros guard` 把命令分类为 `allow`、`review`、`deny`
- `lobsteros route` 推荐最合适的协作表面
- `lobsteros learn` 保存长期有效的团队知识
- `lobsteros doctor` 检查项目准备状态和记忆系统健康度

## 快速开始

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

## 示例任务报告

```md
# Mission Report

## Mission

- Prompt: prepare the release checklist
- Workspace: Payments Core
- Directory: /your/project
- Runtime: v24.x on darwin

## Plan

1. Prepare release gates - Verify environment, secrets, rollback steps, and smoke tests.
2. Map the system boundary - Inspect repository shape, critical packages, and integration seams.
3. Build a safe execution plan - Separate low-risk local work from anything that needs explicit review.
4. Ship a visible vertical slice - Implement one end-to-end capability the team can demo immediately.
5. Add observability and docs - Document workflows, assumptions, and the next contribution surface.
```

## 架构

<div align="center">
  <img src="./docs/assets/mission-map.svg" alt="Super Lobster OS 架构图" width="920">
</div>

### 核心模块

- `src/core/config.mjs`：工作区初始化与配置加载
- `src/core/workspace-memory.mjs`：长期任务记忆与经验沉淀
- `src/core/planner.mjs`：结合 prompt 与工作区形态生成计划
- `src/core/safety-policy.mjs`：命令风险识别与危险命令阻断
- `src/core/channel-router.mjs`：terminal、GitHub、Slack、Telegram 等表面的路由推荐
- `src/core/reporter.mjs`：生成 markdown 任务简报
- `src/core/mission-control.mjs`：统一编排层
- `src/cli.mjs`：零依赖命令行入口

深入说明见 [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## 命令一览

| 命令 | 用途 |
| --- | --- |
| `lobsteros init --workspace "Payments Core"` | 初始化仓库本地配置 |
| `lobsteros plan --message "audit auth flow"` | 生成结构化执行计划 |
| `lobsteros report --message "ship release candidate"` | 导出 markdown 任务报告 |
| `lobsteros guard --command "git push origin main"` | 判断命令风险等级 |
| `lobsteros route --target github` | 推荐下一步应该在哪个表面执行 |
| `lobsteros learn --note "staging uses synthetic data"` | 保存长期有效知识 |
| `lobsteros doctor` | 输出仓库状态与记忆系统概览 |

## 设计原则

1. **Workspace over thread**：仓库比单次对话更重要。
2. **Safety over bravado**：危险操作要被约束，而不是被炫技化。
3. **Operator UX**：每一次输出都应该帮助真实的人做决策。
4. **Multi-surface by default**：terminal 很重要，但不是全部产品。
5. **Public engineering quality**：测试、文档、仓库卫生必须是第一层能力。

## 路线图

### 近期

- 更丰富的配置模板和策略包
- 带审批闸门的 shell 执行适配层
- GitHub issue / PR 工作流
- Slack 与 Telegram 的真实集成
- 更贴近真实团队任务的评测样本

### 中期

- 后台常驻 mission daemon
- 实时 TUI mission dashboard
- 不同角色的 agent 流程
- 插件 SDK 和适配器市场

完整路线图见 [docs/ROADMAP.md](./docs/ROADMAP.md)

## 对比定位

Super Lobster OS 想站在一个很明确的位置上：

- 比纯消息型助手更懂工作区
- 比纯终端型 coding agent 更懂多渠道协作
- 比私有或专有改造项目更适合公开做大

更多见 [docs/COMPARISON.md](./docs/COMPARISON.md)

## 开发

```bash
npm test
npm run demo
npm run report
```

## 贡献

欢迎重点贡献这些方向：

1. 提升真实仓库上的计划质量
2. 增强执行策略和安全规则
3. 加入真实协作渠道适配器
4. 补充评测基准和任务样本

提交 PR 前请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 安全

如果你发现安全问题，请按 [SECURITY.md](./SECURITY.md) 中的方式处理。

## 声明

项目来源与 clean-room 边界见 [NOTICE.md](./NOTICE.md)。

## 致谢

- OpenClaw，证明了 channel-native assistant 可以做得多激进。
- 更广泛的 coding-agent 生态，把 terminal UX 和 workspace awareness 的标准拉得很高。
