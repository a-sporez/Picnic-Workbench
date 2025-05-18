import { PluginEvent } from "../../pluginManager"

const echoPlugin = {
    name: 'EchoPlugin',
    onInit: () => { // runs once when the plugin is loaded.
        console.log('[EchoPlugin] initialized.')
    },
    onEvent: (event: PluginEvent) => { // runs when an event is dispatched to this plugin.
        console.log('[EchoPlugin] received', event)
    },
}

export default echoPlugin