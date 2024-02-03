import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { PostMutation} from '../../types';
import FileInput from '../FileInput.tsx';

interface Props {
  onSubmit: (mutation: PostMutation) => void;
}
const PostForm: React.FC<Props> = ({onSubmit}) => {
  const [state, setState] = useState<PostMutation>({
    header: '',
    content: '',
    image: null,
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

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  return (
    <form
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item >
          <TextField
            id="header" label="Header"
            value={state.header}
            onChange={inputChangeHandler}
            name="header"
            required
          />
        </Grid>
        <Grid item >
          <TextField
            id="content" label="Content"
            value={state.content}
            onChange={inputChangeHandler}
            name="content"
            required
          />
        </Grid>
        <Grid item >
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>
        <Grid item >
          <Button type="submit" color="primary" variant="contained">Save</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostForm;