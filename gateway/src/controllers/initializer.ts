import { Registry } from "@rhime/discovery"
import { registry as inMemReg } from "../state"

import { service, config } from "@rhime/discovery"

const initializer = async (reg: Registry) => {
    const values = await reg.getPrefix('rhime')
    for(const {key, value} of values) {
        inMemReg.put(key as service, JSON.parse(value) as config)
    }
}

export {initializer}