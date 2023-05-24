import { Typography } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import axiosInstance from '../../utils/axios'
import { useEffect } from 'react'
import { API_URL } from '../../SETTINGS'
import { MEDIA_URL } from '../../SETTINGS'
import { useParams } from 'react-router-dom'
import { profile } from 'console'
import OwnerProfile from './OwnerProfile.tsx'
import AuthorProfile from './AuthorProfile.tsx'



const Profile = () => {

  const { uid } = useParams()

    const [profileData,setProfileData] = React.useState({
      data: null,
      code: 404,
    })
    
    
    useEffect(() =>{

            axiosInstance.get(`${process.env.REACT_APP_API_URL}/user/profile/${uid}/`).then((res) => {
                setProfileData({...profileData, data:res.data, code: 200})
            }).catch(error => {
              if(error.response.status ===404){

                setProfileData({data: 'Kein User gefunden', code: 404})

              }
            })

    },[])

  console.log(profileData)
  if(!profileData.data) return null;
  if(profileData.code===404) return(profileData.data)
  
  return (


    (profileData.data.auth_type==='owner'?     
    
    <OwnerProfile data={profileData.data}/>

    :

    <AuthorProfile data={profileData.data}/>
    )


  )
}


export default Profile;