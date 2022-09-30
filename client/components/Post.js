import { Like, LikeBW, Dislike, DislikeBW } from "./icons";
import Moment from "react-moment";

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';



  
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Post({ post, id, setOpen, setPost, ...props }) {
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    
    const router = useRouter();

    

    

    useEffect(() => {
        setHasLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
    }, [likes]);

    async function likePost() {
        if (currentUser) {
        if (hasLiked) {
            
        } else {
            
        }
        } else {
        // signIn();
        router.push("/auth/signin");
        }
    }

    async function deletePost() {
        if (window.confirm("Are you sure you want to delete this post?")) {
        if (post.data().image) {
            
        }
        router.push("/");
        }
    }

    const onCommentClick = () => {
        setPost(post);
        setOpen(true);
    }

    return (
        <div className="relative card space-y-4">
            {/* Heading */}
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center -m-2">
                <div className="w-8 h-8 overflow-hidden rounded-full cursor-pointer">
                    <img className="w-full" src={post.profileImage} alt={post.profileImage} />
                </div>
                <h2 className=" font-semibold">{post.userName}</h2>
                </div>
                <MoreHorizIcon className="w-5 h-5 cursor-pointer" />
            </div>
            {/* Posted Image */}
            <div className="relative -mx-5 aspect-square overflow-hidden">
                <img className="w-full" src={post.image} alt={post.username} />
            </div>
            {/* Actions */}
            <div className="space-y-2">
                <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-4">
                        <LikeBW className='w-7 h-7'/>
                        <DislikeBW className='w-7 h-7'/>
                        <ModeCommentOutlinedIcon 
                            onClick={onCommentClick}
                            className="w-7 h-7 cursor-pointer"
                        />
                    </div>
                <BookmarkBorderIcon className='w-7 h-7'/>
                </div>
                <span className=" font-semibold">{`${post.likes} likes`}</span>
                <p>
                    <span className="font-semibold">{post.username} </span>
                    {post.description}
                </p>
                <h3 className="text-xs text-gray-500">{post.createdAt}</h3>
            </div>

            <div className="h-[1px] relative left-0 right-0 bg-gray-200 -mx-5"></div>

            <div className="flex gap-4">
                <input
                className="focus:outline-none w-full"
                type="text"
                placeholder="Add a comment"
                />
                <button className="text-blue-500">Post</button>
            </div>
        </div>
    );
}