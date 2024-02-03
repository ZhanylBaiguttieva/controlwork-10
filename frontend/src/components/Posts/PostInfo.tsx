import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectPost} from '../../containers/posts/postsSlice.ts';
import React, {useEffect} from 'react';
import {fetchOnePost} from '../../containers/posts/postsThunks.ts';
import {Card, CardContent, CardHeader, Grid} from '@mui/material';
import Comments from '../Comments/Comments.tsx';
import {selectFetchCommentsLoading} from '../../containers/comments/commentsSlice.ts';

const PostInfo = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);
  const fetchCommentsLoading = useAppSelector(selectFetchCommentsLoading);

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
    <Grid>
      <Grid container spacing={2}>
        <Card sx={{height: '100%'}}>
          {postInfo}
        </Card>
      </Grid>
      <Comments isLoading={fetchCommentsLoading}/>
    </Grid>
  );
};

export default PostInfo;