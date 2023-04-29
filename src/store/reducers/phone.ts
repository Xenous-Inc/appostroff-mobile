import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IPhoneNumberState {
    phoneNumber: string;
    phonePrefix: string;
}

const initialState: IPhoneNumberState = {
    phoneNumber: null,
    phonePrefix: '+7',
};

export const phoneSlice = createSlice({
    name: 'phoneNumber',
    initialState,
    reducers: {
        createSavePhoneAction: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload;
        },
        createSavePrefixAction: (state, action: PayloadAction<string>) => {
            state.phonePrefix = action.payload;
        },
    },
});

export const { createSavePhoneAction, createSavePrefixAction } = phoneSlice.actions;

export default phoneSlice.reducer;
