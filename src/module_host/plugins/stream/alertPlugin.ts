import { PluginEvent } from "../../pluginManager"

const alertPlugin = {
    name: 'AlertPlugin',
    onInit: () => { // runs once when the plugin is loaded.
        console.log('[AlertPlugin] initialized.')
    },
    onEvent: (event: PluginEvent) => { // runs when an event is dispatched to this plugin.
        console.log('[AlertPlugin] Stream Event:', event)
    },
}

export default alertPlugin