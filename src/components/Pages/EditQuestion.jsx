import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from 'yup'


const StyledMain = styled.main`
    
`

const EditQuestion = () => {
    const {id} = useParams()
    const [question, setQuestion] = useState()

    useEffect(() => {
        fetch(`http://localhost:8080/questions/${id}`)
         .then(res => res.json())
         .then(data => setQuestion(data))
    },[])

    const values = {
        title: question.title,
        description: question.description
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
        onSubmit: () => {}
    })

    return ( 
        <StyledMain>
            
        </StyledMain>
     );
}
 
export default EditQuestion;