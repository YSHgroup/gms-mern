import { configureStore } from "@reduxjs/toolkit";
import pendingUserReducer from "./slices/pendingUserSlice";

export const store = configureStore({
  reducer: {
    pendingUser: pendingUserReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
