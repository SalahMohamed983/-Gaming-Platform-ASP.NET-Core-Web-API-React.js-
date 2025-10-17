import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axiosInstance";

// ===== Async Thunks =====
export const fetchGameByCategory = createAsyncThunk(
  "Game/fetchGameByCategory",
  async (body) => {
    try {
      const response = await api.put("/Games/ByCategory", body.body, { params: body.params });
      return { data: response.data, category: "Category" };
    } catch (error) {
      console.log(error);
      return  [];
    }
  }
);

export const fetchGameByOperatingCategory = createAsyncThunk(
  "Game/fetchGameByOperatingCategory",
  async (body) => {
    try {
      const response = await api.get("/Games/ByOperatingCategory", { params: body });
      const key = `operate-${body.OperateCategory || 0}`;
      return { data: response.data, category: key };
    } catch (error) {
      console.log(error);
      return { data: [], category: "default" };
    }
  }
);

export const fetchGameTopGames = createAsyncThunk(
  "Game/fetchGameTopGames",
  async (body) => {
    try {
      const response = await api.get("/Games/TopGames", { params: body });
      return { data: response.data, category: "top" };
    } catch (error) {
      console.log(error);
      return { data: [], category: "top" };
    }
  }
);


export const fetchGameByID = createAsyncThunk(
  "Game/fetchGameByID",
  async (id) => {
    try {
      const response = await api.get(`/Games/${id}`);
      return { data: response.data, category: `id-${id}` };
    } catch (error) {
      console.log(error);
      return { data: [], category: `id-${id}` };
    }
  }
);
export const fetchGameBySearch = createAsyncThunk(
  "Game/fetchGameBySearch",
  async (body) => {
    try {
      const response = await api.get("/Games/BySearch", { params: body });
      return { data: response.data, category: "Search" };
    } catch (error) {
      console.log(error);
      return { data: [], category: "Search" };
    }
  }
);
  

// ===== Initial State =====
const initialState = {
  gamesByCategory: {},
  isLoading: false,
  filter: {
    categoryId: 0,
    OperateCategory: 0,
    page: 1,
    gamePerPage: 10,
    search: "",
  },
};

// ===== Slice =====
const GameSlice = createSlice({
  name: "Game",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    resetFilter: (state) => {
      state.filter = initialState.filter;
    },
  },
  extraReducers(builder) {
    builder
      // fetch by category
      .addCase(fetchGameByCategory.pending, (state) => { state.isLoading = true; })
   .addCase(fetchGameByCategory.fulfilled, (state, action) => {
  state.isLoading = false;
        const { data, category } = action.payload;
        state.gamesByCategory[category] = data;
}
)
      .addCase(fetchGameByCategory.rejected, (state) => { state.isLoading = false; })

      // fetch by operating category
      .addCase(fetchGameByOperatingCategory.pending, (state) => { state.isLoading = true; })
      .addCase(fetchGameByOperatingCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, category } = action.payload;
        state.gamesByCategory[category] = data;
      })
      .addCase(fetchGameByOperatingCategory.rejected, (state) => { state.isLoading = false; })

      // fetch top games
      .addCase(fetchGameTopGames.pending, (state) => { state.isLoading = true; })
      .addCase(fetchGameTopGames.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, category } = action.payload;
        state.gamesByCategory[category] = data;
      })
      .addCase(fetchGameTopGames.rejected, (state) => { state.isLoading = false; })

      // fetch by ID
      .addCase(fetchGameByID.pending, (state) => { state.isLoading = true; })
      .addCase(fetchGameByID.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, category } = action.payload;
        state.gamesByCategory[category] = data;
      })
      .addCase(fetchGameByID.rejected, (state) => { state.isLoading = false; })      // fetch by ID
      .addCase(fetchGameBySearch.pending, (state) => { state.isLoading = true; })
      .addCase(fetchGameBySearch.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, category } = action.payload;
        state.gamesByCategory[category] = data;
      })
      .addCase(fetchGameBySearch.rejected, (state) => { state.isLoading = false; });



    },
});

export default GameSlice.reducer;
export const { setFilter, resetFilter } = GameSlice.actions;
