import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from 'yup'
import { useContext } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import UsersContext from "../../contexts/UsersContext";
import { Link } from "react-router-dom";


const StyledMain = styled.main`
    min-height: calc(100vh - 200px);
    position: relative;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 100px 80px 100px;

        i {
            font-size: 10rem;
            color: #0a95ff;
        }
    }

    .question-part {
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

        input {
            height: 25px;
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

const EditQuestion = () => {
    const {id} = useParams()
    const [question, setQuestion] = useState(null)
    const {setQuestions, QUESTIONS_ACTION_TYPE} = useContext(QuestionsContext)
    const {currentUser} = useContext(UsersContext)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8080/questions/${id}`)
         .then(res => res.json())
         .then(data => setQuestion(data))
    },[])

    const values = {
        title: question ? question.title : "",
        description: question ? question.description : ""
    }

    const validationSchema = yup.object({
        title: yup.string()
         .required("Title for question is required")
         .min(10, "Title should be formed by at least 10 symbols ")
         .max(100, "Title shouldn't be longer than 100 symbols"),
        description: yup.string()
         .required("Please describe your question")
         .min(20, "Please describe the question, it should be at least 20 symbols")
         .max(500, "Please make it shorter")
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: validationSchema,
        onSubmit: () => {
            const updatedQuestion = {
                id: id,
                creatorId: currentUser.id,
                title: formik.values.title,
                description: formik.values.description,
                questionUpvotes: question.questionUpvotes,
                QuestionIsUpdated: new Date()
            }
            setQuestions({
                type: QUESTIONS_ACTION_TYPE.EDIT,
                data: updatedQuestion,
                id: id
            })
            navigate(`/question/${id}`)
        }
    })

    return ( 
        <StyledMain>
            <div className="title">
                <h1>You can edit your question here</h1>
                <i className="fa-solid fa-clipboard-question"></i>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="question-part">
                    <label htmlFor="title">Title</label>
                    <input 
                    type="text"
                    name="title"
                    id="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    {
                        (formik.touched.title && formik.errors.title) &&
                        <p>{formik.errors.title}</p>
                    }
                </div>
                <div className="question-part">
                    <label htmlFor="description">Describe the question details</label>
                    <textarea 
                    type="text"
                    name="description"
                    id="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                     />
                     {
                        (formik.touched.description && formik.errors.description) &&
                        <p>{formik.errors.description}</p>
                     }
                </div>
                <div className="buttons">
                    <input type="submit" value={'Update question'} />
                    <button onClick={formik.handleReset}>Rest</button>
                </div>
            </form>
            <Link to={`/question/${id}`}><i className="fa-solid fa-chevron-left back"></i></Link>         
        </StyledMain>
     );
}
 
export default EditQuestion;