import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StyledMain = styled.main`
    
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
        <>
        </>
     );
}
 
export default QuestionPage;