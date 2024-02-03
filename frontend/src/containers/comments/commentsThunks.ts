import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {Comment, CommentWithoutId} from '../../types';

export const fetchComments = createAsyncThunk(
  'comments/fetchAll',
  async () => {
    const commentsResponse = await axiosApi.get<Comment[] | null>('/comments');
    const comments =  commentsResponse.data;

    if (!comments) {
      return [];
    }
    return comments;
  });

export const createComment = createAsyncThunk<null, CommentWithoutId>(
  'comments/create',
  async (commentMutation) => {
    const formData = new FormData();
    const keys = Object.keys(commentMutation) as (keyof CommentWithoutId)[];
    keys.forEach(key => {
      const value = commentMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });
    return axiosApi.post('/comments', formData);
  }
);

export const deleteComment = createAsyncThunk<void, string>(
  'comments/delete',
  async (commentId) => {
    await axiosApi.delete('/comments/' + commentId);
  }
);