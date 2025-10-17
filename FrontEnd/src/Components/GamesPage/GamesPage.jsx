import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXbox, faPlaystation, faSteam } from "@fortawesome/free-brands-svg-icons";
import { faBroom } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchGameByCategory } from "../../featured/GameSlice";
import { CategoryFetch } from "../../featured/CategorySlice";
import { AddFavoritGame, fetchFavoritGame, RemoveFavoritGame } from "../../featured/FavoritGameSlice";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useToast } from "../ExtraComponent/ToastContext";

function handleIconImages(id) {
  switch (id) {
    case 1: return <FontAwesomeIcon icon={faXbox} />;
    case 2: return <FontAwesomeIcon icon={faPlaystation} />;
    case 3: return <FontAwesomeIcon icon={faSteam} />;
    case 4: return (<><FontAwesomeIcon icon={faXbox} /> <FontAwesomeIcon icon={faPlaystation} /></>);
    case 5: return (<><FontAwesomeIcon icon={faXbox} /> <FontAwesomeIcon icon={faSteam} /></>);
    case 6: return (<><FontAwesomeIcon icon={faPlaystation} /> <FontAwesomeIcon icon={faSteam} /></>);
    case 8: return (<><FontAwesomeIcon icon={faXbox} /> <FontAwesomeIcon icon={faPlaystation} /> <FontAwesomeIcon icon={faSteam} /></>);
    default: return null;
  }
}

function HoverImageSlider({ images, hover }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (hover && images?.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % images.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [hover, images]);

  return (
    <img
      src={images[currentIndex]?.imageUrl}
      alt=""
      className="rounded-lg my-2 h-[70%] w-full object-cover"
    />
  );
}

