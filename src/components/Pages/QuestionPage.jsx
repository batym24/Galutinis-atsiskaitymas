import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import AnswersContext from "../../contexts/AnswersContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "../UI/Organisms/Loading";
import { useFormik } from "formik";
import * as yup from 'yup'
import {v4 as generateId} from 'uuid'
import Answer from "../UI/Molecules/Answer";

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
    position: relative;

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

        span {
            font-weight: 900;
        }

        i {
            cursor: pointer;
            font-size: 1.5rem;
            color: #e07f26;
            transition: 0.05s
        }
        i:hover {
            transform: scale(1.05);
        }
      }
      .description {
        flex: 15;
      }
    }

    .title {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid gray;
      padding: 20px 30px;


      button {
        background-color: #0a95ff;
        color: white;
        border: none;
        border-radius: 5px;
        border-top: 1px solid #6cc0ff;
        padding: 10px;
        font-size: 0.8rem;
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
    left: 15px;
    font-size: 2rem;
    color: black;
  }
    .edit {
        button {
            display: flex;
            gap: 10px;
        }
    }
    .new-answer {
        padding: 30px 30px 0 30px;
    }
  .edit {
    button {
      display: flex;
      gap: 10px;
    }
  }
  .new-answer {
    padding: 30px 30px 0 30px;

    textarea {
      width: 85vw;
      height: 200px;
      margin: auto;
      resize: none;
    }

    form {
      display: flex;
      flex-direction: column;

      input {
        margin: 20px auto;
        min-width: 600px;
        max-width: 650px;
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
    }
  }
  .answer {
    p {
      padding: 20px;
    }
  }

  .date{
    position: absolute;
    bottom: 5px;
    right: 10px;
    font-style: italic;
    font-size: 0.8rem;
  }
`;

const QuestionPage = () => {
    const {currentUser} = useContext(UsersContext)
    const {setAnswers, answers, ANSWERS_ACTION_TYPE} = useContext(AnswersContext)
    const {id} = useParams()
    const {setQuestions, QUESTIONS_ACTION_TYPE, questions} = useContext(QuestionsContext)
    const [question, setQuestion] = useState()
    const navigate = useNavigate()

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
        .max(1000, "Please make it shorter")
    })

    const formik = useFormik({
        initialValues: values,
        validationSchema: validationSchema,
        onSubmit: ({resetForm}) => {
            const newAnswer = {
                id: generateId(),
                questionId: id,
                creatorId: currentUser.id,
                answer: formik.values.answer,
                answerUpvotes: 0,
                answerIsUpdated: false
            }
            setAnswers({
                type: ANSWERS_ACTION_TYPE.ADD,
                data: newAnswer
            })
            formik.resetForm()
        }
    })

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
                question && answers && questions ?
                    <section>
                        <div className="container">
                            <div className="title">
                                <h2>{questions.find(question => question.id.toString() === id.toString()).title}</h2>
                                {   currentUser &&
                                    question.creatorId.toString() === currentUser.id.toString() &&
                                    <div className="edit">
                                        <Link to={`/editQuestion/${id}`}><button>Edit Question</button></Link>
                                        <button onClick={() => {
                                            setQuestions({
                                                type: QUESTIONS_ACTION_TYPE.DELETE,
                                                id: id
                                            })
                                            navigate('/home')
                                        }}>Delete Question</button>
                                    </div>
                                }
                                {
                                    questions.find(question => question.id.toString() === id.toString()).QuestionIsUpdated && 
                                    <span className="date">Updated on: {questions.find(question => question.id.toString() === id.toString()).QuestionIsUpdated.slice(0, 10)}</span>
                                }
                            </div>
                            <div className="question-description">
                            <div className="upvotes">
                                    {
                                        currentUser &&
                                        <>
                                            <i className="fa-solid fa-arrow-up" onClick={handleUpvote}></i>
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
                                    <p>{questions.find(question => question.id.toString() === id.toString()).description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="title">
                                <h2>Answers</h2>
                            </div>
                            <div className="answer">
                                {   
                                    answers.map(answer => {
                                        if(answer.questionId.toString() === id.toString()) {
                                            return <Answer 
                                                key={answer.id}
                                                answer={answer}
                                            />
                                        }
                                    })
                                }
                            </div>
                        </div>
                        {
                            currentUser && 
                            <div className="container">
                                <div className="title">
                                    <h2>Write an answer</h2>
                                </div>
                                <div className="new-answer">
                                    <form onSubmit={formik.handleSubmit}>
                                        <textarea 
                                        name="answer" 
                                        id="answer"
                                        value={formik.values.answer}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        />
                                            {
                                                (formik.touched.answer && formik.errors.answer) && 
                                                <p>{formik.errors.answer}</p>
                                            }
                                        <input type="submit" value={"Submit your answer"} />
                                    </form>
                                </div>
                            </div>
                        }
                        <Link to='/home'><i className="fa-solid fa-chevron-left"></i></Link>
                    </section> :
                    <Loading/>
            }
        </StyledMain>
     );
}
 
export default QuestionPage;