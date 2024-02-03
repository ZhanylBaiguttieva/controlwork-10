import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectPost} from '../../containers/posts/postsSlice.ts';
import React, {useEffect} from 'react';
import {fetchOnePost} from '../../containers/posts/postsThunks.ts';
import {Card, CardContent, CardHeader, Grid} from '@mui/material';

const PostInfo = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);

  useEffect(() => {
    dispatch(fetchOnePost(id));
  }, [dispatch, id]);

  let postInfo: React.ReactNode;
  if(post) {
   postInfo = (
      <>
        <CardHeader title={post.header} />
        <CardContent>
          <strong>
            {post.content}
          </strong>
          Posted on: {post.datetime}
        </CardContent>
      </>
    );
  }

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card sx={{height: '100%'}}>
        {postInfo}
      </Card>
    </Grid>
  );
};

export default PostInfo;