import request from 'supertest'
import { app } from '../../app'
import { createUsers, createPosts } from '../../test/utils/specificUtils'
import {StatusCodes} from 'http-status-codes'
import {Feed} from '../../db/collections/feedCollection'



it('Getting feed without authorizing', async () => {
    await request(app)
    .get('/api/feed')
    .expect(StatusCodes.UNAUTHORIZED)
})


it('Getting feed correctly', async () => {
    const info = createUsers(2)
    const posts = createPosts(10)

    for(let i=0;i<3;i++){
        await Feed.insertOne({
            userId: info.users[0].userId, 
            userName: info.users[0].userName,
            ...posts[i]})
    }

    for(let i=3;i<10;i++) {
        await Feed.insertOne({
            userId: info.users[1].userId, 
            userName: info.users[1].userName,
            ...posts[i]})
    }


    const res1 = await request(app)
    .get('/api/feed')
    .set('Cookie', info.cookies[0])
    .expect(StatusCodes.OK)

    expect(res1.body.posts.length).toEqual(3)
    expect(res1.body.posts[0].caption).toEqual(posts[0].caption)

    const res2 = await request(app)
    .get('/api/feed')
    .set('Cookie', info.cookies[1])
    .expect(StatusCodes.OK)

    expect(res2.body.posts.length).toEqual(7)
    expect(res2.body.posts[0].caption).toEqual(posts[3].caption)

})