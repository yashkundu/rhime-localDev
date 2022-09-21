import request from 'supertest'
import { app } from '../../app'
import { StatusCodes } from 'http-status-codes'

const obj = {
    firstName: "Yashasvi",
    lastName: "Kundu",
    userName: "yashkundu",
    email: "yashkundu@gmail.com",
    password: "yashkundu@123"
}

const signin = async () => {
    await request(app)
    .post('/api/auth/signup')
    .send(obj)
    .expect(StatusCodes.CREATED)

    const response = await request(app)
    .post('/api/auth/signin')
    .send({email: obj.email, password: obj.password})
    .expect(StatusCodes.OK)

    return response.headers['set-cookie']
}

it('accessToken is not refreshed', async () => {
    const response = await request(app)
    .get('/api/auth/refresh')
    .expect(StatusCodes.UNAUTHORIZED)

    expect(response.body.errors[0].refresh).toEqual(false)
})


it('accessCode is refreshed', async () => {
    const cookies = await signin()
    const refreshToken = cookies[1].split('; ')[0]

    let response = await request(app)
    .get('/api/auth/refresh')
    .set('Cookie', refreshToken)
    .expect(StatusCodes.OK)


    expect(response.headers['set-cookie'][0]).toMatch(/^accessToken=[\S\s]+/)
    const accessToken = response.headers['set-cookie'][0].split('; ')[0]

    response = await request(app)
    .get('/api/auth/currentUser')
    .set('Cookie', accessToken)
    .expect(StatusCodes.OK)

    expect(response.body.userName).toEqual(obj.userName)



})

