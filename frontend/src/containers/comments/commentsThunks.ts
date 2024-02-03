import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {Comment, CommentMutation} from '../../types';

export const fetchComments = createAsyncThunk(
  'comments/fetchAll',
  async (news_id: string) => {
    const commentsResponse = await axiosApi.get<Comment[] | null>('/comments?news_id=' + news_id);
    const comments =  commentsResponse.data;

    if (!comments) {
      return [];
    }
    return comments;
  });

export const createComment = createAsyncThunk<null, CommentMutation>(
  'comments/create',
  async (commentMutation) => {
    await axiosApi.post('/comments', commentMutation);
  }
);

export const deleteComment = createAsyncThunk<void, string>(
  'comments/delete',
  async (commentId) => {
    await axiosApi.delete('/comments/' + commentId);
  }
);