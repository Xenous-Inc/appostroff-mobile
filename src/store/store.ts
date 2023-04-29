import { configureStore } from '@reduxjs/toolkit';
import phoneSlice from './reducers/phone';
import authSlice from './reducers/auth';

export const store = configureStore({
    reducer: {
        phone: phoneSlice,
        auth: authSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
