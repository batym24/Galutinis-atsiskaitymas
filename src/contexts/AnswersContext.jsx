import { createContext, useEffect, useReducer } from "react";

const AnswersContext = createContext()

const ANSWERS_ACTION_TYPE = {
    GET: 'getAllAnswers',
    ADD: 'addNewAnser',
    DELETE: 'deleteAnswer',
    EDIT: 'editAnswer',
    UPVOTE: 'upvoteAnswer',
    DOWNVOTE: 'downvoteAnswer'
}

const reducer = (state,action) => {
    switch(action.type){
        case ANSWERS_ACTION_TYPE.GET:
            return action.data
        case ANSWERS_ACTION_TYPE.ADD:
            fetch('http://localhost:8080/answers', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(action.data)
            })
            return [...state, action.data]
        case ANSWERS_ACTION_TYPE.DELETE:
            fetch(`http://localhost:8080/answers/${action.id}`, {
                method: "DELETE"
            })
            return state.filter(answer => answer.id.toString() !== action.id)
        case ANSWERS_ACTION_TYPE.UPVOTE:
            return state.map(answer => {
                if (answer.id.toString() === action.id.toString()){
                    fetch(`http://localhost:8080/answers/${action.id}`, {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({answerUpvotes: answer.answerUpvotes + 1})
                })
                    return {...answer, answerUpvotes: answer.answerUpvotes + 1}
                }
                else {
                    return answer
                }
            })
        case ANSWERS_ACTION_TYPE.DOWNVOTE:
            return state.map(answer => {
                if (answer.id.toString() === action.id.toString()){
                    fetch(`http://localhost:8080/answers/${action.id}`, {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({answerUpvotes: answer.answerUpvotes - 1})
                })
                    return {...answer, answerUpvotes: answer.answerUpvotes - 1}
                }
                else {
                    return answer
                }
            })
        case ANSWERS_ACTION_TYPE.EDIT:
            fetch(`http://localhost:8080/answers/${action.id}`, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(action.data)
            })
            return state.map(answer => {
                if(answer.id.toString() === action.id.toString()){
                    return {
                        ...answer,
                        answer: action.data.answer,
                        answerIsUpdated: new Date().toISOString()
                    }
                }
                else {
                    return answer
                }
            })
        default:
            return state
    }
}

const AnswersProvider = ({children}) => {

    const [answers, setAnswers] = useReducer(reducer, [])

    useEffect(() => {
        fetch(`http://localhost:8080/answers`)
        .then(res => res.json())
        .then(data => setAnswers({
            type: ANSWERS_ACTION_TYPE.GET,
            data: data
        }))
    },[])


    return ( 
        <AnswersContext.Provider
            value={{
                ANSWERS_ACTION_TYPE,
                answers,
                setAnswers
            }}
        >
            {children}
        </AnswersContext.Provider>
     );
}
 
export {AnswersProvider};
export default AnswersContext