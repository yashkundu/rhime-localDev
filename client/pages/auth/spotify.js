import { SpotifyIcon } from "../../components/icons"



const Spotify = ({...props}) => {


    return (
        <div className="flex flex-row h-screen w-screen bg-gradient-to-l from-lime-500 ">
            <div className="select-none px-[15px] py-[5px] rounded-[20px] border-[1px] border-slate-300 hover:border-slate-400 shadow-md active:shadow-lg cursor-pointer mx-auto my-auto flex items-center">
                <div className="pr-[10px]">
                    <SpotifyIcon className="h-[25px] w-[25px]"/>
                </div>
                <div className="font-sans">Authorize Spotify</div>
            </div>
        </div>
    )
}

export default Spotify