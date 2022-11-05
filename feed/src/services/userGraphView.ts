import path from "path"
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

import { state } from "../state"

const PROTO_PATH = path.join(__dirname, '../protos', '/userGraph.proto')

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    defaults: true,
    oneofs: true
})

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
const protoPkg = protoDescriptor.pkg

// @ts-ignore
// const UserGraphView = new protoPkg.UserGraphView(state.endpoint, grpc.credentials.createInsecure());


class UserGraphViewWrapper {
    private _userGraphView: any;

    init() {
        try {
            // @ts-ignore
            this._userGraphView = new protoPkg.UserGraphView(state.endpoint, grpc.credentials.createInsecure());
            console.log('UserGraphView endpoint added : ', state.endpoint);
            
        } catch (error) {
            console.log(error);
        }
    }

    get service() {
        if(!this._userGraphView) throw new Error('UserGraphView not instantiated');
        return this._userGraphView
    }

}


export const UserGraphView = new UserGraphViewWrapper()