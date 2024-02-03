import {CommentMutation} from '../../../types';
import React, {useState} from 'react';
import {Button, Grid, TextField} from '@mui/material';
import {useParams} from 'react-router-dom';

interface Props {
  onSubmit: (mutation: CommentMutation) => void;
}
const CommentForm: React.FC<Props> = ({onSubmit}) => {
  const {id} = useParams() as {id: string};
  const [state, setState] = useState<CommentMutation>({
    news_id: id,
    author: '',
    description: '',
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  return (
    <form
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item >
          <TextField
            id="author" label="Author"
            value={state.author}
            onChange={inputChangeHandler}
            name="author"
          />
        </Grid>
        <Grid item >
          <TextField
            id="description" label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
            required
          />
        </Grid>
        <Grid item >
          <Button type="submit" color="primary" variant="contained">Add comment</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CommentForm;