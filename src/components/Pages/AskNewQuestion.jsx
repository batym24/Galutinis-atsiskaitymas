import styled from "styled-components";
import questionRobots from '../../pictures/questions.png'
import { useFormik } from "formik";
import * as yup from 'yup'
import {v4 as generateId} from 'uuid'
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import { useContext } from "react";

const StyledMain = styled.main`
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 100px 80px 100px;
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

`

const AskNewQuestion = () => {

    const {currentUser} = useContext(UsersContext)

    const {setQuestions, QUESTIONS_ACTION_TYPE, questions} = useContext(QuestionsContext)

    const values = {
        title: "",
        description: ""
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
        initialValues: values,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const newQuestion = {
                id: generateId(),
                creatorId: currentUser.id,
                title: formik.values.title,
                description: formik.values.description,
                questionUpvotes: 0,
                QuestionIsUpdated: false
            }
            setQuestions({
                type: QUESTIONS_ACTION_TYPE.ADD,
                data: newQuestion
            })
            console.log(questions)
        }
    })

    return ( 
        <StyledMain>
            <div className="title">
                <h1>Feel free to ask a question !</h1>
                <img src={questionRobots} alt="question boxes" />
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
                    <input type="submit" value={'Create a question'} />
                    <button onClick={formik.handleReset}>Rest</button>
                </div>
            </form>
        </StyledMain>
     );
}
 
export default AskNewQuestion;