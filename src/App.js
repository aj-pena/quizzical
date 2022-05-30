import React from 'react'
import Question from './Question'
import Start from './Start'
import { nanoid } from 'nanoid'

import './App.css';

function App() {
  const [ reset , setReset] = React.useState( false )
  const [ start, setStart ] =React.useState( false )
  // questions state to save the array of question objects, each with an array of choices objects to pass a props
  const [questions, setQuestions] = React.useState( [] )
  const [ selected, setSelected ] = React.useState( {
    is_selected: false,
    questionId: "",
    choiceId: ""
  } )
  console.log( selected )
  
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
            verified: false,
          }
          ) )
            // 1.2.2 correct answer
          baseArr.push( 
            {
              choice_id: nanoid(),
              answer: object.correct_answer,
              correct: true,
              selected: false,
              verified: false,
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
    } )

  } , [ reset ])  

  function startGame(){
    setStart( true )
  }

  // function checkSelected(){
  //   let isSelected = false
  //   let questionId= ""
  //   let selectedChoiceId = ""    
  //   for( let i=0; i < questions.length; i++){
  //     for(let j=0; j < questions[i].choices.length; j++){
  //       if( questions[i].choices[j].selected){
  //         isSelected = true
  //         questionId = questions[i].id
  //         selectedChoiceId = questions[i].choices[j].choice_id
  //         console.log( 'An option is already selected: ', questions[i].choices[j].answer, selectedChoiceId  )
  //       }
  //     }
  //   }
  //   return (
  //     {
  //       is_Selected: isSelected,
  //       question_id: questionId,
  //       choice_id: selectedChoiceId,

  //     }
  //      )
  // }
  
  function select(choice_id, question_id){
   
    // if there already is a selected choice and is not the one clicked: alert. 
    // Otherwise: select/deselect
    if( selected.is_selected && choice_id !== selected.choiceId){
      alert("You can only select one option")
    }else{
      // let choiceIsSelected = false
      setQuestions( prevQuestions => prevQuestions.map( question => {      
        let newQuestion 
        if(question.id === question_id){
          const newChoices = question.choices.map( choice => {
            let newChoice
            if(choice.choice_id === choice_id ){
              newChoice = { ...choice, selected: !choice.selected } 
              // choiceIsSelected = !choice.selected
            } else { 
              newChoice = choice 
            } 
          
          return newChoice
          })
          newQuestion = {...question, choices : newChoices} 
        }else{
          newQuestion = question
        }
        return newQuestion
      }))
      setSelected( prevSelected => (
          { 
            is_selected: !prevSelected.is_selected,
            questionId: question_id,
            choiceId: choice_id
          }
        )
      )
    }
        
    
  }

  function checkAnswers(){
    setQuestions( prevQuestions => prevQuestions.map( question => {
      const newChoices = question.choices.map( choice => ({...choice, verified: true  }))
      return (
        {
          ...question, 
          choices: newChoices,
        }
    )
    } ))
  }

  function newGame(){
    setReset( prevState => !prevState )
    setStart( false )
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
