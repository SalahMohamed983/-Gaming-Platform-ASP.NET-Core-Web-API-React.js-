// SwipperGames.jsx
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchGameByOperatingCategory,
  fetchGameTopGames,
} from "../featured/GameSlice";
import {
  AddFavoritGame,
  fetchFavoritGame,
  RemoveFavoritGame,
} from "../featured/FavoritGameSlice";
import { Link } from "react-router-dom";
import { useToast } from "./ExtraComponent/ToastContext";

export default function SwipperGames({ cat = 1 }) {
  const dispatch = useDispatch();
  const { gamesByCategory, isLoading } = useSelector((state) => state.Games);
  const favorit = useSelector((state) => state.FavoritGames.FavoritGame) || [];

  const key = cat === "Top" ? "top" : `operate-${cat}`;
  const games = gamesByCategory[key] || [];
  const userData = useSelector((state) => state.Users.User || null);

  const { showHideToast } = useToast();

  useEffect(() => {
    const params = { page: 1, gamePerPage: 10, OperateCategory: cat };
    if (cat === "Top") {
      dispatch(fetchGameTopGames(params));
    } else {
      dispatch(fetchGameByOperatingCategory(params));
    }

    dispatch(fetchFavoritGame(userData?.id)); // جلب المفضلة عند تحميل الكومبوننت
  }, [cat, dispatch]);

  if (isLoading)
    return <Typography className="text-white">Loading...</Typography>;

  const handleToggleFavorite = (gameName, gameId) => {

    
if(!userData)
  showHideToast("You Must Login First");
else
{
    const favItem = favorit.find((item) => item.name == gameName);

    if (favItem) {
      console.log("delete");
      dispatch(RemoveFavoritGame(favItem.id));
    } else {
      console.log("Added");
      dispatch(
        AddFavoritGame({
          gameId, // الـ ID الخاص باللعبة لإضافتها
          userId: userData?.id,
        })
      );
    }
  };
  }
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        440: { slidesPerView: 2 },
        740: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Autoplay]}
      className="!mt-5"
    >
      {games.map((ele) => {
        // ✅ التحقق من حالة اللعبة بناءً على الاسم الموجود في قائمة المفضلة
        const isFavorited = favorit.some((item) => item.name == ele.name);

        return (
          <SwiperSlide key={ele.id}>
           <div
  className="
    relative overflow-hidden rounded-lg shadow-lg group
  "
>
  <IconButton
    onClick={() => handleToggleFavorite(ele.name, ele.id)}
    className={`!absolute !left-2 !top-2 !z-50 transition-transform duration-500`}
  >
    {isFavorited ? (
      <FavoriteIcon className="text-pink-500 transition-all duration-500" />
    ) : (
      <AddCircleOutlineIcon className="text-white transition-all duration-500" />
    )}
  </IconButton>

  {/* الصورة */}
  <img
    src={ele.images?.[0]?.imageUrl}
    alt={ele.name}
    className="w-full h-[350px] object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3"
  />

  {/* تأثير hover فوق الصورة */}
  <div
    className="
      absolute inset-0 bg-pink-700 opacity-0 group-hover:opacity-35
      transition-all duration-500
    "
  ></div>
</div>
            <Link className=" !cursor-pointer" to={`/GameCard/${ele.id}`}>
            <Typography className="!text-white !text-xl">{ele.name}</Typography>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}