import { Document, Collection } from "mongodb";
import {mongo} from '../mongo'
import {ObjectId} from 'bson'

export enum MinionFields {
    messiahId = 'messiahId',
    minionId = 'minionId'
}

export interface minion extends Document{
    messiahId: ObjectId;          // (messiahId, minionId) will be the indexed field
    minionId: ObjectId
}

class MinionCollection {
    private _collection?: Collection<minion>
    get collection(){
        if(!this._collection){
            this._collection = mongo.db.collection<minion>('Minion')
        }
        return this._collection
    }
}


declare global{
    interface ProxyConstructor{
        new<T, P extends Document> (target: MinionCollection, handler: ProxyHandler<any>): Collection<P>
    }
}


export const Minion = new Proxy<MinionCollection, minion>(new MinionCollection(), {
    get(target, prop){
        return target.collection[prop]
    }
})