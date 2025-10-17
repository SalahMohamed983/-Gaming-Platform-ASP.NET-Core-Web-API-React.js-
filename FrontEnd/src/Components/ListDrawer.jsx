import * as React from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import {
  Inbox as InboxIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Star as StarIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../featured/UserSlice";
import { Link } from "react-router-dom";
import {
  Category,
  SportsEsports,
  Favorite,
  Group,
} from "@mui/icons-material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function ListDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };


const dispatch = useDispatch();
  const userData = useSelector((state) => state.Users.User || null);

  const list = (
    <Box
      sx={{ width: 250, p: 2 }}
      className="text-white bg-gradient-to-b from-[#1a0024] to-[#3a004b] h-full"
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
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
          <a  className="flex items-center gap-2 hover:text-[#ff4b5c]">
            <Group /> Friends
          </a>
          
        {userData&&
         <button
         onClick={() => dispatch(removeUser())}
         className=" mt-[300px] py-2 mb-3 rounded-lg font-semibold flex items-center
         justify-center md:gap-2 transition-colors bg-red-900 hover:bg-red-600  text-white"
         >
          <ExitToAppIcon />
          Log Out
        </button>
            }
        </nav>
    </Box>
  );

  return (
    <div className="!block md:!hidden">
      {/* زر القائمة */}
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon className="!text-white" fontSize="large" />
      </IconButton>

      {/* القائمة الجانبية */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </div>
  );
}
