import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'

const folders = ['src', 'public']
const outputFolder = 'compressed'

async function compressImages(folder) {
  const files = await readdir(folder, { withFileTypes: true })

  for (const file of files) {
    const filePath = path.join(folder, file.name)

    if (file.isDirectory()) {
      await compressImages(filePath)
      continue
    }

    if (!/\.(png|jpe?g|webp)$/i.test(file.name)) {
      continue
    }

    const relativePath = path.relative('.', filePath)
    const outputPath = path.join(outputFolder, relativePath)

    await mkdir(path.dirname(outputPath), { recursive: true })

    try {
      await sharp(filePath)
        .jpeg({ quality: 80 })
        .toFile(outputPath.replace(/\.(png|jpe?g|webp)$/i, '.jpg'))

      console.log(`Image compressée : ${filePath}`)
    } catch (error) {
      console.error(`Erreur avec ${filePath} :`, error.message)
    }
  }
}

for (const folder of folders) {
  await compressImages(folder)
}

console.log('Compression terminée.')
