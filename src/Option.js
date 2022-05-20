import React from 'react'

export default function Option({answer}) {
    const [ selected, setSelected ] = React.useState( false )

    function handleClick(){
        setSelected( prevState => !prevState )
    }

  return (
    <li className={ selected ? 'question-option selected' : 'question-option neutral'} onClick={handleClick}> {answer} </li>
  )
}
