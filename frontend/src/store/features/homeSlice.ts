import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Home } from "../../utils/constant";
import axios from "axios";

interface HomeState {
  homes: Home[];
  status: "idle" | "loading" | "succeeded" | "failed";
  totalPages: number | null;
  error: string | null;
}

const initialState: HomeState = {
  homes: [],
  status: "idle",
  totalPages: null,
  error: null,
};

export const fetchHomes = createAsyncThunk(
  "homes/fetchHomes",
  async (
    { userId, page }: { userId: number | null; page: number },
    thunkAPI
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/home/find-by-user?userId=${userId}&page=${page}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "homes/updateUser",
  async (
    { homeId, userIds }: { homeId: number; userIds: number[] },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/home/update-users`,
        { homeId, userIds }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const homesSlice = createSlice({
  name: "homes",
  initialState,
  reducers: {
    setUpdateStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.homes = action.payload?.homes;
        state.totalPages = action.payload?.totalPages;
        state.status = "idle";
      })
      .addCase(fetchHomes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch homes";
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch homes";
      });
  },
});

export const { setUpdateStatus } = homesSlice.actions;

export default homesSlice.reducer;
