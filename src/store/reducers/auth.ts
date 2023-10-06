import client from '@api/client';
import { AuthRests } from '@api/rests/auth.rest';
import { IApiState } from '@api/types';
import {
    ISignUpRequestPayload,
    IVerificationRequestPayload,
    IVerificationResponsePayload,
} from '@api/types/auth.types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type IAuthState = {
    signUp: IApiState<never>;
    verification: IApiState<IVerificationResponsePayload>;
};

export const authSlice = createSlice({
    name: 'signUp',
    initialState: {
        signUp: {
            isLoading: false,
            data: undefined,
            error: undefined,
        },
        verification: {
            isLoading: false,
            data: undefined,
            error: undefined,
        },
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(createSignUpAction.pending, state => {
            console.log('request sent');
            state.signUp.isLoading = true;
            state.signUp.error = undefined;
        });
        builder.addCase(createSignUpAction.fulfilled, (state, action) => {
            console.log('request ended');
            state.signUp.isLoading = false;
            state.signUp.data = action.payload;
            state.signUp.error = undefined;
            console.log(state.signUp.data);
        });
        builder.addCase(createSignUpAction.rejected, (state, action) => {
            state.signUp.isLoading = false;
            state.signUp.error = action.error;
            console.log(state.signUp.error);
        });
        builder.addCase(createVerificationAction.pending, state => {
            console.log('request sent');
            state.verification.isLoading = true;
            state.verification.error = undefined;
        });
        builder.addCase(createVerificationAction.fulfilled, (state, action) => {
            console.log('request ended');
            state.verification.isLoading = false;
            state.verification.data = action.payload;
            state.verification.error = undefined;
            console.log(state.verification.data);
        });
        builder.addCase(createVerificationAction.rejected, (state, action) => {
            state.verification.isLoading = false;
            state.verification.error = action.error;
            console.log(state.verification.error);
        });
    },
});

export const createSignUpAction = createAsyncThunk(
    `${authSlice.name}/createSignUpAction`,
    async (payload: ISignUpRequestPayload) => {
        const { data } = await client(AuthRests.REQUEST_PHONE(payload));
        return data;
    },
);

export const createVerificationAction = createAsyncThunk(
    `${authSlice.name}/createVerficationAction`,
    async (payload: IVerificationRequestPayload) => {
        const { data } = await client(AuthRests.CONFIRMATION_CODE(payload));
        return data as IVerificationResponsePayload;
    },
);

export default authSlice.reducer;
