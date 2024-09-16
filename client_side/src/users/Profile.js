import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddImg from '../courses/add_course/addImg'

function Profile(props) {
  const navigate=useNavigate();
  return (
    <>
       {props.user&&<h3>welcome!! {props.user.firstName} {props.user.lastName}</h3>}
       <Button onClick={()=>navigate('/add_course')}>
         add course
       </Button>
       <AddImg></AddImg>
       <Button onClick={()=>navigate('/add_category')}>
         add category
       </Button>
    </>
  )
}

export default Profile