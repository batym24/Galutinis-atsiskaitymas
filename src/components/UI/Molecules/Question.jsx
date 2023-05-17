import { useContext } from "react";
import QuestionsContext from "../../../contexts/QuestionsContext";
import styled from "styled-components";


const StyledDiv = styled.div`
    .votes-answers{

    }
`
const Question = () => {

    const {questions} = useContext(QuestionsContext)

    return ( 
        <StyledDiv>
            <div className="votes-answers"></div>
        </StyledDiv>
     );
}
 
export default Question;