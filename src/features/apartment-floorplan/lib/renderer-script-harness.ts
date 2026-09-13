import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const RENDERER_DIR = join(process.cwd(), 'public', 'apartment-floorplan')

// Renderer files are browser IIFEs that register globals on `window`; run them against a stub.
export function runRendererScripts(
  fileNames: string[],
  globals: Record<string, unknown> = {}
): Record<string, unknown> {
  const windowStub: Record<string, unknown> = {}
  const names = Object.keys(globals)
  const values = Object.values(globals)
  fileNames.forEach(fileName => {
    const source = readFileSync(join(RENDERER_DIR, fileName), 'utf8')
    new Function('window', ...names, source)(windowStub, ...values)
  })
  return windowStub
}
