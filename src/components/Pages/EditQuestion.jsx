import styled from "styled-components";
import { useParams } from "react-router-dom";

const StyledMain = styled.main`
    
`

const EditQuestion = () => {

    const {id} = useParams()

    console.log(id)
    return ( 
        <StyledMain>
            
        </StyledMain>
     );
}
 
export default EditQuestion;