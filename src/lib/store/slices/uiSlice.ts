import { createSlice } from '@reduxjs/toolkit';

type UiState = {
  isSidebarOpen: boolean;
  isMobileOpen: boolean;
};

const initialState: UiState = {
  isSidebarOpen: true,
  isMobileOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state: UiState) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },

    toggleMobile: (state: UiState) => {
      state.isMobileOpen = !state.isMobileOpen;
    },
  },
});

export const { toggleSidebar, toggleMobile } = uiSlice.actions;
export default uiSlice.reducer;
