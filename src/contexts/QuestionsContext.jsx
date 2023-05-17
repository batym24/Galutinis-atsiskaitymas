import { createContext, useReducer, useEffect } from "react";

const QuestionsContext = createContext()

const QUESTIONS_ACTION_TYPE = {
    GET: 'getAllQuestions'
}

const reducer = (state, action) => {
    switch(action.type){
        case QUESTIONS_ACTION_TYPE.GET:
            return action.data
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

    console.log(questions)

    return ( 
        <QuestionsContext.Provider
            value={{
                questions,
                setQuestions
            }}
        >
            {children}
        </QuestionsContext.Provider>
     );
}
 
export {QuestionsProvider};
export default QuestionsContext