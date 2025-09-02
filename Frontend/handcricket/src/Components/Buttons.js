import React from 'react'
import './Buttons.css'

const buttons = (props) => {
  const choices=[0,1,2,3,4,5,6];
  return (
    <div className='buttons-wrapper'>
      {
        choices.map((choice)=>{
            return (<button value={choice} disabled={props.disabled} key={choice} onClick={props.handleChoice} >{choice}</button>)
        })
      }
    </div>
  )
}

export default buttons
