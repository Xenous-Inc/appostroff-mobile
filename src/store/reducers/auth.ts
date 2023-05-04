import client from '@api/client';
import { AuthRests } from '@api/rests/auth.rest';
import { IApiState } from '@api/types';
import { ISignUpResponsePayload, ISignUpRequestPayload } from '@api/types/auth.types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        data: undefined,
        error: undefined,
    } as IApiState<ISignUpResponsePayload>,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(createSignUpAction.pending, state => {
            console.log('request sended');
            state.isLoading = true;
            state.error = undefined;
        });
        builder.addCase(createSignUpAction.fulfilled, (state, action) => {
            console.log('request ended');
            state.isLoading = false;
            state.data = action.payload;
            state.error = undefined;
        });
        builder.addCase(createSignUpAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const createSignUpAction = createAsyncThunk(
    `${authSlice.name}/createSignUpAction`,
    async (payload: ISignUpRequestPayload) => {
        const { data } = await client(AuthRests.REQUEST_PHONE(payload));
        return data as ISignUpResponsePayload;
    },
);

export default authSlice.reducer;
