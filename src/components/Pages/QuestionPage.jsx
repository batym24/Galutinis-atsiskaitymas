import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "../UI/Organisms/Loading";

const StyledMain = styled.main`
    position: relative;
    section {
        
        height: calc(100vh - 100px);
    }

    .container {
        width: 90vw;
        margin: 20px auto;
        border: 3px solid gray;
        background-color: white;

        .question-description {
            display: flex;
            padding: 10px;

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
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid gray;
            padding: 30px;

            button {
                background-color: #0a95ff;
                color: white;
                border: none;
                border-radius: 5px;
                border-top: 1px solid #6cc0ff;
                padding: 15px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
            }

            button:hover {
                opacity: 0.8;
            }
        }
    }
    .fa-chevron-left {
        position: absolute;
        top: 0;
        left: 25px;
        font-size: 2rem;
        color: black;
        
    }

    .edit {
        button {
            display: flex;
            gap: 10px;
        }
    }
`

const QuestionPage = () => {

    const {currentUser} = useContext(UsersContext)

    const {id} = useParams()

    const {setQuestions, QUESTIONS_ACTION_TYPE, questions} = useContext(QuestionsContext)

    const [question, setQuestion] = useState()

    useEffect(() => {
        fetch(`http://localhost:8080/questions/${id}`)
        .then(res => res.json())
        .then(data => setQuestion(data))
    }, [])

    const handleUpvote = () => {
        setQuestions({
            type: QUESTIONS_ACTION_TYPE.UPVOTE,
            id: id
        })
    }
    const handleDownvote = () => {
        setQuestions({
            type: QUESTIONS_ACTION_TYPE.DOWNVOTE,
            id: id
        })
    }
    

    return ( 
        <StyledMain>
            {
                question ?
                    <section>
                        <div className="container">
                            <div className="title">
                                <h2>{question.title}</h2>
                                {   currentUser &&
                                    question.creatorId.toString() === currentUser.id.toString() &&
                                    <div className="edit">
                                        <button>Edit Question</button>
                                        <button onClick={handleUpvote}>Delete Question</button>
                                    </div>
                                }
                            </div>
                            <div className="question-description">
                            <div className="upvotes">
                                    {
                                        currentUser &&
                                        <>
                                            <i className="fa-solid fa-arrow-up" onClick={() => handleUpvote()}></i>
                                            <span>
                                                {
                                                    questions && 
                                                    questions.find(question => question.id.toString() === id.toString()).questionUpvotes
                                                }
                                            </span>
                                            <i className="fa-solid fa-arrow-down" onClick={handleDownvote}></i>
                                        </>
                                    }
                            </div>
                                <div className="description">
                                    <p>{question.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="title">
                                <h2>Answers</h2>
                            </div>
                            <div>

                            </div>
                        </div>
                        <Link to='/home'><i className="fa-solid fa-chevron-left"></i></Link>
                    </section> :
                    <Loading/>
            }
        </StyledMain>
     );
}
 
export default QuestionPage;