import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

type ChatEvent = {
    type: 'chat.message'
    payload: {
        user: string
        message: string
    }
}

type StreamEvent = {
    type: 'stream.alert'
    payload: {
        title: string
        user: string
    }
}

// usage: onEvent?: (event: PluginEvent) => void
export type PluginEvent = ChatEvent | StreamEvent

// basic plugin interface
export type Plugin = {
    name: string
    type: 'chat' | 'stream'
    onInit?: () => void
    onEvent?: (event: PluginEvent) => void // types above
}

// declare plugins type annotation
const plugins: Plugin[] = []

/**
 * dynamically load all plugins in each directory.
 */
export async function load_plugins() {
    const basePath = path.resolve('src', 'plugins')

    const loadFromFolder = async (folder: 'chat' | 'stream') => {
        const folderPath = path.join(basePath, folder)
        const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.ts') || f.endsWith('.js'))

        for (const file of files) {
            const fullPath = pathToFileURL(path.join(folderPath, file)).href
            try {
                const pluginModule = await import(fullPath)
/**
 * This funtion is dynamically importing modules so we want explicit check that
 *  each plugin has a default export.
 */
                if (!pluginModule.default) {
                    throw new Error(`Plugin ${file} must use \`export default\``)
                }

                const plugin: Plugin = { ...pluginModule.default, type: folder }
                plugins.push(plugin)
                plugin.onInit?.()
                console.log(`[pluginManager] loaded ${folder} plugin: ${plugin.name}`)
            } catch(err) {
                console.error(`[pluginManager] failed to load plugin ${file}:`, err)
            }
        }
    }

    await loadFromFolder('chat')
    await loadFromFolder('stream')

    // output summary of plugin count.
    const chatCount = plugins.filter(p => p.type === 'chat').length
    const streamCount = plugins.filter(p => p.type === 'stream').length
    console.log(`[pluginManager] loaded ${chatCount} chat, ${streamCount} stream plugins.`)
    console.log(`[pluginManager] loaded ${plugins.length} total plugins.`)
}

/**
 * dispatch event to all plugins of a certain type.
 */
export function dispatch_event_to_plugins(type: 'chat' | 'stream', event: any) {
    console.log(`[pluginManager] loaded ${plugins.length} total plugins`)
    plugins
        .filter(p => p.type === type)
        .forEach(p => {
            try {
                p.onEvent?.(event)
            } catch(err) {
                console.error(`[pluginManager] plugin ${p.name} threw an error onEvent:`, err)
            }
        })
}