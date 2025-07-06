import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/v1";

// ** Register **
export const addUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ** Login **
export const loginUser = createAsyncThunk(
  "user/login",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/login/${email}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue('cop',error.response.data);
    }
  }
);

// **Fetch Current User **
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${BASE_URL}/users/currentUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        err.response?.data || { message: "Unknown error" }
      );
    }
  }
);


// ** Fetch All Users **
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/users`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Unknown error" }
      );
    }
  }
);

// ** Make Admin **
export const makeAdmin = createAsyncThunk(
  "user/makeAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE_URL}/users/makeAdmin/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Unknown error" }
      );
    }
  }
);

// ** Update User **
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE_URL}/users/${id}`, updatedData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Unknown error" }
      );
    }
  }
);

// ** Delete User **
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/users/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Unknown error" }
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    allUsers: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Registration failed";
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Login failed";
      })

      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Fetching user failed";
      })

      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Fetching users failed";
      })

      .addCase(makeAdmin.fulfilled, (state, action) => {
        state.allUsers = state.allUsers.map((user) =>
          user._id === action.payload.user._id ? action.payload.user : user
        );
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.allUsers = state.allUsers.map((user) =>
          user._id === action.payload.user._id ? action.payload.user : user
        );
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.allUsers = state.allUsers.filter(
          (user) => user._id !== action.payload.user._id
        );
      });
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
