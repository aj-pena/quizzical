import React from 'react'

export default function Start( props ) {
  return (
    <div className='start'>
    <h1 className='title'> Quizzical </h1>
    <p className='description'> Answer as many correct answers as you can ! </p>
    <button onClick={props.startGame } className='btn-start' > Start Quiz </button>

    </div>
  )
}
