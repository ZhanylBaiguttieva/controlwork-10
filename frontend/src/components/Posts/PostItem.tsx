import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Link,
  styled
} from '@mui/material';
import {apiURL} from '../../constants.ts';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import dayjs from 'dayjs';

const ImageCardMedia = styled(CardMedia) ({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  id: string;
  header: string;
  content: string;
  image: string | null;
  datetime: string;
  onDelete: React.MouseEventHandler;
}

const MessageItem: React.FC<Props> = ({id,header,content, image, datetime,onDelete}) => {
  const cardImage = apiURL + '/' + image || undefined;
  const date = dayjs();
  const formattedDate = date.format('YYYY-MM-DD HH:mm:ss');

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card sx={{height: '100%'}}>
        <ImageCardMedia image={cardImage}/>
        <CardHeader title={header} />
        <CardContent>
          <strong>
            {content}
          </strong>
          Posted on: {formattedDate}
        </CardContent>
        <CardActions>
          <IconButton component={Link} href={'/news/' + id}>
            <ArrowForwardIcon/>
          </IconButton>
          <Button color="primary" onClick={onDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default MessageItem;