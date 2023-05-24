import React from 'react'
import { MEDIA_URL } from '../../SETTINGS'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const AuthorProfile = ({data}) => {
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
        <Typography
        variant='h1'>Touren</Typography>
        {data.tours.map((tour) => {

          return ( 
          <React.Fragment> 
            <Link to= {`/tour/${tour.tourtype}/${tour.slug}`}> <Typography variant='h4'>{tour.title}</Typography> </Link>
            <Typography variant='h6'>{tour.subtitle}</Typography>
            </React.Fragment>)
        })}

        <Typography
        variant='h1'>Artikel
        </Typography>

        {data.articles.map((article) => {

          return ( 
              <React.Fragment> 
              <Link to= {`/article/${article.slug}`}> <Typography variant='h4'>{article.title}</Typography> </Link>
              <Typography variant='h6'>{article.subtitle}</Typography>
              </React.Fragment>
              )
})}


    </React.Fragment>
  )
}

export default AuthorProfile