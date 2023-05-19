import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { roundToDeciKMs, format_duration } from '../../../utils/formatting';
import { Typography } from '@mui/material';
import { MEDIA_URL } from '../../../SETTINGS';
import { renderAlpineDiff, renderFitness, renderGrade, renderProtection, renderTechDiff } from './renderGrades';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function InfoBox(props) {
  const { data } = props;
  const tourtype = data.posts.tourtype

  const renderIcon = (media) => {
    return (
      <img style={{width:'70px', }} src={media}></img>
    )
  }
  const render_difficulty = (tourtype) => {
    const grade = data.posts.climbing_grade
    const pro = data.posts.protection
    const media = renderGrade(grade)
    const pro_img = renderProtection(pro)

   

    if(tourtype==='Klettern'){
      const grade = data.posts.climbing_grade
  
      return (
        <Grid item xs={6} md={3}>
        <Box sx={{ justifyContent: 'space-around' , display: 'flex',}}>

        {renderIcon(media)}
        {renderIcon(pro_img)}
        </Box>

      </Grid> 
      )
    }
    if(tourtype==='Hochtour'){
      const alpine_diff = data.posts.tech_difficulty
      const fitness =  data.posts.fitness_difficulty[0]
      const fitness_img = renderFitness(fitness)

      return (
        <Grid item xs={6} md={3}>
          <Box sx={{ justifyContent: 'space-around' , display: 'flex',}}>

      {renderIcon(renderAlpineDiff(alpine_diff))}
      {renderIcon(fitness_img)}
      </Box>

      </Grid> 
      )
    }
    const tech_diff = data.posts.tech_difficulty[0]
    const fitness_diff = data.posts.fitness_difficulty[0]
    const fitness_img = renderFitness(fitness_diff)
    const tech_img = renderTechDiff(tech_diff)
    return (
      <Grid item xs={6} md={3}>
                <Box sx={{ justifyContent: 'space-around' , display: 'flex',}}>

            {renderIcon(fitness_img)}
            {renderIcon(tech_img)}
            </Box>

    </Grid> 
    )
  }
  return (
    <Box sx={{ width: '100%', backgroundColor: '', padding: '10px 10px 10px' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6} md={3}>
          <Item>Distanz<br/><Typography variant='infobox'>{roundToDeciKMs(data.posts.distance)}km</Typography></Item>
        </Grid>
        <Grid item xs={6} md={3}>
          <Item>Hohenmeter<br/><Typography variant='infobox'>{Math.round(data.posts.elevation_gain)}</Typography></Item>
        </Grid>
        <Grid item xs={6} md={3}>
          <Item>Zeitbedarf<br/><Typography variant='infobox'>{format_duration(data.posts.tour_duration)}</Typography></Item>
        </Grid> 
            {render_difficulty(tourtype)}   
      </Grid>
    </Box>
  );
}