import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: rgba(156,150,150,0.75);
    box-shadow: 1px 2px 14px 2px rgba(156,150,150,0.75);
    -webkit-box-shadow: 1px 2px 14px 2px rgba(156,150,150,0.75);
    -moz-box-shadow: 1px 2px 14px 2px rgba(156,150,150,0.75);
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
                <img src="https://www.vectorlogo.zone/logos/stackoverflow/stackoverflow-ar21.png" alt="logo" />
            </div>
            <div className="register-login">
                <Link to='/login'><button className="login">Login</button></Link>
                <Link to='/register'><button className="register">Register</button></Link>
            </div>
        </StyledHeader>
     );
}
 
export default Header;