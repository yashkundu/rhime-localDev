import {authenticate} from '../utils/authenticate'
import Link from 'next/link'

const Index = (props) => {
    return (
        <>
        <h3>Welcome to the index page : )</h3>
        <h2> Click this to authorize spotify :)</h2>
        <Link href="/api/spotify/authorize">
          <a>Authorize spotify</a>
        </Link>
        </>
    )
}

export default Index

export const getServerSideProps = authenticate(async () => {
    return {
        props: {

        }
    }
})


  