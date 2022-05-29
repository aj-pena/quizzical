import React from 'react'
import Option from './Option'

export default function Question({id, question, choices, select}) {
  
  // UseEffect to populate the choices state on first render
  // React.useEffect(() => {      
  //   // Array with 4 numbers between 0 and 3, in random order
  //   const arr = randomOrder()      
  //   // Array that will hold all choices, populated first with the incorrect answers
  //   const allchoices = data.incorrect_answers.map( incorrect_answer => (
  //     {
  //       id: nanoid(),
  //       answer: incorrect_answer,
  //       correct: false,
  //       selected: false,
  //     }
  //   ))
  //   // Correct answer pushed into the array of all choices
  //   allchoices.push( 
  //     {
  //       id: nanoid(),
  //       answer: data.correct_answer,
  //       correct: true,
  //       selected: false,
  //     }
  //   )
  //   // Array to be populated with choices in random order
  //   const randomizedchoices = []
  //   // populating randomizedchoices array using values from arr
  //   arr.forEach( value => randomizedchoices.push( allchoices[ value ] ) )
  //   setChoices( randomizedchoices )  
  //   setSelected( randomizedchoices.map( choice => ({
  //         id: choice.id,
  //         selected: choice.selected,
  //       }) 
  //     )
  //   )
  //       // eslint-disable-next-line
  // }, [ ] )    
    
  // function select(event){
  //   setSelected( oldSelected => oldSelected.map( 
  //     old => old.id === event.target.id ? {...old, selected: !old.selected} : {...old } 
  //     )
  //   )
  // }

  return (
    <div className='question-card'>
      <h3 className='question-text'> {question} </h3> 
      <ul className='list-of-choices'>   
         {choices.map( choice => <Option 
            id={ choice.choice_id } 
            answer={choice.answer} 
            correct={choice.correct} 
            selected={choice.selected} 
            verified={choice.verified}           
            handleClick={select}
            key={ choice.choice_id }
            question_id={id}
         />)}        
      </ul>
      <hr></hr>
    </div>
  )
}
