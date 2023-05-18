import { createContext, useEffect, useReducer } from "react";

const AnswersContext = createContext()

const ANSWERS_ACTION_TYPE = {
    GET: 'getAllAnswers'
}

const reducer = (state,action) => {
    switch(action.type){
        case ANSWERS_ACTION_TYPE.GET:
            return action.data
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

    console.log(answers)

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