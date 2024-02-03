import {Comment} from '../../types'
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store.ts';
import {createComment, deleteComment, fetchComments} from './commentsThunks.ts';

interface CommentsState {
  data: Comment[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}
const initialState:CommentsState = {
  data: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchComments.fulfilled, (state, {payload: data}) => {
      state.fetchLoading = false;
      state.data = data;
    });

    builder.addCase(fetchComments.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createComment.pending, (state) => {
      state.createLoading = true;
    });

    builder.addCase(createComment.fulfilled, (state) => {
      state.createLoading = false;
    });

    builder.addCase(createComment.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(deleteComment.pending, (state) => {
      state.deleteLoading = true;
    });

    builder.addCase(deleteComment.fulfilled, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(deleteComment.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.data;

export const selectFetchCommentsLoading = (state: RootState) => state.comments.fetchLoading;