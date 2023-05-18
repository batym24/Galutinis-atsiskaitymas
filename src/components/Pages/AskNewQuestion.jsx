import styled from "styled-components";
import questionRobots from '../../pictures/questions.png'

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

`

const AskNewQuestion = () => {
    return ( 
        <StyledMain>
            <div className="title">
                <h1>Feel free to ask a question !</h1>
                <img src={questionRobots} alt="question boxes" />
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
                    <textarea 
                    type="text"
                    name="description"
                    id="description"
                     />
                </div>
                <div>
                    <input type="submit" value={'Create a question'} />
                </div>
            </form>
        </StyledMain>
     );
}
 
export default AskNewQuestion;