import React from 'react'
import Question from './Question'
import Start from './Start'

import './App.css';

function App() {
  console.log('App mounted')
  const [ reset , setReset] = React.useState( false )
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
  
  const questionsArr = questions.map( item => <Question data={item}/> )
  // console.log( questionsArr )
  return (
    <div className="App">
      { start ? <div className='questions-container'> {questionsArr} </div>  : <Start startGame={startGame} /> }
    </div>
  );
}

export default App;
