import { EventEmitter } from "events"
import {IKeyValue} from 'etcd3'
import { config } from "@rhime/discovery";

import { UserGraphView } from "../services/userGraphView";

import { state } from "../state";



const putListener = async (kv: IKeyValue) => {
    const key = kv.key.toString()
    const value = kv.value.toString()
    console.log('Put action on key : ', key, value);
    if(value && state.isOnline() && (JSON.parse(value) as config).url===state.endpoint) return;
    state.endpoint = (value)?((JSON.parse(value) as config).url):null;
    UserGraphView.init();
}

const deleteListener = async (kv: IKeyValue) => {
    const key = kv.key.toString()
    console.log('Delete action on key : ', key);
    state.endpoint = null
    UserGraphView.init()
}

const watcher = (emitter: EventEmitter) => {
    emitter.on('put', putListener).on('delete', deleteListener)
}

export {watcher}