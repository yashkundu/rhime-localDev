import { app } from './app';
import { Registry, service } from '@rhime/discovery';
import { watcher } from './controllers/watcher';



const getEtcdWatcher = async (registry: Registry) => {
    try {
        const etcdEmitter = await registry.watchPrefix('rhime')
        console.log('Watching prefix "rhime" for keys  :(');
        return etcdEmitter
    } catch (error) {
        console.log('Error in watching prefix "rhime" for keys  :(');
        return null;
    }
}


const start = async () => {

    try {

        const envVariables = ['ACCESS_TOKEN_SECRET', 'SIGNED_COOKIE_SECRET', 
         'APP_URL', 'APP_PORT']

        for(const x of envVariables){
            if(!process.env[x]) throw new Error('Environment variables not declared')
        }
        
        app.listen(Number(process.env.APP_PORT), async () => {
            console.log(`Gateway started on port ${process.env.APP_PORT} ...`)
        
            const registry = new Registry({
                hosts: process.env.etcd_url as string
            })
        
            let etcdWatcher = await getEtcdWatcher(registry)
            while(!etcdWatcher) etcdWatcher = await getEtcdWatcher(registry)
        
            watcher(etcdWatcher)
        
        })

    } catch (error) {
        console.log(error);
    }

    
}


start()







