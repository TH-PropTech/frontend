import { spawn } from 'node:child_process'
import { setTimeout as delay } from 'node:timers/promises'

const appUrl = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'
const startupTimeoutMs = 120_000

const server = spawn(
  process.execPath,
  [
    ...process.execArgv,
    './node_modules/next/dist/bin/next',
    'dev',
    '--hostname',
    'localhost',
  ],
  {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
    windowsHide: true,
  }
)

let serverExited = false

server.on('exit', () => {
  serverExited = true
})

try {
  await waitForUrl(appUrl, startupTimeoutMs)

  const testCode = await runPlaywright()

  await stopServer()
  process.exitCode = testCode
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  await stopServer()
  process.exitCode = 1
}

async function waitForUrl(url, timeoutMs) {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    if (serverExited) {
      throw new Error('Next.js dev server exited before it became ready.')
    }

    try {
      const response = await fetch(url, { method: 'HEAD' })

      if (response.ok) {
        return
      }
    } catch {
      await delay(500)
    }
  }

  throw new Error(`Timed out waiting for ${url}`)
}

function runPlaywright() {
  return new Promise(resolve => {
    const testProcess = spawn(
      process.execPath,
      [...process.execArgv, './node_modules/@playwright/test/cli.js', 'test'],
      {
        cwd: process.cwd(),
        env: process.env,
        stdio: 'inherit',
        windowsHide: true,
      }
    )

    testProcess.on('exit', code => {
      resolve(code ?? 1)
    })
  })
}

async function stopServer() {
  if (serverExited) {
    return
  }

  server.kill()
  await delay(1_000)

  if (!serverExited) {
    server.kill('SIGKILL')
  }
}
