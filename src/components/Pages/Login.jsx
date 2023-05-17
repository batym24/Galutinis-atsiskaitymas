import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledMain = styled.main`
        display: flex;
    flex-direction: column;
    background-color: #f1f2f3;
    height: calc(100vh - 100px);
    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 3px solid black;
        border-radius: 10px;
        width: 650px;
        height: 660px;
        margin: 30px auto;
        padding: 20px;
        background-color: white;
        
        form {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px
        }

        form > div {
            display: flex;
            flex-direction: column;
            gap: 5px
        }

        input {
            width: 500px;
            height: 30px;
            border: 2px solid black;
            border-radius: 3px;
        }

        input[type="submit"]{
            margin: 15px auto;
            width: 180px;
            height: auto;
            background-color: #0a95ff;
            color: white;
            border: none;
            border-top: 1px solid #6cc0ff;
            padding: 15px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
        }

    }
    p
     {
            text-align: center;
            margin: 0;
            font-size: 0.65rem;
            a {
                text-decoration: none;
                color: #0a95ff;
            }
        }
`

const Login = () => {
    return ( 
        <StyledMain>
            <div>
                <h1>Login</h1>
                <form>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Username</label>
                        <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        />
                    </div>
                    <input type="submit" value={"Login"} />
                </form>
            </div>
            <p>Dont have an account yet ? <Link to="/register">Register</Link></p>
        </StyledMain>
     );
}
 
export default Login;