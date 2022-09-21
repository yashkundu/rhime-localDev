import {mongo} from '../mongo'
import {Collection, Document, ObjectId} from 'mongodb'

export enum UserFields{
    firstName = 'firstName',
    lastName = 'lastName',
    email = 'email',
    userName = 'userName',
    password = 'password',
    isValid = 'isValid',
    sessionId = 'sessionId'
}

export interface user extends Document{
    firstName: string;
    lastName?: string;
    email: string;
    userName: string;
    password: string;
    isValid: boolean;
    sessionId?: ObjectId
}

class UserCollection{
    private _collection!: Collection<user>;
    get collection(){
        if(!this._collection){
            this._collection = mongo.db.collection<user>('User')
        }
        return this._collection
    }
}

export const User = new Proxy<UserCollection, user>(new UserCollection(), {
    get(target, prop){
        return target.collection[prop as keyof typeof target.collection]
    }
})