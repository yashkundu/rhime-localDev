import { SparklesIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Input from "./Input";
import Post from "./Post";

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


export default function Feed(props) {
  const [posts, setPosts] = useState([post, post, post, post]);
  

  return (
    <div className="h-fit border-l border-r border-gray-200 xl:ml-[9%] xl:pl-[230px] lg:ml-[10%] lg:pl-[60px] md:ml-[6%] md:pl-[60px] sm:ml-[6%] sm:pl-[60px] pl-[60px] flex-grow xl:max-w-[715px] lg:max-w-[535px] md:max-w-[520px] sm:max-w-[520px] max-w-[545px] space-y-3">
      <div className="flex py-2 px-3 sticky top-0 z-10 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Post key={post.id} id={post.id} post={post} {...props}/>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}