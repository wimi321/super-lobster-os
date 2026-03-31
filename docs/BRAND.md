# Brand System

Super Lobster OS should feel like a serious operator-grade tool, not generic AI wallpaper.

## Principles

- Calm over noisy
- Sharp hierarchy over decorative clutter
- Warm signal colors over default purple gradients
- Readability first, especially for GitHub and docs surfaces
- Every asset should feel generated from the same design language

## Asset Set

- `docs/assets/lobster-hero.svg`: primary README hero
- `docs/assets/mission-map.svg`: README architecture/supporting visual
- `docs/assets/social-preview.svg`: scalable social preview source
- `docs/assets/social-preview.png`: ready-to-upload GitHub/Open Graph preview
- `docs/assets/website-hero.svg`: landing page / website hero
- `docs/assets/docs-cover.svg`: documentation cover asset

## Generation Pipeline

Assets are generated through a browser-rendered typography pipeline using `@chenglou/pretext` for line layout and Playwright for export.

```bash
npm run art:generate
```

## Notes

If copy changes, regenerate the assets instead of hand-editing SVG text positions.
