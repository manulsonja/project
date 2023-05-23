import { Typography } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import axiosInstance from '../../utils/axios'
import { useEffect } from 'react'
import { API_URL } from '../../SETTINGS'
import { MEDIA_URL } from '../../SETTINGS'
const Profile = ({username, first_name, last_name, email}) => {

    const [profileData,setProfileData] = React.useState(null)
    
    
    useEffect(() =>{

            axiosInstance.get(`${process.env.REACT_APP_API_URL}/user/profile/`).then((res) => {
                setProfileData(res.data)
            })

    },[])

    console.log(profileData)
 if(!profileData) return('Sie sind nicht eingeloggt')
  return (
    <React.Fragment>

    <div>
        <Typography
        variant='h2'>
                Willkommen, {profileData.user_name}
        </Typography>
        <Typography variant='p'>
            {profileData.first_name} {profileData.last_name} <br></br>
            {profileData.email}{profileData.profile.about_short}
          
            

        </Typography>
      
        </div>
          <img src={`${MEDIA_URL}${profileData.profile.profilepic.ratios['1/1'].sources['image/jpeg'][300]}`}>

          </img>
    </React.Fragment>

  )
}



const mapStateToProps = state => ({
    username : state.auth.user.user_name ,
    first_name : state.auth.user.first_name,
    last_name : state.auth.user.last_name,
    email : state.auth.user.email,

})
export default connect(mapStateToProps, null)(Profile)