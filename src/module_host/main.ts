import { load_plugins, dispatch_event_to_plugins } from "./pluginManager.js";

// index/main entry point
export default async function main() {
    await load_plugins()

    // test sim a chat message
    dispatch_event_to_plugins('chat', {
        type: 'chat.message',
        payload: {
            user: 'testUser',
            message: 'Hello, world!',
        },
    })

    // test sim a stream event
    dispatch_event_to_plugins('stream', {
        type: 'stream.alert',
        payload: {
            title: 'New Follower!',
            user: 'MunchMcFood123',
        },
    })
}

main()