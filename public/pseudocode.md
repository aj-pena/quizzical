<!--
 Two components: <Start/> and <Question/>
 App will conditionally render start OR questions depending on a state called 'start'
 'start' state will be initialized as false
 When 'start' is false, App will render the <Start/> component, which contains a 'start quiz' button
 When the 'start quiz' button is clicked, it will 'setStart' to true and App will render the questions instead.

 App will map over a questions array which is stored in a 'questions' state.
 'questions' state is populated on 'Start Quiz' button click, which will call a startGame() function
 startGame() function will set 'start' state to true
 startGame() function will make fetch call to OTDB API
 startGame() function will setQuestions() state to store the results from fetch

 When App renders the questions, it should also include two conditionally rendered buttons: 'check answers button' and 'Play again', which depend on a 'checkedAnswers' state.
 If 'checkedAnswers' === false, 'check answers' button should be displayed.
 If 'checkedAnswers'=== true, <h4> score </h4> AND 'Play again' button should be displayed.
 To calculate the score, I need to keep track of selected answers and compare with correct answer.
 For each correct answer, add one point to the score.
 Display the score as fraction of 'x/5'.
If 'Play again' button is clicked, startGame() function will be called, restarting the game.

 Once App maps questions state to display questions by calling <Question /> for each item in the array,
 <Question /> will include a heading to display the question and a list of options styled to look like buttons
 Each option will have four styles: neutral, selected, correct, incorrect
 onClick, a 'selected' class will be added to the style (inline object or conditionally rendered? Inline is shorter/more concise, conditional requires state?)
 When 'check answers' button is clicked, a checkAnswers() function will be called
 checkAnswers() will compare selected options with correct answer
 if they are the same (same id?), then add 1 point to the score.
 Then save the score as state so that App is re-rendered and correct score is displayed? (No because its display already depends on the 'checkedAnswers' state)


 What the OTDB API returns is:
 {
    response_code: 0
    results: Array(5)
        0:
            category: "Art"
            correct_answer: "Leonardo da Vinci"
            difficulty: "easy"
            incorrect_answers: Array(3)
                0: "Pablo Picasso"
                1: "Claude Monet"
                2: "Vincent van Gogh"
                length: 3
                [[Prototype]]: Array(0)
            question: "Who painted the Mona Lisa?"
            type: "multiple"
            [[Prototype]]: Object
        1: {category: 'Politics', type: 'multiple', difficulty: 'easy', question: 'Which of the following Pacific Islander countries is ruled by a constitutional       monarchy?', correct_answer: 'Tonga', …}
        2: {category: 'Entertainment: Video Games', type: 'multiple', difficulty: 'easy', question: 'In which year was League of Legends released?', correct_answer:        '2009', …}
        3: {category: 'Politics', type: 'multiple', difficulty: 'easy', question: 'Which former US president was nicknamed &quot;Tedd…ter he refused to shoot a         defenseless black bear?', correct_answer: 'Theodore Roosevelt', …}
        4: {category: 'Entertainment: Television', type: 'multiple', difficulty: 'easy', question: 'What Nickelodeon game show featured a house on the…contestants would        ransack to find hidden objects?', correct_answer: 'Finders Keepers', …}
        length: 5
}

 

 -->