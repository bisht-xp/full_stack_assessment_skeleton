import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../utils/constant";

interface UserState {
  users: User[];
  userHomes: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  users: [],
  userHomes: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8000/user/find-all");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchUserHome = createAsyncThunk(
  "users/fetchUserHome",
  async (homeId: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/user/find-by-home/${homeId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload?.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(fetchUserHome.pending, (state) => {
        state.status = "loading"
        // state.userHomes = action.payload;
      })
      .addCase(fetchUserHome.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.userHomes = action.payload?.userHomes;
      })
      .addCase(fetchUserHome.rejected, (state, action) => {
        state.status = "loading"
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

// export const { setUsers, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
