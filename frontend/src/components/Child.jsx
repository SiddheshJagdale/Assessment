import React from 'react'

const Child = (props) => {
  return (
    <div>
        <p>{props.name}</p>
        <p>{props.age}</p>
        <p>{props.gender}</p>
    </div>
  )
}

export default Child