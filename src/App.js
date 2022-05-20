import React from 'react'
import Question from './Question'
import Start from './Start'
import { nanoid } from 'nanoid'

import './App.css';

function App() {
  const [ reset , setReset] = React.useState( 0 )
  const [ start, setStart ] =React.useState( false )
  const [ questions, setQuestions ] = React.useState( [] )
  const [ checkedAnswers, setCheckedAnswers ] = React.useState ( false )
  
  React.useEffect( () => {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
    .then( res => res.json() )
    .then( data => setQuestions( data.results ) )
  } , [ reset ])
  
  function startGame(){
    setStart( true )
  }

  function checkAnswers(){}

  function newGame(){
    setReset( prevState => prevState + 1 )
  }

  
  
  const questionsArr = questions.map( item => <Question data={item} key={nanoid()}/> )
  return (
    <div className="App">
      { start ? <div className='questions-container'> 
      {questionsArr} 
      <button className='btn btn-secondary' onClick={checkAnswers}> Check Answers </button>
      <button className='btn btn-secondary' onClick={newGame}> Play Again </button>
      </div>  : 
      <Start startGame={startGame} /> }
    </div>
  );
}

export default App;
