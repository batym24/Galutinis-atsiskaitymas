import { createContext } from "react";

const QuestionsContext = createContext()

const QuestionsProvider = ({children}) => {
    return ( 
        <QuestionsContext.Provider
            value={{

            }}
        >
            {children}
        </QuestionsContext.Provider>
     );
}
 
export {QuestionsProvider};
export default QuestionsContext