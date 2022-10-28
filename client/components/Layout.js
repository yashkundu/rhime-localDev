import Head from "next/head";
import { useState } from 'react';
import CommentModal from '../components/CommentModal';


import Sidebar from "./Sidebar"
import Widgets from "./Widgets"



const Layout = ({Children, ...props}) => {

    const [open, setOpen] = useState(false)
    const [post, setPost] = useState(null)

    return (
        <div>
            <Head>
                <title>Twitter Clone</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar user={props.user}/>

                {/* Feed */}

                <Children {...props}  setPost={setPost} setOpen={setOpen}/>

                {/* Widgets */}

                <Widgets user={props.user} />

                <CommentModal open={open} setOpen={setOpen} post={post}/>

            </main>
        </div>
    )
}

export default Layout