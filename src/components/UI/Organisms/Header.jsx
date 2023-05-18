import styled from "styled-components";
import { Link } from "react-router-dom";

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

    .logo {
        img {
            width: 150px;
        }
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

    }
`

const Header = () => {
    return ( 
        <StyledHeader>
            <div className="logo">
                <Link to="/home"><img src="https://www.vectorlogo.zone/logos/stackoverflow/stackoverflow-ar21.png" alt="logo" /></Link>
            </div>
            <div className="register-login">
                <Link to='/login'><button className="login">Login</button></Link>
                <Link to='/register'><button className="register">Register</button></Link>
            </div>
        </StyledHeader>
     );
}
 
export default Header;