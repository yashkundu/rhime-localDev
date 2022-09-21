import { ChakraProvider } from "@chakra-ui/react"
import Header from '../components/header'


const App = ({Component, pageProps}) => {
    return (
        <ChakraProvider>
            <Header user={pageProps.user}/>
            <Component {...pageProps}/>
        </ChakraProvider>
    )
}


export default App