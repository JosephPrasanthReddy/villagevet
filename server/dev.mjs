import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const viteBin = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js')

const children = []
let shuttingDown = false

function start(label, args) {
  const child = spawn(process.execPath, args, {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
  })
  children.push(child)

  child.on('exit', (code, signal) => {
    if (shuttingDown) return
    if (signal) console.error(`${label} stopped (${signal}).`)
    else if (code !== 0) console.error(`${label} exited with code ${code}.`)
    shutdown(code || 0)
  })

  return child
}

function shutdown(code = 0) {
  if (shuttingDown) return
  shuttingDown = true
  for (const child of children) {
    if (!child.killed) child.kill('SIGTERM')
  }
  setTimeout(() => process.exit(code), 150).unref()
}

process.on('SIGINT', () => shutdown(0))
process.on('SIGTERM', () => shutdown(0))

console.log('Starting VillageVet website + AI server...')
start('VillageVet AI server', ['server/ai-server.mjs'])
start('Vite', [viteBin])
