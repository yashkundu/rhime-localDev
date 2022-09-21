import { mongo } from '../mongo';
import {Document, Collection} from 'mongodb'
import { ObjectId } from 'bson';


export enum UserProfileFields{
    userId = 'userId',
    userName = 'userName',
    email = 'email',
    firstName = 'firstName',
    lastName = 'lastName',
    bio = 'bio',
    age = 'age',
    gender = 'gender',
    profileImage = 'profileImage',
    minionCount = 'minionCount',
    messiahCount = 'messiahCount'
}

type genders = 'male' | 'female'

export interface userProfile extends Document{
    userId: ObjectId;
    userName: string;
    email: string;
    firstName: string;
    lastName?: string;
    bio?: string;
    age?: number;
    gender?: genders;
    profileImage?: string;
    minionCount: number;
    messiahCount: number;
} 


class UserProfileCollection {
    private _collection!: Collection<userProfile> 
    get collection(){
        if(!this._collection){
            this._collection = mongo.db.collection<userProfile>('UserProfile')
        }
        return this._collection
    }
}

declare global{
    interface ProxyConstructor{
        new<T,P extends Document>(target: T, handler: ProxyHandler<any>): Collection<P>
    }
}


export const UserProfile = new Proxy<UserProfileCollection, userProfile>(new UserProfileCollection(), {
    get(target, prop){
        return target.collection[prop]
    }
})
