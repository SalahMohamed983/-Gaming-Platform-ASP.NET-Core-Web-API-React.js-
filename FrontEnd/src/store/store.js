import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "../featured/CategorySlice";
import FavoritGameSlice from "../featured/FavoritGameSlice";
import GameSlice from "../featured/GameSlice";
import UserSlice from "../featured/UserSlice";

export default configureStore({
	reducer: {
Categories: CategorySlice,
FavoritGames: FavoritGameSlice,
Games: GameSlice,
Users: UserSlice,
    }
});
