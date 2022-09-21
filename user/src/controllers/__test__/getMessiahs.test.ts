import request from 'supertest'
import { app } from '../../app'
import { StatusCodes } from 'http-status-codes'
import {createUsers} from '../../test/utils/specificUtils'
import { Messiah } from '../../db/collections/messiahCollection'
import {ObjectId} from 'bson'

it('unauthenticated access', async () => {
    await request(app)
    .get(`/api/user/${new ObjectId}/messiahs`)
    .expect(StatusCodes.UNAUTHORIZED)
})

it('verifying the messiahs list attributes', async () => {
    const info = await createUsers(2)

    let res = await request(app)
    .post(`/api/user/${info.users[1].userId}/toggleUser`)
    .set('Cookie', info.cookies[0])
    .expect(StatusCodes.OK)

    expect(res.body.isFollowing).toEqual(true)

    res = await request(app)
    .get(`/api/user/${info.users[1].userId}/isMessiah`)
    .set('Cookie', info.cookies[0])
    .expect(StatusCodes.OK)

    expect(res.body.isMessiah).toEqual(true)

    res = await request(app)
    .get(`/api/user/${info.users[0].userId}/messiahs/jhhj45`)
    .set('Cookie', info.cookies[0])
    .expect(StatusCodes.OK)


    expect(res.body.length).toEqual(1)

    expect(res.body[0].messiah.userId).toEqual(info.users[1].userId.toHexString())
    expect(res.body[0].messiah.userName).toEqual(info.users[1].userName)
})



it('testing the paginated messiahs list', async () => {

    await Messiah.createIndex({minionId: 1, messiahId: 1})

    const info = await createUsers(98)
    const promises = []

    for(let i=1;i<98;i++){
        promises.push(
            request(app)
            .post(`/api/user/${info.users[i].userId}/toggleUser`)
            .set('Cookie', info.cookies[0])
            .expect(StatusCodes.OK)
        )
    }

    await Promise.all(promises)

    let lastMessiahId = 'adwfs45'

    const getMessiahs = async (lastMessiahId: string) => {
        const res = await request(app)
        .get(`/api/user/${info.users[0].userId}/messiahs/${lastMessiahId}`)
        .set('Cookie', info.cookies[0])
        .expect(StatusCodes.OK)
        return res.body
    }

    let res = await getMessiahs(lastMessiahId)
    expect(res.length).toEqual(20)

    
    
    lastMessiahId = res[19].messiah.userId
    res = await getMessiahs(lastMessiahId)
    expect(res.length).toEqual(20)

    lastMessiahId = res[19].messiah.userId
    res = await getMessiahs(lastMessiahId)
    expect(res.length).toEqual(20)

    lastMessiahId = res[19].messiah.userId
    res = await getMessiahs(lastMessiahId)
    expect(res.length).toEqual(20)

    lastMessiahId = res[19].messiah.userId
    res = await getMessiahs(lastMessiahId)
    expect(res.length).toEqual(17)

    lastMessiahId = res[16].messiah.userId
    res = await getMessiahs(lastMessiahId)
    expect(res.length).toEqual(0)
    

})