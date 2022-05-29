import React from 'react'
import Question from './Question'
import Start from './Start'
import { nanoid } from 'nanoid'

import './App.css';

function App() {
  const [ reset , setReset] = React.useState( false )
  const [ start, setStart ] =React.useState( false )
  // data state to save the array of objects obtained from the API: data.results
  const [ data, setData ] = React.useState( [] )
  const [ checkedAnswers, setCheckedAnswers ] = React.useState ( false )
  // questions state to save the array of question objects, each with an array of choices objects to pass a props
  const [questions, setQuestions] = React.useState( [] )
  
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
  // Fetch the data from the OTDB API
  React.useEffect( () => {
    
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
    .then( res => res.json() )
    .then( data => { 
      // create an array of objects that will have relevant info for each question: id, question, and array of choices.
      const questionsObjects = data.results.map( object =>{         
        //1. construct a randomized array of choices (randomizedOptions) by,
          // 1.1 construct an array of randomized values between 0 and 3
          const arr = randomOrder()
          // 1.2 construct a base array with all options in order, creating an object with choice_id, answer, correct, selected and verified properties.
            // 1.2.1 incorrect answers first
          const baseArr = object.incorrect_answers.map( incorrect_answer => (
            {
            choice_id: nanoid(),
            answer: incorrect_answer,
            correct: false,
            selected: false,
            verified: checkedAnswers
          }
          ) )
            // 1.2.2 correct answer
          baseArr.push( 
            {
              choice_id: nanoid(),
              answer: object.correct_answer,
              correct: true,
              selected: false,
              verified: checkedAnswers
            }
            )
          //1.3 Array to be populated with options in random order
          const randomizedOptions = []
          //1.4 forEach() value on the random values array, pushing the object from the base array at the index of the value to the randomizedOptions array. 
          arr.forEach( value => randomizedOptions.push( baseArr[ value ] ) )
        //2. For each data object, construct a question object with id, question, and array of choices
        return ({
          id: nanoid(),
          question: object.question,
          choices: randomizedOptions
        })
      })
      // Save array of questions objects in the questions state
      setQuestions( questionsObjects )
      // Save the original data to the data state just in case, for now.
      setData( data.results )
    } )
    // eslint-disable-next-line
  } , [ reset ])  

  function startGame(){
    setStart( true )
  }
  
  function select(choice_id, answer, question_id){
    console.log('choice id: ', choice_id)
    console.log('question id: ', question_id)
    console.log( answer )
    setQuestions( prevQuestions => prevQuestions.map( question => {      
      let newQuestion 
      if(question.id === question_id){
        const newChoices = question.choices.map( choice => choice.choice_id === choice_id ? { ...choice, selected: true } : choice )
        newQuestion = {...question, choices : newChoices} 
      }else{
        newQuestion = question
      }
      return newQuestion
    }))
  }

  function checkAnswers(){
    
    setCheckedAnswers( prevState => !prevState )
    console.log('CHECKED ANSWERS ')
  }

  function newGame(){
    setReset( prevState => !prevState )
  }  
  
  const questionsArr = questions.map( question => <Question key={question.id} {...question} select={select}/> )
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
