import { ltTaskWorker } from "./ltTaskWorker";
import { stTaskWorker } from './stTaskWorker';
import { stTaskQueue } from './stTaskQueue';
import { mongo } from "./db/mongo";
import { initialFetch } from './processors/initialFetch';
import { scheduledFetch } from './processors/scheduledFetch';
import { batchedFavourites } from './processors/batchedFavourites';
import { batchedRecommends } from './processors/batchedRecommends';
// import { fetchInitialUserFavourites } from "./utils/fetchUserFavourites";

// const myObjectId = 'e0b4dcb58f22eb50dd54ea67';
// const myObjectId2 = 'e0b4dcb58f22eb50dd54ea68';
// const myObjectId3 = 'e0b4dcb58f22eb50dd54ea69';

// // const access_token = 'BQDXYr7SJtFjyQP4qtm7J3p2aAuDOuTQVIcDri_dseLGapda_arnKq3NrikporfJmQ1AUJ5PYyMtvHjpQisj61XPW4Cpc9UDcy7WpRvnO4fwQcYiGxdCfmdKwMH-xCnd30OUCSEyQRUiCQ7eqKkiQxTr_VSUgK2zPHRnWW5LazyOdRJXvXHZ-L28HqIojOF5iF0e9PjNie6TKw'
// // const refresh_token = 'AQBBjsugVsjfHolZRHDL1Yi5aYB2csYz_dZvRHWuGDhHCeMWxBlX3JJ1xmipdAFq2D4ZXDgYxiEJE4FVsDN9BNE7W6OO6TGosdHq4i0HBfjK7mQHb0rXNiEvz-pmgUyEkhE'

const start = async () => {
    
    await startLtWorker()
    await startStWorker()
    await startStQueue()

    await mongo.connect('mongodb://127.0.0.1:27017/?directConnection=true')
    console.log('Recommendation service connected to MongoDb ... ');
    
    // await fetchInitialUserFavourites(myObjectId)
    // console.log("Initial data fetched and persisted ...")
}


const startLtWorker = async () => {
    ltTaskWorker.manager.initialFetch = initialFetch
    ltTaskWorker.manager.scheduledFetch = scheduledFetch
    await ltTaskWorker.start({
        host: '127.0.0.1',
        port: 6379,
        maxRetriesPerRequest: null
    })
    console.log('LtWorker for bullmq is connected ...');
}

const startStWorker = async () => {
    stTaskWorker.manager.batchedFavourites = batchedFavourites
    stTaskWorker.manager.batchedRecommends = batchedRecommends
    await stTaskWorker.start({
        host: '127.0.0.1',
        port: 6379,
        maxRetriesPerRequest: null
    })
    console.log('StWorker for bullmq is connected ...');
}

const startStQueue = async () => {
    await stTaskQueue.connect({
        host: '127.0.0.1',
        port: 6379
    })
    console.log('StQueue for bullmq is connected ...');
}



start()