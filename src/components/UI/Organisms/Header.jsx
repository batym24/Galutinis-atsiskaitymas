import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UsersContext from "../../../contexts/UsersContext";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    border-bottom: #babfc4;
    background-color: white;
    box-shadow: 1px 2px 14px 2px rgba(10, 10, 10, 0.75);
    -webkit-box-shadow: 1px 2px 14px 2px rgba(22, 22, 22, 0.75);
    -moz-box-shadow: 1px 2px 14px 2px rgba(26, 25, 25, 0.75);
    > div {
        margin: 10px 100px;
    }
    h1 {
        font-family: 'Rubik Puddles', cursive;
        color: #0091ff;
        font-size: 3rem;
    }

    a {
        text-decoration: none;
    }

    .register-login {

        button {
            cursor: pointer;
            padding: 10px 30px;
            border-radius: 3px;
            font-size: 0.9rem;
        }

        .login {
            background-color: #e1ecf4;
            color: #39739d;
            border: 1px solid #7aa7c7;
            margin: 0 10px;
        }

        .login:hover {
            background-color: #b4d9f3;
        }

        .register {
            background-color: #0a95ff;
            color: white;
            border: none;
            border-top: 1px solid #6cc0ff;
        }

        .register:hover {
            background-color: #056fc0;
        }

        .user {
            display: flex;
            align-items: center;
            gap: 10px;
            border: 1px solid gray;
            border-radius: 3px;
            padding: 10px;
            background-color: #ececec;

            img {
                width: 40px;
            }

            button {
                background-color: #0a95ff;
                color: white;
                border-radius: 3px;
                border: none;
            }
        }
    }
`

const Header = () => {

    const {currentUser, setCurrentUser} = useContext(UsersContext)

    return ( 
        <StyledHeader>
            <div className="logo">
                <Link to="/"><h1>QuestionAir(e)</h1></Link>
            </div>
            <div className="register-login">
                {
                    currentUser ?
                    <div className="user">
                        <img src= {currentUser.avatarUrl} alt="avatar" />
                        <span>{currentUser.username}</span>
                        <button onClick={() => setCurrentUser(false)}>Log Out</button>
                    </div> :
                    <>
                        <Link to='/login'><button className="login">Login</button></Link>
                        <Link to='/register'><button className="register">Register</button></Link>
                    </>
                }
            </div>
        </StyledHeader>
     );
}
 
export default Header;