import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from '@/store/themeConfigSlice';
import CompanyTrackingSlice from "@/store/companyTrackSlice"
import userSubscriptionSlice from "@/store/userSubscription"
import documentsSlice from "@/store/documentsSlice"
import selectedSidebarSectionSlice from '@/store/selectedSidebarSection';


const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    companyTrack:CompanyTrackingSlice,
    userSubscription:userSubscriptionSlice,
    selectedFolder:documentsSlice,
    SelectedSidebarSection:selectedSidebarSectionSlice
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
