const counter = 0;
import {useState} from 'react'

import ConnectedUser from '../components/ConnectedUser';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';


import { hof } from '../utils/hof';

const connect = () => {

    const [first, setFirst] = useState(1)
    const [second, setSecond] = useState(2)


    const updateState = (counter) => {
        return () => {
            document.querySelectorAll(".flipBtns").forEach(el => (el.disabled=false));
        }
    }

    const clickHandler = (e) => {
        document.querySelectorAll(".flipBtns").forEach(el => (el.disabled=true));
        document.getElementById('toBeRotated').style.transform = `rotateY(${(counter+1)*180}deg)`
        counter++;
        setTimeout(updateState(counter), 800)
    }

    return (
        <div className="flex flex-col h-[90vh] xl:ml-[9%] xl:pl-[230px] lg:ml-[10%] lg:pl-[60px] md:ml-[6%] md:pl-[60px] sm:ml-[6%] sm:pl-[60px] pl-[60px] flex-grow xl:max-w-[950px] lg:max-w-[720px] md:max-w-[600px] sm:max-w-[590px] max-w-[560px] space-y-3">
            
            {/* <ConnectedUser user={user}/> */}
            
            
            <div className="flip-card mx-auto my-auto h-[80%] w-[85%] bg-transparent">
                <div id="toBeRotated" className="rounded-[35px] flip-card-inner h-[100%] w-[100%] relative">
                    <div id="firstCard" className="flip-card-front absolute h-[100%] w-[100%]">
                        <ConnectedUser user={user}/>
                    </div>
                    <div id="secondCard" className="flip-card-back absolute h-[100%] w-[100%]">
                        <ConnectedUser user={user}/>
                    </div>
                </div>
            </div> 

            <LowerButtons clickHandler={clickHandler}/>

        </div>
    )
}

export default connect

const CardInfo = ({num}) => {
    return (
        <h3>I am {num} card</h3>
    )
}

const LowerButtons = ({clickHandler}) => {
    return (
        <div className="flex justify-center items-center">
            <div className='bg-white border-[1px] border-slate-300 shadow-lg rounded-[25px] flex space-x-[45px] px-[10px] py-[5px]'>
                <div className='flex justify-center items-center border-[1px] border-black w-[35px] h-[35px] rounded-full'>
                    <IconButton onClick={clickHandler} className='flipBtns' color='info'>
                        <ClearIcon />
                    </IconButton>
                </div>
                <div className='flex justify-center items-center border-[1px] border-black w-[35px] h-[35px] rounded-full'>
                    <IconButton onClick={clickHandler} className='flipBtns' color='error'>
                        <FavoriteIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}


const genres = ['Pop', 'Hip hop', 'Desi Hip hop', 'Blues', 'Metallica', 'Indie', 'Rock', 'RnB', 'K-pop']
const artist = {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png/220px-191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png",
    artistName: "Taylor Swift"
}
const track = {
    imageUrl: 'https://justrandomthings.com/wp-content/uploads/2016/09/8-Mile-Gallery-8-1.jpg',
    trackName: 'Lose yourself',
    artistName: 'Eminem'
}

const artists = [artist, artist, artist, artist, artist, artist, artist, artist, artist]
const tracks = [track, track, track, track, track, track, track, track, track]

const userProfile = {
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    name: 'Yashasvi',
    userName: 'yashkundu',
    age: 22
}

const user = {
    userProfile,
    artists,
    tracks,
    genres
}

export const getServerSideProps = hof( async () => {
    return {
        props: {
            sideBars: true,
            authenticationReq: true,
            authorizationReq: true
        }
    }
})
