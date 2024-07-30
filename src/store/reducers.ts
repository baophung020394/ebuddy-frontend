// store/reducers.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  users: any[];
}

const initialState: UserState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUsers: (state, action: PayloadAction<any[]>) => {
      state.users = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.users = [];
    },
  },
});

export const { setUser, setToken, setLoading, setError, setUsers, logout } =
  userSlice.actions;
export default userSlice.reducer;
