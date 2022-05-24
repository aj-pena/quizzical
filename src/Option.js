import React from 'react'

export default function Option({answer, veredict, verified}) {
  console.log( 'veredict', answer, veredict)
    //local state to manage wether option is selected 
  const [ selected, setSelected ] = React.useState( false )
    //variable to pass className to the list item, according to conditionals 
  let classes
   //NOT verified 
  // sets the className to neutral if option not verified AND not selected
    if(!verified && !selected){ classes = 'question-option neutral'}
    if(!verified && selected){ classes = 'question-option selected'}
    // verified
    if(verified && !selected && veredict ){ classes = 'question-option correct'}
    if(verified && selected && veredict ){ 
      classes = 'question-option correct'
      console.log('This would increase score in 1')
    }
    if(verified && selected && !veredict ){ classes = 'question-option incorrect'}
    if(verified && !selected && !veredict ){ classes = 'question-option neutral'}
    function handleClick(){
        setSelected( prevState => !prevState )
    }

  return (
    <li className={ classes } onClick={handleClick}> {answer} </li>
  )
}
