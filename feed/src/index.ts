import {app} from './app'
import {mongo} from './db/mongo'
import { ds } from './ds/redis'



const start = async () => {
    try {
        const envVariables = ['ACCESS_TOKEN_SECRET', 
        'SIGNED_COOKIE_SECRET']

        for(const x of envVariables){
            if(!process.env[x]) throw new Error('Environment variables not declared')
        }

        await mongo.connect('mongodb://127.0.0.1:27017/?directConnection=true')
        console.log('User service connected to MongoDb ... ');

        await ds.connect({host: '127.0.0.1', port: 6379})
        console.log('User service connected to Redis instance ... ');

        ds.defineCommands()

        app.listen(14000, () => {
            console.log('Feed service is listening on port 14000...');
        })
        
    } catch (error) {
        console.log(error);
    }
}

start()


