import { EventEmitter } from "events"
import {IKeyValue} from 'etcd3'
import { config, service } from "@rhime/discovery";

import { registry } from "../state";

const putListener = (kv: IKeyValue) => {
    const key = kv.key.toString()
    const value = kv.value.toString()
    console.log('Put action on key : ', key, value);
    if(!value) {
        registry.del(key as service);
        return;
    }
    if(value!==JSON.stringify(registry.get(key as service))){
        registry.put(key as service, JSON.parse(value) as config)
    }
}

const deleteListener = (kv: IKeyValue) => {
    const key = kv.key.toString()
    console.log('Delte action on key : ', key);
    registry.del(key as service);
}

const watcher = (emitter: EventEmitter) => {
    emitter.on('put', putListener).on('delete', deleteListener)
}

export {watcher}