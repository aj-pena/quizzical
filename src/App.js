import React from 'react'
import Question from './Question'
import Start from './Start'

import './App.css';

function App() {

  const [ start, setStart ] =React.useState( false )
  const [ questions, setQuestions ] = React.useState( [] )
  const [ checkedAnswers, setCheckedAnswers ] = React.useState ( false )

  // function startGame(){
  //   fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
  //   .then( res => res.json() )
  //   .then( data => console.log(data.results) )

  // }
  // startGame()

  function rndmOrder(){
    const indexArr = []
    while(indexArr.length < 4){
      const num = Math.floor(Math.random()*4)
      if(!indexArr.includes(num)){
        indexArr.push(num)
      }
    }
    return indexArr
  }
  console.log(rndmOrder())
  return (
    <div className="App">
      { start ? <div> Questions will go here </div> : <Start /> }
    </div>
  );
}

export default App;
