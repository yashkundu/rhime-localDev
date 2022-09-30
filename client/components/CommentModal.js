import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Comment from "./Comment";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InputUnstyled from '@mui/base/InputUnstyled';



const Modal = ({setOpen, post, ...props}) => {
    return (
      <div className="h-[550px] w-[460px] z-20 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 fixed rounded-lg bg-white hidden md:flex flex-col p-2 shadow-md">
        <div className="flex justify-end">
          <CloseIcon
            className="cursor-pointer h-7 w-7"
            onClick={() => {
                setOpen(false)
            }}
          />
        </div>
        <div className="flex flex-col">
          <div className="space-y-4 h-[450px] overflow-scroll">
            {post.comments.map((comment) => (
              <Comment user={comment.user} comment={comment.comment}></Comment>
            ))}
          </div>
          <div className="flex mt-3 shrink-0 items-center">
            <div className="shrink-0 px-3">
              <img src={post.profileImage} alt="User" className="w-10 h-10 rounded-full"/>
            </div>
            <div className="flex-grow">
              <input type="text" placeholder="Add a comment" className="border-0 focus:border-0 border-b-2 border-slate-500 w-[100%]"/>
            </div>
            <div className="shrink-0 px-1 mx-2 cursor-pointer">
              <AddCircleOutlineIcon/>
            </div>
          </div>
        </div>
      </div>
    );
}


export default function CommentModal({open, ...props}){
    return (
        <>
            {open && (
                <Modal {...props}/>
            )}
        </>
    )
}