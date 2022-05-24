import React from 'react'
import Question from './Question'
import Start from './Start'
import { nanoid } from 'nanoid'

import './App.css';

function App() {
  const [ reset , setReset] = React.useState( false )
  const [ start, setStart ] =React.useState( false )
  const [ questions, setQuestions ] = React.useState( [] )
  const [ checkedAnswers, setCheckedAnswers ] = React.useState ( false )
  
  React.useEffect( () => {
    
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
    .then( res => res.json() )
    .then( data => setQuestions( data.results ) )

    console.log('I fire once')

  } , [])
  
  function startGame(){
    setStart( true )
  }

  function checkAnswers(){
    setCheckedAnswers( prevState => !prevState)
  }

  function newGame(){
    setReset( prevState => !prevState )
  }

  
  
  const questionsArr = questions.map( item => <Question data={item} key={nanoid()} checked={checkedAnswers}/> )
  return (
    <div className="App">
      { start ? 
      <div className='questions-container'> 
        {questionsArr} 
        <button className='btn btn-secondary' onClick={checkAnswers}> Check Answers </button>
        <button className='btn btn-secondary' onClick={newGame}> Play Again </button>
      </div>  : 
      <Start startGame={startGame} /> }
    </div>
  );
}

export default App;
