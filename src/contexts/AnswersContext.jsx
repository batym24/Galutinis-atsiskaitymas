import { createContext } from "react";

const AnswersContext = createContext()

const AnswersProvider = ({children}) => {
    return ( 
        <AnswersContext.Provider
            value={{
                
            }}
        >
            {children}
        </AnswersContext.Provider>
     );
}
 
export {AnswersProvider};
export default AnswersContext