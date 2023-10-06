import client from '@api/client';
import { MainRests } from '@api/rests/main.rest';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const storySlice = createSlice({
    name: 'story',
    initialState: {
        story: {
            data: undefined,
            isLoading: undefined,
            error: undefined,
        },
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getStoryAction.pending, state => {
            console.log('request sent');
            state.story.isLoading = true;
            state.story.error = undefined;
        });
        builder.addCase(getStoryAction.fulfilled, (state, action) => {
            console.log('request ended');
            state.story.isLoading = false;
            state.story.data = action.payload;
            state.story.error = undefined;
            console.log(action.payload);
        });
        builder.addCase(getStoryAction.rejected, (state, action) => {
            state.story.isLoading = false;
            state.story.error = action.error;
            console.log(state.story.error);
        });
    },
});

export const getStoryAction = createAsyncThunk(`${storySlice.name}/stories`, async () => {
    const { data } = await client(MainRests.REQUEST_RANDOM_STORY());
    return data;
});

export default storySlice.reducer;
