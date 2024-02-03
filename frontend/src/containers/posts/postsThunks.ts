import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {Post, PostMutation} from '../../types';

export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async () => {
    const postsResponse = await axiosApi.get<Post[] | null>('/news');
    const posts =  postsResponse.data;

    if (!posts) {
      return [];
    }
    return posts;
  });

export const createPost = createAsyncThunk<null, PostMutation>(
  'posts/create',
  async (postMutation) => {
    const formData = new FormData();
    const keys = Object.keys(postMutation) as (keyof PostMutation)[];
    keys.forEach(key => {
      const value = postMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });
    return axiosApi.post('/news', formData);
  }
);

export const deletePost = createAsyncThunk<void, string>(
  'posts/delete',
  async (postId) => {
    await axiosApi.delete('/news/' + postId);
  }
);

export const fetchOnePost = createAsyncThunk<Post | null, string> (
  'posts/fetchOne',
  async(postId) => {
    const response = await axiosApi.get<Post>('/news/' + postId);
    const post = response.data;
    return post;
  }
);
