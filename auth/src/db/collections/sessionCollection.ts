import {mongo} from '../mongo'
import {ObjectId, Document, Timestamp, Collection} from 'mongodb'


export enum SessionFields{
    userId = 'userId',
    timeStamp = 'timeStamp'
}

export interface session extends Document{
    userId: ObjectId;
    timeStamp: Timestamp
}


class SessionCollection{
    private _collection!: Collection<session>;
    get collection(){
        if(!this._collection) {
            this._collection = mongo.db.collection<session>('Session')
        }
        return this._collection
    }
}

declare global{
    interface ProxyConstructor{
        new<T ,P extends Document>(target: T, handler: ProxyHandler<any>): Collection<P>
    }
}



export const Session = new Proxy<SessionCollection, session>(new SessionCollection(), {
    get(target, prop){
        return target.collection[prop]
    }
})
