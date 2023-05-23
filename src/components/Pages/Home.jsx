import styled from "styled-components";
import { useContext, useState } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import AnswersContext from "../../contexts/AnswersContext";
import Question from "../UI/Molecules/Question";
import { Link } from "react-router-dom";

const StyledMain = styled.main`
    display: flex;
    min-height: calc(100vh - 100px);
    .main-container {
        display: flex;
        flex-direction: column;
        width: 90vw;
        margin: 20px auto;
        border: 3px solid gray;
        background-color: white;

        .header-filter {
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid gray;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            h1 {
                margin: 30px 100px;
                font-weight: 300;
            }

            button {
                margin: 20px 50px;
                background-color: #0a95ff;
                color: white;
                border: none;
                border-top: 1px solid #6cc0ff;
                cursor: pointer;
                padding: 10px 30px;
                border-radius: 3px;
                font-size: 0.9rem;
            }

            button:hover {
            background-color: #056fc0;
        }
        }

        .filter > form{
            display: flex;
            gap: 5px;
            justify-content: flex-end;
            margin: 20px 50px;

            input, select{
                background-color: #e1ecf4;
                color: #39739d;
                border: 1px solid #7aa7c7;
                padding: 5px 15px;
                border-radius: 5px;
            }
        }
    }
`

const Home = () => {

    const {questions} = useContext(QuestionsContext)
    const {answers} = useContext(AnswersContext)
    const [filter, setFilter] = useState("")

    return ( 
        <StyledMain>
            <div className="main-container">
                <div className="header-filter">
                    <div className="header">
                        <h1>All Questions</h1>
                        <Link to="/askQuestion"><button>Ask question</button></Link>
                    </div>
                    <div className="filter">
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            setFilter(e.target.elements[0].value) 
                        }}>
                            <select>
                                <option value="allQuestions">All questions</option>
                                <option value="answered">Answered questions</option>
                                <option value="notAnswered">Not answered questions</option>
                            </select>
                            <input type="submit" value={"Filter"} />
                        </form>
                    </div>
                </div>
                <div className="questions">
                    {
                        questions.map(question => {
                            const questionAnswers = answers.filter(answer => answer.questionId.toString() === question.id.toString())
                            const questionId = answers.map(answer => answer.questionId)
                            if(filter === 'answered'){
                                if(questionId.includes(question.id)){
                                    return (<Question 
                                        key={question.id}
                                        question = {question}
                                        questionAnswers = {questionAnswers}
                                    />)
                                }
                            }
                            else if(filter === "notAnswered"){
                                if(!questionId.includes(question.id)){
                                    return (<Question 
                                        key={question.id}
                                        question = {question}
                                        questionAnswers = {questionAnswers}
                                    />)
                                }
                            }
                            else if(filter === "allQuestions" || filter === ""){
                                return (<Question 
                                    key={question.id}
                                    question = {question}
                                    questionAnswers = {questionAnswers}
                                />)
                            }
                        }
                            )
                    }
                </div>

            </div>
        </StyledMain>
     );
}
 
export default Home;