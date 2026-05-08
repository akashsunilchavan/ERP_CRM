import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Company, CompanyData, companyData, StoredFile, Deadline, Folder } from '../jsonData/companydata';
import { v4 as uuidv4 } from 'uuid';

interface CompanyTrackingState {
    companies: Company[];
    selectedCompanyId: string | null;
    selectedCompanyData: CompanyData | null;
      selectedFolderId: string | null;
    filingDeadlines: { pending: Deadline[]; approved: Deadline[] } | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CompanyTrackingState = {
    companies: companyData.map(({ companyId, companyName }) => ({ companyId, companyName })),
    selectedCompanyId: 'compA',
    selectedCompanyData: null,
    selectedFolderId: null,
    filingDeadlines: null,
    loading: 'idle',
    error: null,
};

export const fetchCompanyDetails = createAsyncThunk<CompanyData & { filingDeadlines: { pending: Deadline[]; approved: Deadline[] } }, string, { rejectValue: string }>(
    'companyTracking/fetchCompanyDetails',
    async (companyId, { rejectWithValue }) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 30));

            const company = companyData.find((c) => c.companyId === companyId);
            if (!company) {
                return rejectWithValue('Company Not Found');
            }

            const pendingFilings = company.deadlines.filter((d) => d.paymentStatus === 'Pending');
            const approvedFilings = company.deadlines.filter((d) => d.paymentStatus === 'Paid');

            return { ...company, filingDeadlines: { pending: pendingFilings, approved: approvedFilings } };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch company data.');
        }
    },
);
const findFolderById = (folders: Folder[], folderId: string): Folder | undefined => {
    for (const folder of folders) {
        if (folder.folderId === folderId) return folder;
        if (folder.subfolders) {
            const found = findFolderById(folder.subfolders, folderId);
            if (found) return found;
        }
    }
    return undefined;
};

const addSubfolder = (folders: Folder[], parentFolderId: string, newFolder: Folder): boolean => {
    for (const folder of folders) {
        if (folder.folderId === parentFolderId) {
            if (!folder.subfolders) {
                folder.subfolders = [];
            }
            folder.subfolders.push(newFolder);
            return true;
        }
        if (folder.subfolders && addSubfolder(folder.subfolders, parentFolderId, newFolder)) {
            return true;
        }
    }
    return false;
};

const companyTrackingSlice = createSlice({
    name: 'companyTracking',
    initialState,
    reducers: {
        setSelectedCompany: (state, action) => {
            state.selectedCompanyId = action.payload;
        }
,        

        setSelectedFolderId: (state, action: PayloadAction<string | null>) => {
            state.selectedFolderId = action.payload; 
        },

        addFolder: (state, action: PayloadAction<{ parentFolderId?: string | null; folderName: string }>) => {
            if (!state.selectedCompanyData) return;

            const newFolder: Folder = {
                folderId: uuidv4(),
                folderName: action.payload.folderName,
                files: [],
                subfolders: [],
            };

            if (!action.payload.parentFolderId) {
                // Add as a root-level folder
                state.selectedCompanyData.folders.push(newFolder);
            } else {
                // Add as a subfolder inside an existing folder
                addSubfolder(state.selectedCompanyData.folders, action.payload.parentFolderId, newFolder);
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanyDetails.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.selectedCompanyData = action.payload;
                state.filingDeadlines = action.payload.filingDeadlines;
            })
            .addCase(fetchCompanyDetails.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { setSelectedCompany, addFolder, setSelectedFolderId } = companyTrackingSlice.actions;
export default companyTrackingSlice.reducer;
