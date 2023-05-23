import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from 'yup'
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import AnswersContext from "../../contexts/AnswersContext";
import { Link } from "react-router-dom";

const StyledMain = styled.main`
    position: relative;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 100px 80px 100px;

        i {
            font-size: 8rem;
            color: #0a95ff;
        }
    }

    .answer-part {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 60vw;
        border: 1px solid gray;
        border-radius: 3px;
        margin: 20px auto;
        padding: 30px;

        label {
            font-size: 1.15rem;
        }

        textarea {
            height: 200px;
            resize: none;
        }
    }

    .buttons {
        display: flex;
        justify-content: center;
        gap: 10px;

        input, button {
            margin-bottom: 30px;
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

        input:hover, button:hover {
            opacity: 0.8;
        }
    }
    p {
        color: tomato;
        margin: 0;
        font-size: 0.8rem;
    }

    .back {
        position: absolute;
        top: 0;
        left: 15px;
        font-size: 2rem;
        color: black;
    }
`

const EditAnswer = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {currentUser} = useContext(UsersContext)
    const {setAnswers, ANSWERS_ACTION_TYPE} = useContext(AnswersContext)

    const [answer, setAnswer] = useState()

    useEffect(() => {
        fetch(`http://localhost:8080/answers/${id}`)
         .then(res => res.json())
         .then(data => setAnswer(data))
    })

    const values = {
        answer: answer ? answer.answer : ""
    }

    const validationSchema = yup.object({
        answer: yup.string()
        .required("Please write an answer")
        .min(20, "Answer should be at least 20 symbols")
        .max(1000, "Please make it shorter")
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: validationSchema,
        onSubmit: () => {
            const updatedAnswer = {
                id: id,
                questionId: answer.questionId,
                creatorId: currentUser.id,
                answer: formik.values.answer,
                answerUpvotes: answer.answerUpvotes,
                answerIsUpdated: new Date()
            }
            setAnswers({
                type: ANSWERS_ACTION_TYPE.EDIT,
                data: updatedAnswer,
                id: id
            })
            navigate(`/question/${answer.questionId}`)
        }
    })

    return ( 
        <StyledMain>
            <div className="title">
                <h1>You can edit your answer here</h1>
                <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="answer-part">
                    <label htmlFor="description">Your answer</label>
                    <textarea 
                    type="text"
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
                </div>
                <div className="buttons">
                    <input type="submit" value={'Update answer'} />
                    <button onClick={formik.handleReset}>Rest</button>
                </div>
            </form>
            <Link to={`/question/${id}`}><i className="fa-solid fa-chevron-left back"></i></Link>            
        </StyledMain>
     );
}
 
export default EditAnswer;