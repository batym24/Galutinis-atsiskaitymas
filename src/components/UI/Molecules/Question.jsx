import { useContext } from "react";
import UsersContext from "../../../contexts/UsersContext";
import styled from "styled-components";


const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;

    > div{
        padding: 10px 30px;
    }

    .votes-answers{
        display: flex;
        flex-direction: column;
    }
    .user {
        display: flex;
        align-items: center;
        gap: 5px;

        img {
            width: 25px;
        }
    }
`
const Question = ({question}) => {

    const {users} = useContext(UsersContext)

    return ( 
        <StyledDiv>
            <div className="votes-answers">
                <span>{question.questionUpvotes} Votes</span>
                <span>Answers</span>
            </div>
            <div className="question-title">
                <h3>{question.title}</h3>
            </div>
            <div className="user">
                <img src={users.find(user => user.id === question.creatorId).avatarUrl} alt="user-avatar" />
                <span>{users.find(user => user.id === question.creatorId).username}</span>
            </div>
        </StyledDiv>
     );
}
 
export default Question;