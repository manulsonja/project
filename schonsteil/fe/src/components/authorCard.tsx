import * as React from 'react';
import Grid from '@mui/material/Grid';import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { MEDIA_URL } from '../SETTINGS';

const useStyles = makeStyles((theme) => ({
  profileImage: {
    borderRadius: '50%',
    width: '100%',
    },
    profileCard: {
    },
    }));

export default function AuthorCard(props) {
 const { data } = props;
 const classes = useStyles();
 const profileimage = data.profilepic.ratios['1/1'].sources['image/jpeg']['300']
  return (
    <div style={{marginTop:'50px'}}>
    <Grid container spacing={5} xs={12} className={classes.profileCard}
    
    alignItems="center"
    justifyContent="center"
    
    >
    <Grid item lg={2}>
          <img className={classes.profileImage} src={MEDIA_URL +profileimage}/>
    </Grid>
    <Grid item lg={3}>
    <Typography gutterBottom variant="h1" component="div">
            {data.author_name} 
      </Typography>
      <Typography gutterBottom component="div">
             Max is an avid hiker and loyal writer for schonsteil.com
      </Typography>

          <Button size="small" color="primary">
          More about {data.author_name}
        </Button> 
    </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
        </Grid>
    </Grid>
  </div> 
  );
}