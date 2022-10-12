import {mongo} from '../mongo'
import { Collection, Document } from "mongodb";
import {ObjectId, Double} from 'bson'

export enum RecommendFields{
    _id = '_id',
    similarity = 'similarity',
    userId1 = 'userId1',
    userId2 = 'userId2'
}


export interface recommend extends Document{
    _id: {
        userId1: ObjectId;           // userId
        userId2: ObjectId            // (_id.userId1, isValid, similarity)  -- index
    }                               // make all the viewed recommendations invalid
    isValid: boolean;               // and maybe delete them after some time
    similarity: Double                // 
}
// will store the favourite artists of every user :)

class RecommendCollection {
    private _collection?: Collection<recommend>
    get collection(){
        if(!this._collection){
            this._collection = mongo.db.collection<recommend>('Recommend')
        }
        return this._collection
    }
}



export const Recommend = new Proxy<RecommendCollection, recommend>(new RecommendCollection(), {
    get(target, prop){
        return target.collection[prop]
    }
})



