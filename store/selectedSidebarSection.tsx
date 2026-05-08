import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface sidebarSectionState {
  selectedSidebarSection: string | null;
}

const initialState: sidebarSectionState = {
  selectedSidebarSection: null,
};

const selectedSidebarSectionSlice = createSlice({
  name: "selectedSidebarSection",
  initialState,
  reducers: {
    setSelectedSidebarSection: (state, action: PayloadAction<string>) => {
      state.selectedSidebarSection = action.payload;
    },
  },
});

export const { setSelectedSidebarSection } = selectedSidebarSectionSlice.actions;
export default selectedSidebarSectionSlice.reducer;
