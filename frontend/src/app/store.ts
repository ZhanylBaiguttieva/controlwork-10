import {configureStore} from "@reduxjs/toolkit";
import {postsReducer} from '../containers/posts/postsSlice.ts';
import {commentsReducer} from '../containers/comments/commentsSlice.ts';

export const  store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;