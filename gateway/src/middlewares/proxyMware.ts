import {Request, Response, NextFunction} from 'express'
import { PROXY_ROUTES } from '../config'
import { registry } from '../state'
import httpProxy from 'http-proxy'

import { authenticated } from '@rhime/common'

const proxy = httpProxy.createProxyServer({})

const errorHandler = (error: Error) => {
    console.log('error --------------------------------------------');
    console.log(error);
}

proxy.on('error', errorHandler)

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    // console.log(proxyReq);
    // console.log(req);
    // console.log(res);
    // console.log(options);
});

const proxyMware = async (req: Request, res: Response, next: NextFunction) => {
    for(const record of PROXY_ROUTES) {
        if(req.url.startsWith(record.endpoint) && registry.get(record.serviceName)) {
            if(record.authentication) authenticated(req, res, ()=>{})
            proxy.web(req, res, {
                target: registry.get(record.serviceName)?.url,
                changeOrigin: record.changeOrigin
            })
            return;
        }
    }
    next()
}

export {proxyMware}