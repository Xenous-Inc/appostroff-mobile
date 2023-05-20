import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const phoneSlice = createSlice({
    name: 'phoneNumber',
    initialState: {
        phone: {
            phoneNumber: null,
            phonePrefix: '+7',
        },
        userId: {
            id: undefined,
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
    },
});

export const { createSavePhoneAction, createSavePrefixAction, createUserIdAction } = phoneSlice.actions;

export default phoneSlice.reducer;
