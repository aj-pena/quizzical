import React from 'react'
import Option from './Option'
import { nanoid } from 'nanoid'

export default function Question({ data, checked }) {
  // state to manage the randomized options for answering the question
  const [choices, setChoices] = React.useState( [] )
  // state to manage/remember each selected option
  const [ selected, setSelected ] = React.useState( [] )  

  console.log( 'choices', choices)
  console.log( 'selected', selected)
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
  // UseEffect to populate the choices state on first render
  React.useEffect(() => {      
    // Array with 4 numbers between 0 and 3, in random order
    const arr = randomOrder()      
    // Array that will hold all options, populated first with the incorrect answers
    const allOptions = data.incorrect_answers.map( incorrect_answer => (
      {
        id: nanoid(),
        answer: incorrect_answer,
        correct: false,
        selected: false,
      }
    ))
    // Correct answer pushed into the array of all options
    allOptions.push( 
      {
        id: nanoid(),
        answer: data.correct_answer,
        correct: true,
        selected: false,
      }
    )
    // Array to be populated with options in random order
    const randomizedOptions = []
    // populating randomizedOptions array using values from arr
    arr.forEach( value => randomizedOptions.push( allOptions[ value ] ) )
    setChoices( randomizedOptions )  
    setSelected( randomizedOptions.map( option => ({
          id: option.id,
          selected: option.selected,
        }) 
      )
    )
        // eslint-disable-next-line
  }, [ ] )    
    
  function select(event){
    setSelected( oldSelected => oldSelected.map( 
      old => old.id === event.target.id ? {...old, selected: !old.selected} : {...old } 
      )
    )
  }

  return (
    <div className='question-card'>
      <h3 className='question-text'> {data.question} </h3> 
      {/* Random values of [arr] allow to retrieve values of [options] in different order */}
      <ul className='list-of-options'>   
        {/*turning array of options into JSX to display it correctly  */}
         {choices.map( (option, index) => <Option 
            id={ option.id } 
            answer={option.answer} 
            correct={option.correct} 
            selected={selected[index].selected} 
            verified={checked}           
            handleClick={select}
            key={ option.id }
         />)}        
      </ul>
      <hr></hr>
    </div>
  )
}
