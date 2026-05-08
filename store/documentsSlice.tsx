import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';



const initialState = {
    selectedCompanyId: null,
    selectedFolderId: null, 
  };
  
  const selectedFolderSlice = createSlice({
    name: "selectedFolder",
    initialState,
    reducers: {
      setSelectedCompanyId: (state, action) => {
        state.selectedCompanyId = action.payload;
        state.selectedFolderId = null; 
      },
      setSelectedFolderId: (state, action) => {
        state.selectedFolderId = action.payload;
      },
    },
  });
  
  export const { setSelectedCompanyId, setSelectedFolderId } = selectedFolderSlice.actions;
  export default selectedFolderSlice.reducer;