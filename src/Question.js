import React from 'react'
import { nanoid } from 'nanoid'

export default function Question({data}) {
    console.log('question mounted')
     // generates an array with 4 numbers between 0 and 3, in random order.
    function randomOrder(){
        const indexArr = []
        while(indexArr.length < 4){
          const num = Math.floor(Math.random()*4)
          if(!indexArr.includes(num)){
            indexArr.push(num)
          }
        }
        return indexArr
      }
      // Array with 4 numbers between 0 and 3, in random order
    const arr = randomOrder()
      // Array that will hold all options, populated first with the incorrect answers
    const options = data.incorrect_answers
    // Correct answer pushed into the array of all options
    options.push( data.correct_answer)

  return (
    <div className='question-card'>
      <h3 className='question-text'> {data.question} </h3> 
      {/* Random values of [arr] allow to retrieve values of [options] in different order */}
      <ul className='list-of-options'>        
        <li className='question-option neutral' key={nanoid()}> { options[ arr[0] ] } </li>
        <li className='question-option neutral' key={nanoid()}> { options[ arr[1] ] } </li>
        <li className='question-option neutral' key={nanoid()}> { options[ arr[2] ] } </li>
        <li className='question-option neutral' key={nanoid()}> { options[ arr[3] ] } </li>
      </ul>
      <hr></hr>
    </div>
  )
}
