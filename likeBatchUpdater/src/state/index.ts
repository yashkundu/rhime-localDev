import {EVENT_BATCH_SIZE} from '../config'

class State {
    counter: number;
    // stores the number of likes of each post in memory for certain time
    likes: {[key: string]: number} = {};
    constructor() {
        this.counter = EVENT_BATCH_SIZE;
    }
    resetCounter() {
        this.counter = EVENT_BATCH_SIZE
    }
    resetLikes() {
        this.likes = {}
    }
    updateLike(itemId: string, num: number) {
        if(this.likes[itemId]===undefined) this.likes[itemId] = 0;
        this.likes[itemId] += num;
    }
}

export const state = new State();