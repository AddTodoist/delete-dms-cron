import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET
})


// Delete all DMs using pagination
async function deleteAllDms() {
    let events = await client.v2.listDmEvents()

    while (events.events.length > 0) {
        for (const { id } of events.events) {
            await client.v1.deleteDm(id)
        }

        events = await events.next()
    }
}

await deleteAllDms()


