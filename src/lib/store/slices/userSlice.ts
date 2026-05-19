import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const res = await fetch('/api/auth/me');
  const data = await res.json();
  return data;
});

type UserState = {
  name: string;
  department: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
};

const initialState: UserState = {
  name: '',
  department: '',
  status: 'idle'
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: () => initialState,
  },
  extraReducers: (builder) => {

    builder.addCase(fetchUser.pending, (state) => {
      state.status = 'loading'
    })

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.name = action.payload.name;
      state.department = action.payload.department;
    });

    builder.addCase(fetchUser.rejected, (state) => {
      state.status = 'failed'
    })

  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
