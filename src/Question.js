import React from 'react'
import Option from './Option'

export default function Question({data}) {
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
    const allOptions = data.incorrect_answers
    // Correct answer pushed into the array of all options
    allOptions.push( data.correct_answer)
    // Array to be populated with options in random order
    const randomizedOptions = []
    // populating randomizedOptions array using values from arr
    arr.forEach( value => randomizedOptions.push( allOptions[ value ] ) )
  return (
    <div className='question-card'>
      <h3 className='question-text'> {data.question} </h3> 
      {/* Random values of [arr] allow to retrieve values of [options] in different order */}
      <ul className='list-of-options'>   
        {/*turning array of options into JSX to display it correctly  */}
         {randomizedOptions.map( option => <Option answer={option}/>)}        
      </ul>
      <hr></hr>
    </div>
  )
}
