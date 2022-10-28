import { Document, Collection } from "mongodb";
import {mongo} from '../mongo'

import {ObjectId} from 'bson' 


export enum ItemReactionFields{
    itemId = 'itemId',
    userId = 'userId',
}

// single index
// (itemId, userId)  -->  composite primary key
// (itemId, type, userId)  --> another option for primary key
// or do the first one and make an index on posrId, type to get likes on the item
//Atlast check the efficiency of query using explain or split it if somefeatures are to 
// be upgraded.

export interface itemReaction extends Document{
    _id: {
        itemId: ObjectId,
        userId: ObjectId
    }
}


class ItemReactionCollection {
    private _collection!: Collection<itemReaction>;
    get collection(){
        if(!this._collection){
            this._collection = mongo.db.collection<itemReaction>('ItemReaction')
        }
        return this._collection
    }
}


declare global{
    interface ProxyConstructor{
        new<T, P extends Document> (target: T, handler: ProxyHandler<any>): Collection<P>
    }
}

export const ItemReaction = new Proxy<ItemReactionCollection, itemReaction>(new ItemReactionCollection(), {
    get(target, prop){
        return target.collection[prop]
    }
})