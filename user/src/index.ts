import {app} from './app'
import {mongo} from './db/mongo'




const start = async () => {
    try {

        // implement a fucntion to check if all the env variables are set
        // other throw a big nasty error :)
        // envCheckerFunc() 
        const envVariables = ['ACCESS_TOKEN_SECRET', 
        'SIGNED_COOKIE_SECRET', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY']

        for(const x of envVariables){
            if(!process.env[x]) throw new Error('Environment variables not declared')
        }

        await mongo.connect('mongodb://127.0.0.1:27017/?directConnection=true')
        console.log('User service connected to MongoDb ... ');
        
        app.listen(9000, () => {
            console.log('User service listening on port 9000...');
        })
        
    } catch (error) {
        console.log(error);
    }
}

start()


