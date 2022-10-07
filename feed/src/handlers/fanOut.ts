import {ObjectId} from 'bson'
import { CACHE_LIMIT } from '../config'
import { UserGraphView } from '../services/userGraphView'
import { ds } from '../ds/redis'
import { Minions } from '../interfaces/minionsInterface'


const fanOutPost = async (ownerId: ObjectId, postId: string) => {
    const call = UserGraphView.getMinions({userId: ownerId.toHexString()})

    const ownerKey = `user:${ownerId.toHexString()}`
    await ds.redis.pipeline()
        .zadd(ownerKey, Number(postId), postId)
        //@ts-ignore
        .reduceToLimit(ownerKey, CACHE_LIMIT)
        .exec()

    let minions: Minions;
    while(minions=call.read()){
        const pipeline = ds.redis.pipeline()
        minions.userIds.forEach(async (id:Buffer) => {
            const userKey = `user:${id.toString('hex')}`
            pipeline.zadd(userKey, Number(postId),  postId)
            // @ts-ignore
            pipeline.reduceToLimit(userKey, CACHE_LIMIT)
        })
        await pipeline.exec()
    }
}



export {fanOutPost}