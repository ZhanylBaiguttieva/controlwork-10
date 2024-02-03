import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import React, {useEffect} from 'react';
import {selectComments} from '../../containers/comments/commentsSlice.ts';
import {deleteComment, fetchComments} from '../../containers/comments/commentsThunks.ts';
import {CircularProgress, Grid} from '@mui/material';
import CommentItem from './CommentItem.tsx';

interface Props {
  isLoading: boolean;
}

const Comments:React.FC<Props> = ({isLoading}) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const removeComment = async(id: string) => {
    await dispatch(deleteComment(id));
    await dispatch(fetchComments());
  };

  let commentsArea: React.ReactNode = <CircularProgress/>;
  if(!isLoading && comments) {
    commentsArea = comments.map(comment => (
      <CommentItem
        key={comment.id}
        author={comment.author}
        description={comment.description}
        id={comment.id}
        onDelete={()=> removeComment(comment.id)}
      />
    ));
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container spacing={1}>
        {commentsArea}
      </Grid>
    </Grid>
  );
};

export default Comments;