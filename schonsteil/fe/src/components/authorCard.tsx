import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    borderRadius: '50%',
},
card: {
  width: "300px",
  margin: "0 auto",
  boxShadow: "none"},
}));

export default function AuthorCard(props) {
 const { data } = props;
 const classes = useStyles();
 
  return (
    <Card
      className={classes.card}>
      <CardActionArea>
        <CardMedia
        	className={classes.cardMedia}

          component="img"
          height="140"
          image={data.posts.profilepic}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.posts.author_name}
          </Typography>
          
        </CardContent>
      </CardActionArea>
        <Button size="small" color="primary">
          Link to profile /profile/{data.posts.profile_pk}
        </Button>
    </Card>
  );
}