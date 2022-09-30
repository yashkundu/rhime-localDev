import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton } from '@mui/material';
import ListLayout from './ConnectedLayouts/listLayout';
import SquareLayout from './ConnectedLayouts/squareLayout';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import {Chip} from '@mui/material';

import { useState } from 'react';

const ConnectedUser = ({user, ...props}) => {

    const [screen, setScreen] = useState(1)

    const leftClickHandler = () => {
        if(screen>1) setScreen(screen-1)
    }

    const rightClickHandler = () => {
        if(screen<6) setScreen(screen+1)
    }

    const simpleBorder = "flex-grow border-b-[4px]"
    const selectedBorder = "flex-grow border-b-[4px] border-slate-500"

    return (
        <div className="border-[1px] rounded-[35px] border-slate-300 shadow-md relative h-[100%] w-[100%]">
            <div className="absolute top-[0%] bg-transparent space-x-[5px] flex justify-between h-[15px] w-[100%] px-[22px]">
                <div className={(screen===1)?selectedBorder:simpleBorder}></div>
                <div className={(screen===2)?selectedBorder:simpleBorder}></div>
                <div className={(screen===3)?selectedBorder:simpleBorder}></div>
                <div className={(screen===4)?selectedBorder:simpleBorder}></div>
                <div className={(screen===5)?selectedBorder:simpleBorder}></div>
                <div className={(screen===6)?selectedBorder:simpleBorder}></div>
            </div>
            <div className="flex h-[100%]">
                <div className="absolute bg-transparent shrink-0 h-[100%] flex items-center">
                    <IconButton onClick={leftClickHandler} size="medium">
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <div className="flex-grow h-[100%]">
                    {screen===1 && (<Screen1 userProfile={user.userProfile}/>)}
                    {screen===2 && (<Screen2 user={user}/>)}
                    {screen===3 && (<Screen3 user={user}/>)}
                    {screen===4 && (<Screen4 user={user}/>)}
                    {screen===5 && (<Screen5 user={user}/>)}
                    {screen===6 && (<Screen6 user={user}/>)}
                </div>
                <div className="absolute bg-transparent left-[100%] -translate-x-[100%] shrink-0 h-[100%] flex items-center">
                    <IconButton onClick={rightClickHandler} size="medium">
                        <ChevronRightIcon />  
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default ConnectedUser



const BottomUser = ({userProfile}) => {
    return (
        <div className='bg-white flex items-center flex-grow rounded-b-[35px]'>
            <div className='shrink-0 px-4'>
                <img src={userProfile.imageUrl} alt={userProfile.name} className="h-11 w-11 rounded-full"/>
            </div>
            <div className='flex-grow'>
                <div>
                    <span className='font-semibold'>{userProfile.name}</span>
                    <span>, {userProfile.age}</span>
                </div>
                <div className='text-[15px] -mt-1'>@{userProfile.userName}</div>
            </div>
        </div>
    )
}

const Screen1 = ({userProfile}) => {
    return (
        <div className='h-[100%] bg-white rounded-[35px] flex flex-col'>
           <div className='flex flex-col items-center h-[100%] w-[100%]'>
                <img src="https://www.trendycovers.com/covers/homer_simpson_facebook_cover_1400350284.jpg" alt="" className='rounded-t-[35px] w-[100%] h-[40%]'/>
                <div className='absolute h-[100%] w-[100%] flex'>
                    <img src={userProfile.imageUrl} alt={userProfile.name} className="h-[120px] w-[120px] rounded-full top-[100px] mx-auto mt-[33%] -translate-y-1/2"/>
                </div>
                <div className='mt-[28px]'><span className='font-semibold'>{userProfile.name}</span><span className='text-[13px]'>, 22</span></div>
                <div className='-mt-[5px] text-[13px]'>@{userProfile.userName}</div>
                <div className='pt-[8px] space-x-2'>
                    <Chip icon={<AudiotrackIcon />} label="Pop" variant="outlined" size="small" color="success"/>
                    <Chip icon={<AudiotrackIcon />} label="Hip Hop" variant="outlined" size="small" color="success"/>
                    <Chip icon={<AudiotrackIcon />} label="Electro" variant="outlined" size="small" color="success"/>
                    <Chip icon={<AudiotrackIcon />} label="Eminem" variant="outlined" size="small" color="success"/>
                </div>
                <div className='mt-[15px] text-purple-600 font-mono text-[15px] font-semibold px-[40px]'>
                    Just trying to stay alive :)
                </div>
                <div className='absolute top-[100%] -translate-y-[100%] bg-gray-200 flex justify-center items-center rounded-b-[35px] h-fit w-[100%] py-[15px]'>
                    <div className='flex flex-col items-center px-[25px] border-r-[1px] border-black'>
                        <div>Minions</div>
                        <div className='font-sans'>542</div>
                    </div>
                    <div className='flex flex-col items-center px-[25px] border-r-[1px] border-black'>
                        <div>Recommends</div>
                        <div className='font-sans'>124</div>
                    </div>
                    <div className='flex flex-col items-center px-[25px]'>
                        <div>Likes</div>
                        <div className='font-sans'>19875</div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

const Screen2 = ({user}) => {
    return (
        <div className='h-[100%] bg-[#D3F65E] rounded-[35px] flex flex-col'>
            <div className='mx-[10px] pt-[7%] pb-[4%] text-center font-semibold text-[25px]'>
                The music we both love 💞
            </div>
            <SquareLayout items={user.tracks} isTrack/>
            <BottomUser userProfile={user.userProfile} />
        </div>

    )
}

const Screen3 = ({user}) => {
    return (
        <div className='h-[100%] bg-[#FF6CFA] rounded-[35px] flex flex-col'>
            <div className='mx-[10px] pt-[7%] pb-[4%] text-center font-semibold text-[25px]'>
                The genres that unite us 💛
            </div>
            <ListLayout genres={user.genres} />    
            <BottomUser userProfile={user.userProfile} />        
        </div>
    )
}

const Screen4 = ({user}) => {
    return (
        <div className='h-[100%] bg-[#D3F65E] rounded-[35px] flex flex-col'>
            <div className='mx-[10px] pt-[7%] pb-[4%] text-center font-semibold text-[25px]'>
                My top artists 🎤
            </div>
            <SquareLayout items={user.artists}/>
            <BottomUser userProfile={user.userProfile} />
        </div>
    )
}

const Screen5 = ({user}) => {
    return (
        <div className='h-[100%] bg-[#FFE455] rounded-[35px] flex flex-col'>
            <div className='mx-[10px] pt-[7%] pb-[4%] text-center font-semibold text-[25px]'>
                My top tracks 🎧
            </div>
            <SquareLayout items={user.tracks} isTrack/>
            <BottomUser userProfile={user.userProfile} />
        </div>
    )
}

const Screen6 = ({user}) => {
    return (
        <div className='h-[100%] bg-[#FF6CFA] rounded-[35px] flex flex-col'>
            <div className='mx-[10px] pt-[7%] pb-[4%] text-center font-semibold text-[25px]'>
                My music genres 🎶
            </div>
            <ListLayout genres={user.genres} />
            <BottomUser userProfile={user.userProfile} />
        </div>
    )
}