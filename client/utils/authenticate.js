import axios from 'axios'

export const authenticate = (gssp) => {
    return async (context) => {
        let data;
        try {
            const res = await axios.get('http://127.0.0.1:80/api/auth/currentUser', {
                headers: context.req.headers
            })
            data = res.data
            console.log(res);
        } catch (error) {
            data = null
            console.log('authentication middleware error --- ',error);
        }
        const pageProps = await gssp(context)
        pageProps.props.user = data
        return pageProps
    }
}