// intex.ts is the root entry point for testing with yarn for now

import path from 'path'
import { fileURLToPath } from 'url'

// make sure we are in ESM mode, and using dynamic import
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function bootstrap() {
    console.log("[root-index] bootstrapping module host...")

    try {
        const moduleHost = await import('./src/module_host/main.js')
        // call the main function exported from module host
        if (typeof moduleHost.default === 'function') {
            await moduleHost.default()
        } else {
            console.warn("[root-index] main.ts does not export a default function")
        }
    } catch (err) {
        console.error('[root-index] failed to start module host:', err)
        process.exit(1)
    }
}

bootstrap()