import axios from 'axios'

// hof -> higher order function 
// gssp -> get server side props
const hof = (gssp) => {
    return async (context) => {
        let data;
        let pageProps = await gssp(context);
        try {
            const res = await axios.get('/api/auth/currentUser', {
                baseURL: process.env.gateway_url,
                headers: context.req.headers
            })
            // data  -> {sideBar, authenticationReq, authorizationReq}
            data = res.data
            console.log(data);
            // pageProps.props  -> {sideBar, authenticationReq, authorizationReq}
            pageProps.props.user = data
            if(!data.isAuth) 
                if(!pageProps.props.authorizationReq) return pageProps
                else 
                    return {
                        redirect: {
                            permanent: false,
                            destination: "/auth/spotify"
                        }
                    }
            if(!pageProps.props.authenticationReq || !pageProps.props.authorizationReq)
                return {
                    redirect: {
                        permanent: false,
                        destination: "/"
                    }
                }

        } catch (error) {
            data = null
            console.log('authentication middleware error --- ');
            if(pageProps.props.authenticationReq)
                return {
                    redirect: {
                        permanent: false,
                        destination: "/auth/signin"
                    }
                }
        }
        
         
        pageProps.props.user = data
        return pageProps
    }
}

export {hof}