import {mongo} from '../mongo'
import { Collection, Document, ObjectId } from "mongodb";

export enum InfoFields{
    userId = 'userId',
    access_token = 'access_token',
    refresh_token = 'refresh_token',
    expiration = 'expiration'
}


export interface info extends Document{
    userId: ObjectId;
    access_token: string;
    refresh_token: string;
    expiration: Date
}

class InfoCollection {
    private _collection?: Collection<info>
    get collection(){
        if(!this._collection){
            this._collection = mongo.db.collection<info>('Info')
        }
        return this._collection
    }
}

declare global{
    interface ProxyConstructor{
        new<T ,P extends Document>(target: T, handler: ProxyHandler<any>): Collection<P>
    }
}


export const Info = new Proxy<InfoCollection, info>(new InfoCollection(), {
    get(target, prop){
        return target.collection[prop]
    }
})



