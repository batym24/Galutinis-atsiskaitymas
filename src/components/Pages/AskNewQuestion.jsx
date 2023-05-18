import styled from "styled-components";
import questionRobot from '../../pictures/questions.png'

const StyledMain = styled.main`
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 100px;
    }
`

const AskNewQuestion = () => {
    return ( 
        <StyledMain>
            <div className="title">
                <h1>Feel free to ask a question !</h1>
                <img src={questionRobot} alt="question boxes" />
            </div>
            <form>
                <div className="question-part">
                    <label htmlFor="title">Title</label>
                    <input 
                    type="text"
                    name="title"
                    id="title"
                    />
                </div>
                <div className="question-part">
                    <label htmlFor="description">Describe the question details</label>
                    <input 
                    type="text"
                    name="description"
                    id="description"
                     />
                </div>
                <input type="submit" value={'Create a question'} />
            </form>
        </StyledMain>
     );
}
 
export default AskNewQuestion;