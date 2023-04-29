import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from 'src/api/client';
import { AuthRests } from 'src/api/rests/auth.rest';
import { IApiState } from 'src/api/types';
import { ISignUpRequestPayload, ISignUpResponsePayload } from 'src/api/types/auth.types';

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
            state.isLoading = true;
            state.error = undefined;
        });
        builder.addCase(createSignUpAction.fulfilled, (state, action) => {
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
        const { data } = await client(AuthRests.SIGN_UP(payload));
        return data as ISignUpResponsePayload;
    },
);

export default authSlice.reducer;
