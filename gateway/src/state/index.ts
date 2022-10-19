// In memory registry
import {service} from '@rhime/discovery'
import {config} from '@rhime/discovery'


class Registry {
    private store: {[key in service]?: config} = {};

    put(key: service, value: config) {
        console.log('Putting -- ', key, value);
        this.store[key] = value;
    };

    del(key: service){
        console.log('Deleting -- ', key);
        if(this.store[key]) delete this.store[key];
    }

    get(key: service) {
        return this.store[key];
    }
}

export const registry = new Registry();