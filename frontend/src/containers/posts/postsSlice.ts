import {Post} from '../../types';
import {RootState} from '../../app/store.ts';
import {createSlice} from '@reduxjs/toolkit';
import {createPost, deletePost, fetchOnePost, fetchPosts} from './postsThunks.ts';

interface PostsState {
  items: Post[];
  post: Post | null,
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}
const initialState: PostsState = {
  items: [],
  post: null,
  fetchLoading: false,
  fetchOneLoading: false,
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

    builder.addCase(fetchOnePost.pending, (state) => {
      state.fetchOneLoading = true;
    });

    builder.addCase(fetchOnePost.fulfilled, (state, {payload: post}) => {
      state.fetchOneLoading = false;
      state.post = post;
    });

    builder.addCase(fetchOnePost.rejected, (state) => {
      state.fetchOneLoading = false;
    });
  }
});

export const postsReducer = postsSlice.reducer;

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPost = (state: RootState) => state.posts.post;

export const selectFetchPostsLoading = (state: RootState) => state.posts.fetchLoading;
export const selectPostCreating = (state: RootState) => state.posts.createLoading;
export const selectFetchOnePostLoading = (state: RootState) => state.posts.fetchOneLoading;