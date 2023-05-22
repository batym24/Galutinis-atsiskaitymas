import styled from "styled-components";
import { useContext } from "react";
import UsersContext from "../../../contexts/UsersContext";
import AnswersContext from "../../../contexts/AnswersContext";
import { Link } from "react-router-dom";



const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    padding: 20px;
    position: relative;

    .user {
        display: flex;
        align-items: center;
        gap: 5px;
        margin: 5px 20px 5px 10px;
        flex: 2;

        img {
            width: 60px;
        }

        span {
            font-weight: 900;
            color: #2e8af3;
        }
    }

    .text {
        flex: 10;
    }
    button {
        background-color: #0a95ff;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
    }

    .delete {
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .update {
        position: absolute;
        right: 75px;
        top: 10px;
    }
    
    .date {
        position: absolute;
        bottom: 5px;
        right: 10px;
        font-style: italic;
        font-size: 0.8rem;
    }
`

const Answer = ({answer}) => {

    const {users, currentUser} = useContext(UsersContext)

    const {setAnswers, ANSWERS_ACTION_TYPE} = useContext(AnswersContext)

    const answerUser = users.find((user) => user.id.toString() === answer.creatorId.toString());

      if (!answerUser) {
        return null; 
      }

    return ( 
        <StyledDiv>
            <div className="user">
                <img src={answerUser.avatarUrl} alt="avatar" />
                <span>{answerUser.username}</span>
            </div>
            <div className="text">
                <p>{answer.answer}</p>
            </div>
            {   currentUser &&
                currentUser.id.toString() === answer.creatorId.toString() &&
                <>
                <button className="delete" onClick={() => setAnswers({
                    type: ANSWERS_ACTION_TYPE.DELETE,
                    id: answer.id
                })}>Delete</button>
                <Link to={`/editAnswer/${answer.id}`}><button className="update">Edit</button></Link>
                {
                    answer.answerIsUpdated &&
                    <span className="date">Updated on : {answer.answerIsUpdated.slice(0, 10)}</span>
                }
                </>
                
            }
        </StyledDiv>
     );
}
 
export default Answer;