import {Post} from '../types';
import {RootState} from '../app/store.ts';
import {createSlice} from '@reduxjs/toolkit';
import {createPost, deletePost, fetchPosts} from './postsThunks.ts';

interface PostsState {
  items: Post[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}
const initialState: PostsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchPosts.fulfilled, (state, {payload: items}) => {
      state.fetchLoading = false;
      state.items = items;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createPost.pending, (state) => {
      state.createLoading = true;
    });

    builder.addCase(createPost.fulfilled, (state) => {
      state.createLoading = false;
    });

    builder.addCase(createPost.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(deletePost.pending, (state) => {
      state.deleteLoading = true
    });

    builder.addCase(deletePost.fulfilled, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(deletePost.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});

export const postsReducer = postsSlice.reducer;

export const selectPosts = (state: RootState) => state.posts.items;

export const selectFetchPostsLoading = (state: RootState) => state.posts.fetchLoading;
export const selectPostCreating = (state: RootState) => state.posts.createLoading;