import React from 'react'

export default function Question(props) {
    console.log('question mounted')
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
  return (
    <div> {props.data.question} </div>
  )
}
