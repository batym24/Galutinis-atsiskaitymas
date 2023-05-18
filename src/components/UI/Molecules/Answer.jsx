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

    .user {
        display: flex;
        align-items: center;
        gap: 5px;
        margin: 5px 20px 5px 10px;

        img {
            width: 60px;
        }

        span {
            font-weight: 900;
            color: #2e8af3;
        }
    }
`

const Answer = ({answer}) => {

    const {users} = useContext(UsersContext)

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
            <div>
                <p>{answer.answer}</p>
            </div>
        </StyledDiv>
     );
}
 
export default Answer;