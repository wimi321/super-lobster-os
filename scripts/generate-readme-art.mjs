import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { chromium } from 'playwright'

const root = process.cwd()
const heroPath = path.join(root, 'docs', 'assets', 'lobster-hero.svg')
const mapPath = path.join(root, 'docs', 'assets', 'mission-map.svg')
const socialSvgPath = path.join(root, 'docs', 'assets', 'social-preview.svg')
const socialPngPath = path.join(root, 'docs', 'assets', 'social-preview.png')
const websiteHeroPath = path.join(root, 'docs', 'assets', 'website-hero.svg')
const docsCoverPath = path.join(root, 'docs', 'assets', 'docs-cover.svg')

const server = http.createServer((request, response) => {
  const requestedPath = request.url === '/' ? '/scripts/readme-art.template.html' : request.url
  const localPath = path.join(root, decodeURIComponent(requestedPath))

  if (!localPath.startsWith(root) || !fs.existsSync(localPath) || fs.statSync(localPath).isDirectory()) {
    response.writeHead(404)
    response.end('Not found')
    return
  }

  const ext = path.extname(localPath)
  const contentType = ext === '.html'
    ? 'text/html; charset=utf-8'
    : ext === '.js' || ext === '.mjs'
      ? 'application/javascript; charset=utf-8'
      : ext === '.svg'
        ? 'image/svg+xml'
        : 'text/plain; charset=utf-8'

  response.writeHead(200, { 'Content-Type': contentType })
  response.end(fs.readFileSync(localPath))
})

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const address = server.address()
if (address === null || typeof address === 'string') {
  throw new Error('Unable to determine local preview server address.')
}

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
page.on('console', (message) => {
  console.log(`[browser:${message.type()}] ${message.text()}`)
})
page.on('pageerror', (error) => {
  console.error(`[browser:error] ${error.message}`)
})
await page.goto(`http://127.0.0.1:${address.port}/scripts/readme-art.template.html`)
await page.waitForFunction(() => typeof window.generateReadmeArt === 'function')
const result = await page.evaluate(() => window.generateReadmeArt())
await browser.close()
server.close()

fs.writeFileSync(heroPath, `${result.hero}\n`, 'utf8')
fs.writeFileSync(mapPath, `${result.missionMap}\n`, 'utf8')
fs.writeFileSync(socialSvgPath, `${result.socialPreview}\n`, 'utf8')
fs.writeFileSync(websiteHeroPath, `${result.websiteHero}\n`, 'utf8')
fs.writeFileSync(docsCoverPath, `${result.docsCover}\n`, 'utf8')

const pngBrowser = await chromium.launch({ headless: true })
const pngPage = await pngBrowser.newPage({ viewport: { width: 1280, height: 640 }, deviceScaleFactor: 1 })
await pngPage.setContent(`<body style="margin:0;background:#08111f;">${result.socialPreview}</body>`)
await pngPage.screenshot({ path: socialPngPath })
await pngBrowser.close()

console.log(`Generated ${path.relative(root, heroPath)}, ${path.relative(root, mapPath)}, ${path.relative(root, socialSvgPath)}, ${path.relative(root, socialPngPath)}, ${path.relative(root, websiteHeroPath)}, and ${path.relative(root, docsCoverPath)}`)
