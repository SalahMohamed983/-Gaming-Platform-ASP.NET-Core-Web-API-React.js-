import { Search } from "@mui/icons-material";
import { Button, TextField, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameBySearch } from "../featured/GameSlice";
import { useState, useEffect } from "react";
import SearchResults from "./SearchResults";
import { Avatar } from '@mui/material';
import ListDrawer from "./ListDrawer";

export default function Header() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { gamesByCategory, isLoading } = useSelector((state) => state.Games);
  const userData = useSelector((state) => state.Users.User || null);

  useEffect(() => {
    if (search.trim().length > 0) {
      dispatch(fetchGameBySearch({ name: search, page: 1, gamePerPage : 100 }));
    }
  }, [search, dispatch]);

  const searchResults = gamesByCategory["Search"] || [];

  return (
    <div className="relative ">
      <header className="flex justify-between items-center bg-purple-950 text-white p-4 md:px-8">
        <div className="flex items-center gap-2 w-full md:w-1/3 relative">
          <TextField
  variant="outlined"
  size="small"
  placeholder="Search..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  InputProps={{
    startAdornment: (
      <IconButton>
        <Search className=" !text-white"/>
      </IconButton>
    ),
  }}
  sx={{
    bgcolor: "#2f2f2f",
    borderRadius: 2,
    "& .MuiOutlinedInput-root": { borderRadius: "12px" },
    "& .MuiInputBase-input::placeholder": {
      color: "white",
      opacity: 1, // مهم عشان يظهر اللون بوضوح
    },
    "& .MuiInputBase-input": {
      color: "white", // يخلي النص كمان أبيض
    },
  }}
  fullWidth
/>

          {/* عرض النتائج */}
          {search && (
            <div className="absolute z-[1000] top-12 left-0 w-full">
              <SearchResults
                results={searchResults}
                isLoading={isLoading}
                onClose={() => setSearch("")}
              />
            </div>
          )}
        </div>

        <div className="flex gap-2">
       {
!userData?
 <>
 <Link to={"/Login"}>
            <Button
              variant="outlined"
              sx={{ color: "white", borderColor: "white" }}
              >
              Login
            </Button>
          </Link>

          <Link to={"/Register"}>
            <Button variant="contained" color="secondary">
              Sign up
            </Button>
          </Link>
              </>
        :
<>
        <Avatar
            src={null}
            sx={{ width: 45, height: 45}}
            className='!hidden md:!flex ml-5 md:m-0 !border-2 border-tertiary'
            />
    <div className='hidden md:block -space-y-1' >
<p className=' text-start text-gray-400 font-[600]'>{userData?.fullName}</p>
<p className=' text-white '>{userData?.email}</p>
    </div>
            </>
 }
 </div>
 <ListDrawer />
      </header>
    </div>
  );
}
