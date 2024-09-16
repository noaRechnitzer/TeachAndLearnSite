import React from 'react'
import Questions_Answers from '../courses/Questions_Answers'

function Questions_and_Answers() {
  return (
    <div style={{display:'flex' , alignItems: 'center',justifyContent:'center',height:'85vh', backgroundImage: 'url(/appCurvyLines.png)', backgroundRepeat: 'repeat'}}>
        <div >
        <Questions_Answers/>
        </div>
    </div>
  )
}

export default Questions_and_Answers