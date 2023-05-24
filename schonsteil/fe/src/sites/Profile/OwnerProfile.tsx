import React from 'react'
import { MEDIA_URL } from '../../SETTINGS'
import { Typography } from '@mui/material'

const OwnerProfile = ({data}) => {
  return (
    <React.Fragment> 
    <div>
        <Typography
        variant='h2'>
                Willkommen, {data.user_name}
        </Typography>
        <Typography variant='p'>
            {data.first_name} {data.last_name} <br></br>
            {data.email}{data.profile.about_short}
                 
        </Typography>
      
        </div>
          <img src={`${MEDIA_URL}${data.profile.profilepic.ratios['1/1'].sources['image/jpeg'][300]}`}>

          </img>
    </React.Fragment>
  )
}

export default OwnerProfile