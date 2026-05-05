import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const res = await fetch('/api/auth/me');
  const data = await res.json();
  return data;
});

type UserState = {
  name: string;
  department: string;
};

const initialState: UserState = {
  name: '',
  department: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.department = action.payload.department;
    },
    clearUser: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.department = action.payload.department;
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
