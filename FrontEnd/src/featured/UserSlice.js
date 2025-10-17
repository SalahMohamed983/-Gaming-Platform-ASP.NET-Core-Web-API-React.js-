import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axiosInstance";

export const AddUsers = createAsyncThunk(
  "User/AddUsers",
  async (body) => {
    try {
      const response = await api.post(
        "/Auth/register",
body
    );
      return  response.data;
    } catch (error) {
      console.log(error);
      return  "";
    }
  }
);

export const fetchLoginUsers = createAsyncThunk(
  "User/fetchLoginUsers",
  async (body) => {
    try {
      const response = await api.post(
        "/Auth/login",
body
 );
      if (response.data?.accessToken) 
        localStorage.setItem("token", response.data.accessToken);

    localStorage.setItem("User", JSON.stringify(response.data));
 return  response.data;
    } catch (error) {
      console.log(error);
      return  "";
    }
  }
);

const savedUser = JSON.parse(localStorage.getItem("User")) || null;

const UserSlice = createSlice({
  name: "User",
  initialState: {
    User: savedUser,
    isLoading: false,
  },
  reducers: {
     removeUser: (state) => {
      state.User = null;
      localStorage.removeItem("User");
    },
  },
  
  extraReducers(builder) {
    builder
      // categorySearch
      .addCase(AddUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.User = action.payload;
      })
      .addCase(AddUsers.rejected, (state) => {
        state.isLoading = false;
      })
      //Login
      .addCase(fetchLoginUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLoginUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.User = action.payload;
      })
      .addCase(fetchLoginUsers.rejected, (state) => {
        state.isLoading = false;
      })
    }
});

export const {removeUser} = UserSlice.actions; 
export default UserSlice.reducer;


