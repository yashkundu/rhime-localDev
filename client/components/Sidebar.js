import Image from "next/future/image";
import SidebarMenuItem from "./SidebarMenuItem";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  EllipsisHorizontalCircleIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeIcon from '@mui/icons-material/Home';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MessageIcon from '@mui/icons-material/Message';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

import { Button } from '@mui/material'
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

import { useRouter } from "next/router";

export default function Sidebar({user}) {
  const router = useRouter();

  return (
    <div className="xl:ml-[9%] lg:ml-[10%] md:ml-[6%] sm:ml-[6%] flex flex-col xl:p-[8px] xl:items-start fixed h-full">
      {/* Rhime Logo */}
      <div className="cursor-pointer hidden mt-3 xl:inline xl:px-1">
        <Image
          width="150"
          height="150"
          alt="Rhime"
          src="https://i.ibb.co/f0MpNGJ/LogoName.png"
          ></Image>
      </div>

      <div className="cursor pointer p-[8px]  xl:hidden">
        <Image
          width="40"
          height="40"
          alt="R"
          src="https://i.ibb.co/gj8njW8/Logo.png"
          ></Image>
      </div>

      {/* Menu */}

      <div className="mt-4 mb-2.5">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Trending" Icon={TrendingUpIcon} />
        {user && (
          <>
            <SidebarMenuItem text="Notifications" Icon={FavoriteBorderIcon} />
            <SidebarMenuItem text="Connect" Icon={PeopleAltIcon} />
            <SidebarMenuItem text="Saved" Icon={BookmarksIcon} />
            <SidebarMenuItem text="Profile" Icon={SentimentSatisfiedAltIcon} />
          </>
        )}
      </div>

      {/* Button */}

      {user ? (
        <>
          <Button className="hidden mt-3 xl:flex" variant="outlined" startIcon={<AudiotrackIcon />}
            sx={{
              color: "#f98b88",
              borderColor: "#f98b88",
              padding: "15px 15px",
              marginLeft: "7px",
              borderRadius: "35px",
              fontSize: "18px",
              ':hover': {
                borderColor: "#f98b88",
                fontWeight: 'bold',
                backgroundColor: "#f98b88",
                color: "#FFFFFF"
              }
            }}
          >
            Recommend
          </Button>

          {/* Mini-Profile */}

          <div className="flex items-end justify-center pb-9 xl:justify-start mt-auto">
            <div className="hoverEffect text-gray-700 flex items-center justify-center">
              <img
                onClick={() => (1)}
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="user-img"
                className="h-11 w-11 rounded-full xl:mr-2"
              />
              <div className="leading-5 hidden xl:inline self-center">
                <h4 className="font-bold">{'yashkundu'}</h4>
                <p className="text-gray-500">@{'mf'}</p>
              </div>
              <EllipsisHorizontalCircleIcon className="h-5 xl:ml-8 hidden xl:inline self-center" />
            </div>
          </div>
        </>
      ) : (
        <button
          onClick={() => router.push("/auth/signin")}
          className="bg-blue-400 text-white rounded-full w-25 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
        >
          Sign in
        </button>
      )}
    </div>
  );
}