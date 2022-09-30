import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import DateRangeIcon from "@mui/icons-material/DateRange";
import Post from "../../components/Post";
import Link from 'next/link'

import format from "date-fns/format";

const comment = {
    user: {
      userName: 'yashkundu',
      profileImage: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    comment: {
      text: 'Hey there. How are you doing . This is some random comment :)',
      timeStamp: '2d',
      likes: 69
    }
}

const post = {
    profileImage: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    image: 'https://media.gettyimages.com/photos/5121988pontiac-michicago-bulls-superstar-michael-jordan-slams-two-of-picture-id515301500',
    userName: 'yashkundu',
    likes: 20,
    createdAt: 'April 8, 2022',
    description: 'Hey how are you !!!',
    comments: [comment, comment, comment, comment, comment, comment, comment, comment]
}

const user = {
    name: 'Yashasvi',
    userName: 'yashKundu',
    posts: [post, post, post, post, post, post],
    backgroundImage: 'https://www.trendycovers.com/covers/homer_simpson_facebook_cover_1400350284.jpg',
    bio: 'Young wild and dumb',
    createdAt: new Date(Date.now() - 60*60*60*60),
    profileImage: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
}

const Profile = ({setPost, setOpen, ...props}) => {

    const followingStatus = false
    const followerStatus = false


    const theme = useTheme();
    
    const [portion, setPortion] = useState(1)

   

    

    const handleFollow = async () => {
        
    };

    const handleUnfollow = async () => {
        
    };

    function hideFollow() {
        
    }

    function isFollowVisible() {
        
    }

    return (
        <div className="h-fit xl:ml-[9%] xl:pl-[230px] lg:ml-[10%] lg:pl-[60px] md:ml-[6%] md:pl-[60px] sm:ml-[6%] sm:pl-[60px] pl-[60px] flex-grow xl:max-w-[850px] lg:max-w-[680px] md:max-w-[640px] sm:max-w-[620px] max-w-[630px] space-y-3">
            <Box className="border-l border-r border-gray-400">
                <Box className="bg-white sticky top-0 z-10" borderBottom="1px solid #ccc" padding="8px">
                    <Grid container alignItems="center">
                        <Grid item sx={{ mr: "10px" }}>
                            <Link href="/">
                            <IconButton>
                                <ArrowBackIcon />
                            </IconButton>
                            </Link>
                        </Grid>
                    


                        
                        <Grid item>
                        <Typography variant="h6">
                            {user.name}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "#555" }}>
                            {user.posts.length} posts
                        </Typography>{" "}
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Box position="relative">
                        <img
                        width="100%"
                        src={user.backgroundImage}
                        alt="background"
                        />
                    <Box
                        sx={{
                            position: "absolute",
                            top: 120,
                            left: 15,
                            background: "#eee",
                            borderRadius: "50%",
                        }}
                        >
                        <img width="150px" src={user.profileImage} alt="profile" />
                    </Box>
                </Box>
                    <Box textAlign="right" padding="10px 20px">
                        <IconButton>
                        <MoreHorizIcon />
                        </IconButton>
                        <IconButton>
                        <MessageOutlinedIcon />
                        </IconButton>
                        {!hideFollow() && isFollowVisible() && (
                        <button
                            className="bg-[#f98b88] hover:bg-[#e30913] px-2 py-1 rounded-[16px]"
                            onClick={handleFollow}
                        >
                            Follow
                        </button>
                        )}

                        {!hideFollow() && !isFollowVisible() && (
                        <button
                        className="bg-[#a08f8e] hover:bg-[#3e2e30] text-white px-2 py-1 rounded-[16px]"
                            onClick={handleUnfollow}
                        >
                            Unfollow
                        </button>
                        )}
                    </Box>
                    <Box padding="10px 20px">
                        <Typography variant="h6" sx={{ fontWeight: "500" }}>
                        {user.name}
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "#555" }}>
                        @{user.userName}
                        </Typography>
                        <Typography fontSize="16px" color="#333" padding="10px 0">
                        {user.bio}
                        </Typography>
                        <Box
                        display="flex"
                        alignItems="center"
                        padding="6px 0"
                        flexWrap="wrap"
                        >
                        
                        <Box display="flex">
                            <DateRangeIcon htmlColor="#555" />
                            <Typography sx={{ ml: "6px", color: "#555" }}>
                            {"MMM dd yyyy"}
                            </Typography>
                        </Box>
                        </Box>
                        <Box display="flex">
                        <Typography color="#555" marginRight="1rem">
                            <strong style={{ color: "black" }}>
                            {followingStatus === "success" && followings.length}
                            </strong>
                            Following
                        </Typography>
                        <Typography color="#555" marginRight="1rem">
                            <strong style={{ color: "black" }}>
                            {followerStatus === "success" && followers.length}
                            </strong>
                            Followers
                        </Typography>
                        </Box>
                    </Box>
                
                <div className="text-slate-400 my-4 flex justify-center space-x-8 border-b-2 border-slate-200">
                    <div onClick={() => setPortion(1)} className={"pb-2 cursor-pointer hover:text-black" + ((portion===1)?"border-solid border-b-4 border-blue-700 text-black":"")}>Recommends</div>
                    <div onClick={() => setPortion(2)} className={"pb-2 cursor-pointer hover:text-black" + ((portion===2)?"border-solid border-b-4 border-blue-700 text-black":"")}>Artists</div>
                    <div onClick={() => setPortion(3)} className={"pb-2 cursor-pointer hover:text-black" + ((portion===3)?"border-solid border-b-4 border-blue-700 text-black":"")}>Tracks</div>
                </div>

                {portion===1 && (<Recommends user={user} setOpen={setOpen} setPost={setPost}/>)}
                {portion===2 && (<Artists />)}
                {portion===3 && (<Tracks />)}
                    
                </Box>
            </Box>
        </div>
    )
}

