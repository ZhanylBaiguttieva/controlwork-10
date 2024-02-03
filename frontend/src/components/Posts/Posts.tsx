'use client';
import {Button, Grid, Link, Typography} from '@mui/material';
import PostItem from './PostItem.tsx';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectPosts} from '../../containers/posts/postsSlice.ts';
import {useEffect} from 'react';
import {deletePost, fetchPosts} from '../../containers/posts/postsThunks.ts';


const Posts = () => {

  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const removePost = async(id: string) => {
    await dispatch(deletePost(id));
    await dispatch(fetchPosts());
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">News</Typography>
        </Grid>
        <Grid item>
          <Button color="primary" component={Link} href="/new-post">
            Add new post
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h4">Posts</Typography>
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {posts.map(post => (
          <PostItem
            key={post.id}
            id={post.id}
            header={post.header}
            content={post.content}
            image={post.image}
            datetime={post.datetime}
            onDelete={()=> removePost(post.id)}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Posts;