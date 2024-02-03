import React from 'react';
import {Button, Card, CardActions, CardContent, Grid} from '@mui/material';

interface Props {
  id: string;
  author: string | null;
  description: string;
  onDelete: React.MouseEventHandler;
}
const CommentItem:React.FC<Props>  = ({id, author,description,onDelete}) => {
  const cardAuthor = author || 'Anonymous';
  return (
    <Grid item>
      <Card sx={{height: '100%'}}>
        <CardContent title={id}>
          <strong>
            {cardAuthor} wrote: "{description}"
          </strong>
        </CardContent>
        <CardActions>
          <Button color="primary" onClick={onDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CommentItem;