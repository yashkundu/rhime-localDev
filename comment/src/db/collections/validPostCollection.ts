import { Document, Collection } from "mongodb";
import {mongo} from '../mongo'


export enum ValidPostFields{
    
}

export interface validPost extends Document{
    _id: string;            // postId
}


class ValidPostCollection {
    private _collection!: Collection<validPost>;
    get collection(){
        if(!this._collection){
            this._collection = mongo.db.collection<validPost>('ValidPost')
        }
        return this._collection
    }
}


export const ValidPost = new Proxy<ValidPostCollection, validPost>(new ValidPostCollection(), {
    get(target, prop){
        return target.collection[prop]
    }
})