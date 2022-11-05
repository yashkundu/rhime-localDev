// In memory registry
import {service} from '@rhime/discovery'


class State {
    private _endpoint: string | null;
    constructor() {
        this._endpoint = null;
    }
    get endpoint() {
        if(!this._endpoint) throw new Error(`${service.userGraphView} service not available`);
        return this._endpoint
    }
    set endpoint(str: string | null) {
        this._endpoint = str; 
    }
    isOnline() {
        return Boolean(this._endpoint)
    }
}

export const state = new State();