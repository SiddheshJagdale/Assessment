import React from 'react'
import "./Button.css"

const Button = ({onClick}) => {
  return (
    <div className='button'>
        <button onClick={onClick}>Submit</button>
    </div>
  )
}

export default Button