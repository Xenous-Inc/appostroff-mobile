import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/user_info';
import authSlice from './reducers/auth';

export const store = configureStore({
    reducer: {
        user_info: userSlice,
        auth: authSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
