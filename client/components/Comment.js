import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Comment = ({user, comment}) => {
    return (
        <div className="flex justify-center">
            <div className='px-3 shrink-0'>
                <img src={user.profileImage} alt="User" className="w-10 h-10 rounded-full"/>
            </div>
            <div className='flex-grow'>
                <div>
                <span className=' mr-3 font-bold'>{user.userName}</span>
                {comment.text}
                </div>
                <div className='mt-1 font-light text-sm'>
                    <span className='mr-3'>{comment.timeStamp}</span>
                    <span>{comment.likes} likes</span>
                </div>
            </div>
            <div className='px-1 mx-2 cursor-pointer'>
                <FavoriteBorderIcon />
            </div>
        </div>
    )
}


export default Comment