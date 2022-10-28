import { Document, Collection } from "mongodb";
import {mongo} from '../mongo'

import {ObjectId, Int32} from 'bson' 


export enum ReactionCountFields{
    itemId = 'itemId',
    count = 'count'
}


export interface reactionCount extends Document{
    _id: ObjectId;                      // itemId
    count: Int32
}


class ReactionCountCollection {
    private _collection!: Collection<reactionCount>;
    get collection(){
        if(!this._collection){
            this._collection = mongo.db.collection<reactionCount>('RealTimeReactionCount')
        }
        return this._collection
    }
}


declare global{
    interface ProxyConstructor{
        new<T, P extends Document> (target: T, handler: ProxyHandler<any>): Collection<P>
    }
}

export const ReactionCount = new Proxy<ReactionCountCollection, reactionCount>(new ReactionCountCollection(), {
    get(target, prop){
        return target.collection[prop]
    }
})