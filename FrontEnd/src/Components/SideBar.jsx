import {
    Home as HomeIcon,
  Category,
  SportsEsports,
  Favorite,
  Group,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../featured/UserSlice";

export default function SideBar() {

const dispatch = useDispatch();
  const userData = useSelector((state) => state.Users.User || null);

  return (
<aside className="hidden md:flex w-64 min-h-screen bg-gradient-to-b
 from-[#1a0024] to-[#3a004b] text-white flex-col p-4 "> 
 <div className=" sticky top-[20px]">
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          <span style={{ color: "#ff4b5c" }}>Sah</span>{" "}
          <span style={{ color: "#ffffff" }}>Gaming</span>
        </Typography>        <nav className="mt-10 space-y-4 flex flex-col gap-4 text-xl">
          <Link to='/' className="!flex !items-center !gap-2 hover:!text-[#ff4b5c]">
            <HomeIcon /> Home
          </Link>
          <Link to='/GamesPage' className="!flex !items-center !gap-2 hover:!text-[#ff4b5c]">
            <Category /> Category
          </Link>
          <Link to='/GamesPage' className="!flex !items-center !gap-2 hover:!text-[#ff4b5c]">
            <SportsEsports /> Games
          </Link>
          <Link to='/FavoritsPage' className="!flex !items-center !gap-2 hover:!text-[#ff4b5c]">
            <Favorite /> Wishlist
          </Link>
          <a className="flex items-center gap-2 hover:text-[#ff4b5c]">
            <Group /> Friends
          </a>
          
        {userData&&
         <button
         onClick={() => dispatch(removeUser())}
         className=" mt-[200px] py-2 mb-3 rounded-lg font-semibold flex items-center
         justify-center md:gap-2 transition-colors bg-red-900 hover:bg-red-600  text-white"
         >
          <ExitToAppIcon />
          Log Out
        </button>
            }
        </nav>
  </div> 
      </aside>

  );
}
