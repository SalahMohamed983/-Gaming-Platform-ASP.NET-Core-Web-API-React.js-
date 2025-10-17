import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axiosInstance";

// ============ Total Nums ============
export const CategoryFetch = createAsyncThunk(
  "Category/CategoryFetch",
  async () => {
    try {
     const response = await api.get(
        "/Category"
            );

      return response.data;
    } catch (error) {
      console.log(error);
      return { data: []};
    }
  }
);

const CategorySlice = createSlice({
  name: "Category",
  initialState: {
    Category: []
  },
  reducers: {},
  extraReducers(builder) {
    builder
            .addCase(CategoryFetch.fulfilled, (state, action) => {
        state.Category = action.payload;
      })
          }
});

export default CategorySlice.reducer;


