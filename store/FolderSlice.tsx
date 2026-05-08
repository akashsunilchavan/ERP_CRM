import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Folder {
    id: string;
    name: string;
    parentFolderId: string | null;
    files: string[]; // Array of file names or file paths
}

interface FolderState {
    folders: Folder[];
    selectedFolderId: string | null;
}

const initialState: FolderState = {
    folders: [],
    selectedFolderId: null,
};

const folderSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        addFolder: (state, action: PayloadAction<{ name: string; parentFolderId: string | null }>) => {
            state.folders.push({
                id: crypto.randomUUID(),
                name: action.payload.name,
                parentFolderId: action.payload.parentFolderId,
                files: [],
            });
        },
        selectFolder: (state, action: PayloadAction<string | null>) => {
            state.selectedFolderId = action.payload;
        },
        uploadFile: (state, action: PayloadAction<{ folderId: string; fileName: string }>) => {
            const folder = state.folders.find((f) => f.id === action.payload.folderId);
            if (folder) {
                folder.files.push(action.payload.fileName);
            }
        },
    },
});

export const { addFolder, selectFolder, uploadFile } = folderSlice.actions;
export default folderSlice.reducer;
