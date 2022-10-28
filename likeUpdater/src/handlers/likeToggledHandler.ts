import { JsMsg } from "nats"
import { EventEmitter } from "events";
import { LikeToggledEvent } from "@rhime/events";
import { state } from "../state";

import {mongo} from '../db/mongo'

import { ItemReaction } from "../db/collections/ItemReactionCollection";

import {ObjectId} from 'bson'

const natsEmitter = new EventEmitter()

const likeToggledHandler = async (event: LikeToggledEvent, msg: JsMsg) => {
    
    const session = mongo.client.startSession();

    try {
        const itemId = new ObjectId(event.itemId)
        const userId = new ObjectId(event.userId)

        //remove this transaction .. very inefficient :(
        await session.withTransaction(async () => {
            const res = await ItemReaction.deleteOne({
                _id: {itemId, userId}
            })
            if(!res.deletedCount) {
                await ItemReaction.insertOne({
                    _id: {itemId, userId}
                })
            }
        })
    } catch (error) {
        throw error
    }
    finally {
        await session.endSession();
    }


    msg.ack()
    state.counter--;
    if(!state.counter) {
        state.reset();
        natsEmitter.emit('finished');
    }
}

export {likeToggledHandler, natsEmitter}