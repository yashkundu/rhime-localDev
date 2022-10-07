import {app} from './app'
import {mongo} from './db/mongo'




const start = async () => {
    try {

        // implement a fucntion to check if all the env variables are set
        // other throw a big nasty error :)
        // envCheckerFunc() 
        const envVariables = ['ACCESS_TOKEN_SECRET', 
        'SIGNED_COOKIE_SECRET']

        for(const x of envVariables){
            if(!process.env[x]) throw new Error('Environment variables not declared')
        }

        await mongo.connect('mongodb://127.0.0.1:27017/?directConnection=true')
        console.log('User service connected to MongoDb ... ');
        
        app.listen(13000, () => {
            console.log('User Graph service listening on port 13000...');
        })
        
    } catch (error) {
        console.log(error);
    }
}

start()


