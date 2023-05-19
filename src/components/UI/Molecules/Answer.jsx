import styled from "styled-components";
import { useContext } from "react";
import UsersContext from "../../../contexts/UsersContext";


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
        position: absolute;
        right: 10px;
        top: 10px;
        background-color: #0a95ff;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
    }
`

const Answer = ({answer}) => {

    const {users, currentUser} = useContext(UsersContext)

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
                <button>Delete</button>
            }
        </StyledDiv>
     );
}
 
export default Answer;