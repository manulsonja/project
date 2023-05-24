import React from 'react'
import { MEDIA_URL } from '../../SETTINGS'
import { Typography } from '@mui/material'

const GuestProfile = ({data}) => {
  return (
    <React.Fragment> 
    <div>
        <Typography
        variant='h2'>
                Dies ist das Profil von, {data.user_name}
        </Typography>
        
      
        </div>
          <img src={`${MEDIA_URL}${data.profile.profilepic.ratios['1/1'].sources['image/jpeg'][300]}`}>

          </img>
    </React.Fragment>
  )
}

export default GuestProfile