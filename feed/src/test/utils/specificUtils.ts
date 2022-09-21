import {ObjectId, Int32} from 'bson'
import {faker} from '@faker-js/faker'
import { getCookie } from './jwt'



export const createUsers = (n: number) => {
    const users = []
    const cookies: string[] = []
    for(let i=0;i<n;i++){
      users.push({
        userId: new ObjectId(),
        userName: faker.internet.userName()
      })
      cookies.push(getCookie({userId: users[i].userId.toHexString(), userName: users[i].userName}))
    }
    return {users, cookies}
}


export const createPosts = (n: number) => {

    const posts = []
    for(let i=0;i<n;i++){
      posts.push({
        postId: new ObjectId(),
        caption: faker.company.catchPhraseDescriptor(),
        numComments: new Int32(0)
      })
    }

    return posts
}