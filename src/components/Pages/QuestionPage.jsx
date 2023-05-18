import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import AnswersContext from "../../contexts/AnswersContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "../UI/Organisms/Loading";
import { useFormik } from "formik";
import * as yup from 'yup'
import {v4 as generateId} from 'uuid'

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
`

const QuestionPage = () => {

    const {currentUser} = useContext(UsersContext)

    const {setAnswers} = useContext(AnswersContext)

    const {id} = useParams()

    const [question, setQuestion] = useState()

    useEffect(() => {
        fetch(`http://localhost:8080/questions/${id}`)
        .then(res => res.json())
        .then(data => setQuestion(data))
    }, [])

    const values = {
        answer: ""
    }

    const validationSchema = yup.object({
        answer: yup.string()
        .required("Please write an answer")
        .min(20, "Answer should be at least 20 symbols")
        .max(500, "Please make it shorter")
    })

    const formik = useFormik({
        initialValues: values,
        validationSchema: validationSchema,
        onSubmit: () => {
            const newAnswer = {
                id: generateId(),
                questionId: id,
                answer: formik.values.answer,
                answerUpvotes: 0,
                answerIsUpdated: false
            }
            console.log(newAnswer)
        }
    })

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
                                    <button>Edit Question</button>
                                }
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
                        <div className="container">
                            <div className="title">
                                <h2>Answers</h2>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="container">
                            <div className="title">
                                <h2>Write an answer</h2>
                            </div>
                            <div>
                                <form>
                                    <textarea 
                                    name="" 
                                    id=""
                                    value={formik.values.answer}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    >
                                        {
                                            (formik.touched.answer && formik.errors.answer) && 
                                            <p>{formik.errors.answer}</p>
                                        }
                                    </textarea>
                                    <input type="submit" value={"Submit your answer"} />
                                </form>
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