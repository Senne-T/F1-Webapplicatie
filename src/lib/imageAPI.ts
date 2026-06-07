import 'server-only'

import fs from 'fs'
import path from 'path'

export function getDriversImages(): string[] {
  const dir = path.join(process.cwd(), 'public', 'drivers')

  // Lees alle bestanden in de map
  const files = fs.readdirSync(dir)

  // Filter op afbeeldingsformaten
  const images = files.filter(file => /\.(png|jpe?g|webp|svg)$/i.test(file))

  // Map naar /drivers/filename.ext
  return images.map(file => `/drivers/${file}`)
}

export function getTeamsImages(): string[] {
  const dir = path.join(process.cwd(), 'public', 'teams')

  // Lees alle bestanden in de map
  const files = fs.readdirSync(dir)

  // Filter op afbeeldingsformaten
  const images = files.filter(file => /\.(png|jpe?g|webp|svg)$/i.test(file))

  // Map naar /drivers/filename.ext
  return images.map(file => `/teams/${file}`)
}