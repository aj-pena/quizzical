import React from 'react'

export default function Option({id, answer, correct, selected, handleClick, verified}) {
  //variable to pass className to the list item, according to conditionals 
  let classes
   //NOT verified 
  // sets the className to neutral if option not verified AND not selected
    if(!verified && !selected){ classes = 'question-option neutral'}
    if(!verified && selected){ classes = 'question-option selected'}
    // verified
    if(verified && !selected && !correct ){ classes = 'question-option neutral'}
    if(verified && !selected && correct ){ classes = 'question-option correct'}
    if(verified && selected && !correct ){ classes = 'question-option incorrect'}
    if(verified && selected && correct ){ 
      classes = 'question-option correct'
      console.log('This would increase score in 1')
    }
    
    

  return (
    <li 
      className={ classes } 
      id={ id } 
      onClick={()=> handleClick( id, answer )} 
    > 
    {answer} 
    </li>
  )
}
