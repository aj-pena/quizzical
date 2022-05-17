import React from 'react'

export default function Start( props ) {
  return (
    <div>
    <h1> Quizzical </h1>
    <p> Answer as many correct answers as you can ! </p>
    <button onClick={props.startGame } > Start Quiz </button>

    </div>
  )
}
