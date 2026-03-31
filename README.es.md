<div align="center">
  <img src="./docs/assets/lobster-hero.svg" alt="Super Lobster OS hero" width="960">
</div>

<h1 align="center">Super Lobster OS</h1>

<p align="center">
  <strong>Un sistema operativo de IA, terminal-first, para misiones reales de desarrollo.</strong>
</p>

<p align="center">
  Super Lobster OS es un proyecto clean-room que une dos ideas potentes en una plataforma pública y extensible:<br>
  <strong>orquestación nativa por canal</strong> y <strong>ejecución nativa del workspace</strong>.
</p>

<p align="center">
  <a href="./README.md">English</a>
  ·
  <a href="./README.zh-CN.md">简体中文</a>
  ·
  <a href="./README.ja.md">日本語</a>
  ·
  <strong>Español</strong>
  ·
  <a href="./README.ko.md">한국어</a>
</p>

<p align="center">
  <a href="https://github.com/wimi321/super-lobster-os/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/wimi321/super-lobster-os/ci.yml?style=for-the-badge&label=CI"></a>
  <a href="./LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-0f172a?style=for-the-badge"></a>
  <img alt="Node 20+" src="https://img.shields.io/badge/node-20%2B-0f766e?style=for-the-badge">
  <img alt="Status Alpha" src="https://img.shields.io/badge/status-alpha-f97316?style=for-the-badge">
</p>

## La idea

Hoy la mayoría de los productos de IA para developers caen en uno de dos extremos:

- viven dentro de superficies de chat, pero entienden poco el repositorio;
- o entienden bien el repositorio, pero se sienten como una pestaña de terminal con esteroides.

**Super Lobster OS** apuesta por hacer ambas cosas al mismo tiempo.

- Entender el workspace.
- Recordar lo que el equipo ya aprendió.
- Evaluar el riesgo operativo antes de ejecutar.
- Enviar el siguiente paso a la mejor superficie: terminal, GitHub, Slack o móvil.
- Mantenerse público, forkable y legalmente limpio.

## Qué lo hace distinto

| Capacidad | Valor práctico |
| --- | --- |
| Mission Planning | Convierte una petición en un plan secuenciado y anclado al workspace actual |
| Safety Guardrails | Bloquea comandos destructivos y marca acciones sensibles para revisión |
| Persistent Memory | Guarda conocimiento duradero en `.lobsteros/memory.json` |
| Channel Routing | Recomienda si una tarea debe vivir en terminal, GitHub, Slack o móvil |
| Clean-room Posture | Aprende de ecosistemas fuertes, pero con implementación original y pública |
| Markdown Reports | Exporta briefs legibles para issues, PRs y handoffs |

## Por qué existe

Super Lobster OS se construye explícitamente como un proyecto **clean-room**, inspirado por:

- la filosofía operator y channel-native de OpenClaw;
- el estilo workspace-aware de los coding agents modernos.

Este repositorio **no** redistribuye código propietario de Claude Code.
Reconstruye los patrones útiles con una implementación original para convertirse en un proyecto público serio y no en un fork privado con riesgo legal.

## Qué incluye hoy

- `lobsteros init` crea `.lobsteros/config.json`
- `lobsteros plan` genera un plan consciente del workspace
- `lobsteros report` exporta un brief de misión en markdown
- `lobsteros guard` clasifica comandos como `allow`, `review` o `deny`
- `lobsteros route` recomienda la mejor superficie de colaboración
- `lobsteros learn` persiste conocimiento operativo
- `lobsteros doctor` inspecciona el estado del proyecto y la memoria

## Inicio rápido

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

## Arquitectura

<div align="center">
  <img src="./docs/assets/mission-map.svg" alt="Super Lobster OS architecture map" width="920">
</div>

### Módulos principales

- `src/core/config.mjs`: bootstrap y carga de configuración del workspace
- `src/core/workspace-memory.mjs`: memoria duradera y aprendizajes del equipo
- `src/core/planner.mjs`: generación de planes según prompt y forma del workspace
- `src/core/safety-policy.mjs`: clasificación de comandos y bloqueo de acciones destructivas
- `src/core/channel-router.mjs`: recomendación de superficie para terminal, GitHub, Slack y Telegram
- `src/core/reporter.mjs`: generador de briefs en markdown
- `src/core/mission-control.mjs`: capa de orquestación
- `src/cli.mjs`: interfaz de terminal sin dependencias externas

Más detalle: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## Desarrollo

```bash
npm test
npm run demo
npm run report
```

## Hoja de ruta

- perfiles de configuración y policy packs más ricos
- adaptadores de shell con approval gates
- workflows reales para issues y PRs en GitHub
- integraciones Slack y Telegram
- dashboard TUI en vivo
- SDK de plugins y marketplace de adaptadores

Ver también [docs/ROADMAP.md](./docs/ROADMAP.md)
