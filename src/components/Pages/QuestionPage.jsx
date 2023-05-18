import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StyledMain = styled.main`
    section {
        
        height: calc(100vh - 100px);
    }

    .question-container {
        width: 90vw;
        margin: 20px auto;
        border: 3px solid gray;

        .question-description {
            display: flex;

            .upvotes {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                gap: 3px;
                flex: 1;
        }
            .description {
                flex: 15;
            }
        }

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
                    <section>
                        <div className="question-container">
                            <div className="title">
                                <h2>{question.title}</h2>
                            </div>
                            <div className="question-description">
                                <div className="upvotes">
                                    <i className="fa-solid fa-arrow-up"></i>
                                    <span>{question.questionUpvotes}</span>
                                    <i className="fa-solid fa-arrow-down"></i>
                                </div>
                                <div className="description">
                                    <p>{question.description}</p>
                                </div>
                            </div>
                        </div>

                    </section> :
                    <h1>Loading...</h1>
            }
        </StyledMain>
     );
}
 
export default QuestionPage;