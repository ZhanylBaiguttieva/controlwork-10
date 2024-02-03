import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import React, {useEffect} from 'react';
import {selectComments} from '../../containers/comments/commentsSlice.ts';
import {deleteComment, fetchComments} from '../../containers/comments/commentsThunks.ts';
import {CircularProgress, Grid} from '@mui/material';
import CommentItem from './CommentItem.tsx';
import {useParams} from 'react-router-dom';

interface Props {
  isLoading: boolean;
}

const Comments:React.FC<Props> = ({isLoading}) => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  const removeComment = async(comment_id: string) => {
    await dispatch(deleteComment(comment_id));
    await dispatch(fetchComments(id));
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