import { Document, Collection } from "mongodb";
import {mongo} from '../mongo'

import {ObjectId} from 'bson' 


export enum CommentFields{
    postId = 'postId',
    usreName = 'userName',
    userId = 'userId',
    text = 'text',
    timeStamp = 'timeStamp'
}


// no need to index userId :(
// (postId, commentId) -- index
// later add some redundancy for those fields which changes less othen to invrease efficiency
export interface comment extends Document{
    postId: ObjectId;
    userId: ObjectId;
    userName: string,
    text: string;
    timeStamp: Date
}


class CommentCollection {
    private _collection!: Collection<comment>;
    get collection(){
        if(!this._collection){
            this._collection = mongo.db.collection<comment>('Comment')
        }
        return this._collection
    }
}


declare global{
    interface ProxyConstructor{
        new<T, P extends Document> (target: T, handler: ProxyHandler<any>): Collection<P>
    }
}

export const Comment = new Proxy<CommentCollection, comment>(new CommentCollection(), {
    get(target, prop){
        return target.collection[prop]
    }
})