export default Profile


export const getServerSideProps = async () => {

    return {
        props: {
            user: {userName: 'yashkundu', name: 'Yashasvi'}
        }
    }
}

const Recommends = ({user, setOpen, setPost}) => {
    return (
        <>
            {user.posts &&
                    user.posts.map((post) => (
                    <Post key={post._id} post={post} profile={true} setOpen={setOpen} setPost={setPost} />
                    ))}
                
        </>
    )
}

const em = {
    name: 'Eminem',
    imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSusoQHrrN1QD_DMEYP5yYn1bBI-oj7rnnA7WeK7429w1NyCeYV'
}

const artists = [em, em, em, em, em, em, em, em, em, em, em, em]

const Artists = () => {
    return (
        <div class="p-2">
            <div className="pb-6 text-center font-semibold text-[35px]">Top Artists 🎸</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                {artists.map(artist => (
                    <div className="flex p-4">
                        <div className="mx-auto my-auto">
                            <div className="">
                                <img src={artist.imageUrl} alt={artist.name} className="rounded-full h-[145px] w-[145px] hover:bg-slate-200 cursor-pointer"/>
                            </div>
                            <div className="text-center">{artist.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const track = {
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b273b75a94b6ed1d6c4d51074e54',
    name: 'Eres tu',
    info: 'Fifth Harmony - Juntos'
}

const tracks = [track, track, track, track, track, track, track, track]

const Tracks = () => {
    return (
        <div class="p-2">
            <div className="pb-6 text-center font-semibold text-[35px]">Top Tracks 🎶</div>
            <div className="px-4 space-y-6">
                {tracks.map(track => (
                    <div className="flex items-center hover:bg-slate-200 cursor-pointer">
                        <div className="shrink-0 ">
                            <img src={track.imageUrl} alt={track.name} className="w-[65px] h-[65px]"/>
                        </div>
                        <div className="flex-grow px-3">
                            <div className="font-semibold text-lg">{track.name}</div>
                            <div className="text-sm">{track.info}</div>
                        </div>
                    </div>
                ))}
            </div>  
        </div>
    )
}