export default function GameGenres({IsFavoritPage = false}) {
  const dispatch = useDispatch();

  const { showHideToast } = useToast();

  // أعلى component، جنب باقي الـ useSelector
const { gamesByCategory, isLoading } = useSelector((state) => state.Games);
const genres = useSelector((state) => state.Categories.Category);
const favoritGames = useSelector((state) => state.FavoritGames.FavoritGame);

// بعد كده حدِّد المتغيّر games
const games = IsFavoritPage ? (favoritGames || []) : (gamesByCategory["Category"] || []);

  const [hoverGameId, setHoverGameId] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const userData = useSelector((state) => state.Users.User || null);
   
  useEffect(() => {
  if(!IsFavoritPage)
  {

    const params = { params: { page: 1, gamePerPage: 100 }, body: [] };
    dispatch(fetchGameByCategory(params));
    dispatch(CategoryFetch());
  }
    dispatch(fetchFavoritGame(userData?.id));
  
    }, [dispatch, IsFavoritPage]);

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((cat) => cat !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const params = {
      params: { page: 1, gamePerPage: 100 },
      body: selectedCategories,
    };
    dispatch(fetchGameByCategory(params));
  }, [selectedCategories, dispatch]);

  const clearAll = () => {
    setSelectedCategories([]);
    const params = { params: { page: 1, gamePerPage: 100 }, body: [] };
    dispatch(fetchGameByCategory(params));
  };

  const handleToggleFavorite = (gameName, gameId) => {

if(!userData)
  showHideToast("You Must Login First");
else
{
    // نستخدم name للعثور على عنصر المفضلة للحذف
    const favItem = favoritGames.find((item) => item.name == gameName);

    if (favItem) {
      console.log("delete");
      // نرسل الـ ID الخاص بعنصر المفضلة للحذف
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
     }   // 🔥 لا حاجة لاستدعاء fetchFavoritGame هنا بعد التعديل على Redux Slice
  };

  return (
    <div className="min-h-screen text-white flex md:p-6 pt-3 gap-2 md:gap-6">
      {/* ✅ Sidebar */}
      {!IsFavoritPage &&
      <aside className="bg-gray-800 sticky top-[10px] !h-fit md:h-[96vh] md:p-4 p-2 rounded-2xl md:w-52 flex flex-col gap-3 text-center">
        <h2 className="text-lg hidden md:block font-bold mb-2 text-white">Categories</h2>

        <button
          onClick={clearAll}
          disabled={selectedCategories.length === 0}
          className={`py-2 mb-3 rounded-lg font-semibold flex items-center justify-center md:gap-2 transition-colors ${
            selectedCategories.length > 0
            ? "bg-red-900 hover:bg-red-600  text-white"
            : "bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed"
            }`}
            >
          <FontAwesomeIcon icon={faBroom} />
          Clear All
        </button>

        {genres.map((genre) => (
          <button
          key={genre.id}
          onClick={() => toggleCategory(genre.id)}
          className={`py-2 rounded-lg transition-colors ${
            selectedCategories.includes(genre.id)
            ? "bg-pink-900 border-pink-300 text-white"
            : "hover:bg-gray-700 border-gray-600 text-gray-300"
            }`}
            >
            {genre.categoryName}
          </button>
        ))}
      </aside>
      }

      {/* ✅ Main Content */}
      <div className="flex-1">
        <Typography variant="h4" className="font-bold !mb-[22px] text-white">
          Games From Genres
        </Typography>

        {isLoading && <Typography>Loding...</Typography>}

        <div className={`grid ${IsFavoritPage? " md:grid-cols-3 lg:grid-cols-4 gap-4": "md:grid-cols-2 lg:grid-cols-3 gap-6"}  `}>
          {games.length > 0 &&
            games.map((game) => {
                      const isFavorited = favoritGames.some((item) => item.name == game.name);
             return( <div
                className="!relative group"
                key={game.id}
                onMouseEnter={() => setHoverGameId(game.id)}
                onMouseLeave={() => setHoverGameId(null)}
              >
             <IconButton
                onClick={() => handleToggleFavorite(game.name, game.id)}
                className={`!absolute !left-2 !top-2 !z-50 transition-transform duration-500`}
              >
                {isFavorited ? (
                  <FavoriteIcon className="text-pink-500 transition-all duration-500" />
                ) : (
                  <AddCircleOutlineIcon className="text-white transition-all duration-500" />
                )}
              </IconButton>
                <motion.div className="bg-[#5e2050] transition-all rounded-xl overflow-hidden shadow-lg">
                  <Card>
                    <div className="relative">
                     
                      <CardMedia
                        component="img"
                        image={game.images?.[0]?.imageUrl}
                        alt={game.name}
                        className="h-58 object-cover"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-200"></div>
                    </div>

                    <CardContent className="z-10 !bg-gray-700">
                      <Typography variant="subtitle1" className="font-bold text-white">
                        {game.name}
                      </Typography>
                      <div className="flex gap-2 text-gray-300">
                        {handleIconImages(game.operateCategoryID)}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Hover Card */}
              <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={
    hoverGameId === game.id
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 10 }
  }
  className={`absolute top-[100px] overflow-hidden ${IsFavoritPage? " w-full sm:-left-[45px]": "sm:-left-[35px] -left-[40px]"} 
  w-[280px] sm:w-[380px] z-[5000] h-[250px] bg-gray-900 bg-opacity-90 rounded-2xl
   p-4 text-sm flex flex-col justify-center ${hoverGameId === game.id ? "pointer-events-auto" : "pointer-events-none"}`}
>
                  <Link to={`/GameCard/${game.id}`} className=" !cursor-pointer" >
                  <Typography variant="h6">{game.name}</Typography></Link>
                  <Typography variant="body2" className="!mt-0 !pt-0 text-gray-400">
                    Released {new Date().toLocaleDateString() || "Unknown"}
                  </Typography>

                  <HoverImageSlider
                    images={game.images}
                    hover={hoverGameId === game.id}
                  />

                  <Typography variant="body2">
                    Review count: {game.rating || 0}
                  </Typography>
                </motion.div>
              </div>
            )})}
        </div>
      </div>
    </div>
  );
}
