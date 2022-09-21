import request from 'supertest'
import { app } from '../../app'
import { StatusCodes } from 'http-status-codes'
import {createUsers} from '../../test/utils/specificUtils'
import { Minion } from '../../db/collections/minionCollection'
import {ObjectId} from 'bson'

it('unauthenticated access', async () => {
    await request(app)
    .get(`/api/user/${new ObjectId}/minions`)
    .expect(StatusCodes.UNAUTHORIZED)
})

it('verifying the minions list attributes', async () => {
    const info = await createUsers(2)

    let res = await request(app)
    .post(`/api/user/${info.users[1].userId}/toggleUser`)
    .set('Cookie', info.cookies[0])
    .expect(StatusCodes.OK)

    expect(res.body.isFollowing).toEqual(true)

    res = await request(app)
    .get(`/api/user/${info.users[0].userId}/isMinion`)
    .set('Cookie', info.cookies[1])
    .expect(StatusCodes.OK)

    expect(res.body.isMinion).toEqual(true)

    res = await request(app)
    .get(`/api/user/${info.users[1].userId}/minions/jhhj45`)
    .set('Cookie', info.cookies[0])
    .expect(StatusCodes.OK)

    

    expect(res.body.length).toEqual(1)

    expect(res.body[0].minion.userId).toEqual(info.users[0].userId.toHexString())
    expect(res.body[0].minion.userName).toEqual(info.users[0].userName)
})



it('testing the paginated minions list', async () => {

    await Minion.createIndex({messiahId: 1, minionId: 1})

    const info = await createUsers(98)
    const promises = []

    for(let i=1;i<98;i++){
        promises.push(
            request(app)
            .post(`/api/user/${info.users[0].userId}/toggleUser`)
            .set('Cookie', info.cookies[i])
            .expect(StatusCodes.OK)
        )
    }

    await Promise.all(promises)

    let lastMinionId = 'adwfs45'

    const getMinions = async (lastMinionId: string) => {
        const res = await request(app)
        .get(`/api/user/${info.users[0].userId}/minions/${lastMinionId}`)
        .set('Cookie', info.cookies[0])
        .expect(StatusCodes.OK)
        return res.body
    }

    let res = await getMinions(lastMinionId)
    expect(res.length).toEqual(20)

    
    
    lastMinionId = res[19].minion.userId
    res = await getMinions(lastMinionId)
    expect(res.length).toEqual(20)

    lastMinionId = res[19].minion.userId
    res = await getMinions(lastMinionId)
    expect(res.length).toEqual(20)

    lastMinionId = res[19].minion.userId
    res = await getMinions(lastMinionId)
    expect(res.length).toEqual(20)

    lastMinionId = res[19].minion.userId
    res = await getMinions(lastMinionId)
    expect(res.length).toEqual(17)

    lastMinionId = res[16].minion.userId
    res = await getMinions(lastMinionId)
    expect(res.length).toEqual(0)
    

})