import {Request, Response, NextFunction} from 'express'
import { PROXY_ROUTES } from '../config'
import { registry } from '../state'
import httpProxy from 'http-proxy'

import { isAuthenticated, isAuthorized } from '../utils'



const proxy = httpProxy.createProxyServer({})

const errorHandler = (error: Error) => {
    console.log(error);
}

proxy.on('error', errorHandler)

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    // console.log(req.headers);
    // console.log(proxyReq.getHeaders());
});

// only auth service has req.user , all others have req.userAuth
const proxyMware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.signedCookies
        for(const record of PROXY_ROUTES) {
            if(req.url.startsWith(record.endpoint) && registry.get(record.serviceName)) {
                if(record.authentication) isAuthenticated(req)
                if(record.authorization) isAuthorized(req)

                proxy.web(req, res, {
                    target: registry.get(record.serviceName)?.url,
                    changeOrigin: record.changeOrigin
                })
                return;
            }
        }
        proxy.web(req, res, {
            target: process.env.CLIENT_URL,
            changeOrigin: true
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export {proxyMware}