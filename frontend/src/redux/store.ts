import { configureStore } from "@reduxjs/toolkit";
import pendingUserReducer from "./slices/pendingUserSlice";
import userReducer from './slices/userSlice'
import requestReducer from "./slices/requestSlice";

export const store = configureStore({
  reducer: {
    pendingUser: pendingUserReducer,
    user: userReducer,
    request: requestReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
