import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSubscription {
    subscribed: boolean;
    expiresOn: string;
}

const initialState: UserSubscription = {
    subscribed: true,
    expiresOn: '2025-12-31',
};

const userSubscriptionSlice = createSlice({
    name: 'userSubscription',
    initialState,
    reducers: {
        setSubscription: (state, action: PayloadAction<{ subscribed: boolean }>) => {
            state.subscribed = action.payload.subscribed;
        },
    },
});

export const { setSubscription } = userSubscriptionSlice.actions;
export default userSubscriptionSlice.reducer;
