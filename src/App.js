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
  const [ selected, setSelected ] = React.useState( [] )
  const [ checkedAnswers, setCheckedAnswers ] = React.useState( false )
  const [ score, setScore ] = React.useState( 0 )
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
  function select(choice_id, question_id){
    // If there are selected options
    if( selected.length > 0 ){
      let questionAlreadySelected = false
      // Go through the selected options
      for( let i = 0; i < selected.length; i++){
        // if the clicked question already has a selected option
        if( selected[i].questionId === question_id){
          questionAlreadySelected = true
          // if the selected option is the same one that was clicked
          if( selected[i].choiceId === choice_id){
            // deselect
            selectDeselect(question_id, choice_id)
            // Erase selected option from selected state array by filtering all options that are not the one clicked
            setSelected( prevSelected => prevSelected.filter( option => option.choiceId !== choice_id ))
          }else{
            alert( "You can only choose one option ")
          }
        }
      }
      // If already a selected option for the question, check if same choice as clicked
      if(!questionAlreadySelected){
        // select option for that question
        selectDeselect(question_id, choice_id)
        setSelected( prevSelected => [...prevSelected, { 
            is_selected: true,
            questionId: question_id,
            choiceId: choice_id
          }]
        )
      
      }
      //if nothing has yet been selected 
    }else{
      selectDeselect(question_id, choice_id)
      setSelected( [
          { 
            is_selected: true,
            questionId: question_id,
            choiceId: choice_id
          } ]
      )      
    }    
  }
  function selectDeselect (question_id, choice_id){
    setQuestions( prevQuestions => prevQuestions.map( question => {      
      let newQuestion 
      if(question.id === question_id){
        const newChoices = question.choices.map( choice => {
          let newChoice
          if(choice.choice_id === choice_id ){
            newChoice = { ...choice, selected: !choice.selected } 
            
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
  }
  function checkAnswers(){
    setCheckedAnswers( true )
    questions.forEach( question => {
      question.choices.forEach( choice => {
        if( choice.selected && choice.correct){
          setScore( prevScore => prevScore + 1)
        }
      })
    })
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
    setCheckedAnswers( false )
    setScore( 0 )
    setQuestions( [] )
    setSelected( [] )
  }  
  
  const questionsArr = questions.map( question => <Question key={question.id} {...question} select={select}/> )
  return (
    <div className="App">
      { start ? 
      <div className='questions-container'> 
        {questionsArr} 
        { checkedAnswers ? <h4> You scored {score}/ 5 correct answers </h4> : <button className='btn btn-secondary' onClick={checkAnswers}> Check Answers </button>}
        <button className='btn btn-secondary' onClick={newGame}> Play Again </button>
      </div>  : 
      <Start startGame={startGame} /> }
    </div>
  );
}

export default App;
