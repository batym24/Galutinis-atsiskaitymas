import { useContext } from "react";
import UsersContext from "../../../contexts/UsersContext";
import styled from "styled-components";
import { Link } from "react-router-dom";


const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    padding: 20px;

    a {
        text-decoration: none;
    }

    h3 {
        color: #0063bf;
    }

    > div{
        padding: 10px 30px;
    }

    .votes-answers{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .user {
        display: flex;
        align-items: center;
        gap: 15px;

        img {
            width: 25px;
        }

        [alt] {
            font-size: 0.6rem;
        }
    }
    .question-title {
        align-self: flex-start;
    }

    .user {
        width: 100px;
    }
`
const Question = ({question, questionAnswers}) => {
    
    const {users} = useContext(UsersContext)


    return ( 
        <StyledDiv>
            <div className="votes-answers">
                <span>{question.questionUpvotes} Votes</span>
                <span>{[...questionAnswers].length} Answers</span>
            </div>
            <div className="question-title">
                <Link to={`/question/${question.id}`}><h3>{question.title}</h3></Link>
            </div>
            <div className="user">
                <img src={users.find(user => user.id === question.creatorId)?.avatarUrl} alt="user-avatar" />
                <span>{users.find(user => user.id === question.creatorId).username}</span>
            </div>
        </StyledDiv>
     );
}
 
export default Question;