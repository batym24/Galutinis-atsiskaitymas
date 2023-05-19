import { createContext, useReducer, useEffect } from "react";

const QuestionsContext = createContext()

const QUESTIONS_ACTION_TYPE = {
    GET: 'getAllQuestions',
    ADD: 'addNewQuestion',
    DELETE: 'deleteQuestion',
    UPVOTE: 'upvote',
    DOWNVOTE: 'downvote'
}

const reducer = (state, action) => {
    switch(action.type){
        case QUESTIONS_ACTION_TYPE.GET:
            return action.data
        case QUESTIONS_ACTION_TYPE.ADD:
            fetch('http://localhost:8080/questions', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(action.data)
            })
            return [...state, action.data]
        case QUESTIONS_ACTION_TYPE.DELETE:
            fetch(`http://localhost:8080/questions/${action.id}`, {
                method: "DELETE"
            })
        case QUESTIONS_ACTION_TYPE.UPVOTE:
            return state.map(question => {
                if (question.id.toString() === action.id.toString()){
                    fetch(`http://localhost:8080/questions/${action.id}`, {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({questionUpvotes: question.questionUpvotes + 1})
                })
                    return {...question, questionUpvotes: question.questionUpvotes + 1}
                }
                else {
                    return question
                }
            })
        case QUESTIONS_ACTION_TYPE.DOWNVOTE:
            return state.map(question => {
                if (question.id.toString() === action.id.toString()){
                    fetch(`http://localhost:8080/questions/${action.id}`, {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({questionUpvotes: question.questionUpvotes - 1})
                })
                    return {...question, questionUpvotes: question.questionUpvotes - 1}
                }
                else {
                    return question
                }
            })
        default:
            return state
    }
}

const QuestionsProvider = ({children}) => {

    const [questions, setQuestions] = useReducer(reducer, [])

    useEffect(() => {
        fetch('http://localhost:8080/questions')
        .then(response => response.json())
        .then(data => setQuestions({
            type: QUESTIONS_ACTION_TYPE.GET,
            data: data
        }))
    }, [])


    return ( 
        <QuestionsContext.Provider
            value={{
                questions,
                setQuestions,
                QUESTIONS_ACTION_TYPE
            }}
        >
            {children}
        </QuestionsContext.Provider>
     );
}
 
export {QuestionsProvider};
export default QuestionsContext