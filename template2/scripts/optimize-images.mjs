/**
 * Compresses PNG/JPEG assets in-place and generates .webp siblings for modern browsers.
 * Run: npm run optimize-images
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGE_ROOT = path.resolve(__dirname, '../src/assets/images')

async function collectImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectImages(fullPath)))
      continue
    }
    if (/\.(png|jpe?g)$/i.test(entry.name) && !entry.name.endsWith('.webp')) {
      files.push(fullPath)
    }
  }
  return files
}

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const original = await fs.readFile(filePath)
  const webpPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp')

  await sharp(filePath)
    .webp({ quality: 82, effort: 4 })
    .toFile(webpPath)

  let optimized
  if (ext === '.png') {
    optimized = await sharp(filePath)
      .png({ quality: 82, compressionLevel: 9, palette: true })
      .toBuffer()
  } else {
    optimized = await sharp(filePath)
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer()
  }

  if (optimized.length < original.length) {
    await fs.writeFile(filePath, optimized)
    console.log(
      `✓ ${path.relative(IMAGE_ROOT, filePath)}: ${(original.length / 1024).toFixed(0)}KB → ${(optimized.length / 1024).toFixed(0)}KB`,
    )
  } else {
    console.log(`· ${path.relative(IMAGE_ROOT, filePath)}: kept original (already optimal)`)
  }

  const webpStat = await fs.stat(webpPath)
  console.log(`  webp: ${(webpStat.size / 1024).toFixed(0)}KB`)
}

async function main() {
  const images = await collectImages(IMAGE_ROOT)
  console.log(`Optimizing ${images.length} images in ${IMAGE_ROOT}\n`)
  for (const file of images) {
    await optimizeFile(file)
  }
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
