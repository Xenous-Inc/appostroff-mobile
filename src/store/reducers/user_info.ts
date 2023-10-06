import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const userInfoSlice = createSlice({
    name: 'phoneNumber',
    initialState: {
        phone: {
            phoneNumber: null,
            phonePrefix: '+7',
        },
        userId: {
            id: undefined,
        },
        readingParams: {
            readingProgress: 0,
        },
    },
    reducers: {
        createSavePhoneAction: (state, action: PayloadAction<string>) => {
            state.phone.phoneNumber = action.payload;
        },
        createSavePrefixAction: (state, action: PayloadAction<string>) => {
            state.phone.phonePrefix = action.payload;
        },
        createUserIdAction: (state, action: PayloadAction<string>) => {
            state.userId.id = action.payload;
        },
        createUserReadingProgressAction: (state, action: PayloadAction<number>) => {
            state.readingParams.readingProgress = action.payload;
        },
    },
});

export const { createSavePhoneAction, createSavePrefixAction, createUserIdAction, createUserReadingProgressAction } =
    userInfoSlice.actions;

export default userInfoSlice.reducer;
