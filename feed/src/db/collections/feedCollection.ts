import { Document, Collection } from "mongodb";
import { ObjectId, Int32 } from "bson";
import {mongo} from '../mongo'


export enum FeedFields{
    userId = 'userId',
    postId = 'postId',
    userName = 'userName',
    caption = 'caption',
    numComments = 'numComments'
}

export interface feed extends Document{
    userId: ObjectId;
    postId: ObjectId;
    userName: string;
    caption: string;
    numComments: Int32
}


class FeedCollection {
    private _collection!: Collection<feed>;
    get collection(){
        if(!this._collection){
            this._collection = mongo.db.collection<feed>('Feed')
        }
        return this._collection
    }
}


declare global{
    interface ProxyConstructor{
        new<T, P extends Document> (target: T, handler: ProxyHandler<any>): Collection<P>
    }
}

export const Feed = new Proxy<FeedCollection, feed>(new FeedCollection(), {
    get(target, prop){
        return target.collection[prop]
    }
})