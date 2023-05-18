import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StyledMain = styled.main`
    .question-container {
        width: 90vw;
        margin: 20px auto;
        border: 3px solid gray;
        

        .title {
            border-bottom: 1px solid gray;
            padding: 30px;
        }
    }
`

const QuestionPage = () => {

    const {id} = useParams()

    const [question, setQuestion] = useState()

    useEffect(() => {
        fetch(`http://localhost:8080/questions/${id}`)
        .then(res => res.json())
        .then(data => setQuestion(data))
    })

    return ( 
        <StyledMain>
            {
                question ?
                    <>
                        <div className="question-container">
                            <div className="title">
                                <h2>{question.title}</h2>
                            </div>
                            <div>
                                <div>
                                    
                                </div>
                                <div>
                                    <p>{question.description}</p>
                                </div>
                            </div>
                        </div>

                    </> :
                    <h1>Loading...</h1>
            }
        </StyledMain>
     );
}
 
export default QuestionPage;