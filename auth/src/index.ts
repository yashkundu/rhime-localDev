import {app} from './app'
import {mongo} from './db/mongo'



const start = async () => {
    try {

        // implement a fucntion to check if all the env variables are set
        // other throw a big nasty error :)
        // envCheckerFunc() 
        const envVariables = ['ACCESS_TOKEN_SECRET', 'SIGNED_COOKIE_SECRET', 
        'SPOTIFY_CLIENT_KEY', 'SPOTIFY_CLIENT_SECRET']

        for(const x of envVariables){
            if(!process.env[x]) throw new Error('Environment variables not declared')
        }

        await mongo.connect('mongodb://127.0.0.1:27017')
        console.log('Auth service connected to MongoDb ... ');
        app.listen(5000, () => {
            console.log('Auth service listening on port 5000...');
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

start()


