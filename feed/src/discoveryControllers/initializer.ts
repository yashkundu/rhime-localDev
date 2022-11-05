import { Registry } from "@rhime/discovery"

import { service } from "@rhime/discovery"
import { state } from "../state"

import { UserGraphView } from "../services/userGraphView"

const initializer = async (reg: Registry) => {
    const value = await reg.getOne(service.userGraphView);
    state.endpoint = value;
    UserGraphView.init()
}

export {initializer}