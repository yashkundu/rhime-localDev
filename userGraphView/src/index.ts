import {mongo} from './db/mongo'
import path from "path"
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ObjectId } from 'bson'
import { Minion } from './db/collections/minionCollection'
import { Messiah } from './db/collections/messiahCollection'
import { Minions } from './interfaces/minionsInterface'
import { Messiahs } from './interfaces/messiahsInterface'
import { SingleUser } from './interfaces/userInterface'

const userId = new ObjectId('208e8551b309b22d2bdfc6d8')


const PROTO_PATH = path.join(__dirname, '/protos', '/userGraph.proto')

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    defaults: true,
    oneofs: true
})

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
const protoPkg = protoDescriptor.pkg



async function getMinions(call: grpc.ServerWritableStream<SingleUser, Minions>){
    console.log(call.request.userId);
    
    
    const cursor = Minion.find({messiahId: call.request.userId})
    while(await cursor.hasNext()){
        const docs = cursor.readBufferedDocuments()
        const list: Buffer[] = []
        docs.forEach((doc) => {
            list.push(doc.minionId.id)
        })
        call.write({userIds: list})
    }
    call.end()
}

async function getMessiahs(call: grpc.ServerWritableStream<SingleUser, Messiahs>){
    console.log(call.request.userId);
    
    
    const cursor = Messiah.find({minionId: call.request.userId})
    while(await cursor.hasNext()){
        const docs = cursor.readBufferedDocuments()
        const list: Buffer[] = []
        docs.forEach((doc) => {
            list.push(doc.messiahId.id)
        })
        call.write({userIds: list})
    }
    call.end()
}

const populate = async () => {
    for(let i=0;i<100;i++) {
        await Minion.insertOne({
            messiahId: userId,
            minionId: new ObjectId()
        })
    }
}


const start = async () => {
    try {

        await mongo.connect('mongodb://127.0.0.1:27017/')
        await populate()
        console.log('User Graph View service connected to MongoDb ... ');
        
        const server = new grpc.Server()
        // @ts-ignore
        server.addService(protoPkg.UserGraphView.service, {getMinions: getMinions, getMessiahs: getMessiahs})

        server.bindAsync('0.0.0.0:9700', grpc.ServerCredentials.createInsecure(), () => {
            server.start()
            console.log('User Graph View server started listening on port 9700...')
        })

    } catch (error) {
        console.log(error)
    }
}


start()





