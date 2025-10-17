import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axiosInstance";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
export const fetchFavoritGame = createAsyncThunk(
  "FavoritGame/fetchFavoritGame",
  async (id) => {
    try {
      const response = await api.get(
        `/FavoritGames/${id}`,
        {
          params: {
            UserId: id
          },
          headers: getAuthHeader()
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const AddFavoritGame = createAsyncThunk(
  "FavoritGame/AddFavoritGame",
  async (body) => {
    try {
      const response = await api.post(
        "/FavoritGames",
        body,
        {
          headers: getAuthHeader()
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);


export const RemoveFavoritGame = createAsyncThunk(
  "FavoritGame/RemoveFavoritGame",
  async (Id) => {
    try {
      await api.delete(
        `/FavoritGames/${Id}`
        ,{
          headers: getAuthHeader()
        }
      );
      return Id;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

const FavoritGameSlice = createSlice({
  name: "FavoritGame",
  initialState: {
    FavoritGame: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // ... fetchFavoritGame cases

      .addCase(fetchFavoritGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoritGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.FavoritGame = action.payload;
      })
      .addCase(fetchFavoritGame.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(AddFavoritGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddFavoritGame.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        // ✅ التعديل: إضافة الكائن الجديد الذي أرسله السيرفر
        if (action.payload && action.payload.id) {
          state.FavoritGame.push(action.payload);
        }
      })
      .addCase(AddFavoritGame.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(RemoveFavoritGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RemoveFavoritGame.fulfilled, (state, action) => {
        state.isLoading = false;
        // ✅ فلترة المصفوفة لإزالة العنصر المحذوف
        state.FavoritGame = state.FavoritGame.filter((item) => item.id !== action.payload);
      })
      .addCase(RemoveFavoritGame.rejected, (state) => {
        state.isLoading = false;
      })
  }
});


export default FavoritGameSlice.reducer;