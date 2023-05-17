import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from 'yup'
import {v4 as generateId} from 'uuid'
import UsersContext from "../../contexts/UsersContext";
import { useContext } from "react";


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

    const navigate = useNavigate()

    const {currentUser, setCurrentUser, users, validUser, setValidUser} = useContext(UsersContext)

    const values = {
        username: "",
        password: ""
    }

    const validationSchema = yup.object({
        username: yup.string()
        .required('Please enter your username')
        .min(4, "Username should be atleast 4 symbols")
        .max(20, "User name shouldn't be longer than 20 symbols"),
       password: yup.string()
        .matches(
           /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/,
           "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
         )
         .required('Please enter your password')
    })

    const formik = useFormik({
        initialValues: values,
        validationSchema: validationSchema,
        onSubmit: (values, {resetForm}) => {
            const loggedInUser = users.find(user => values.username === user.username && values.password == user.password)
            if(loggedInUser){
                setCurrentUser(loggedInUser)
                setValidUser(false)
                navigate('/home')
            }
            else {
                setValidUser(true)
                resetForm()
                setTimeout(() => {
                    setValidUser(false);
                }, 10000);
            }
        }
    })

    return ( 
        <StyledMain>
            <div>
                <h1>Login</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input 
                        type="text" 
                        name="username" 
                        id="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                        {
                            (formik.touched.username && formik.errors.username) &&
                            <p style={{color: "tomato", textAlign:"center"}}>{formik.errors.username}</p>
                        }
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        name="password" 
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        />
                        {
                            (formik.touched.password && formik.errors.password) &&
                            <p style={{color: "tomato", textAlign:"center"}}>{formik.errors.password}</p>
                        }
                    </div>
                    <input type="submit" value={"Login"} />
                </form>
                {
                    validUser && 
                    <>
                    <p style={{color:"tomato", fontSize: "1rem"}}>Username or password is not valid</p>
                    <p style={{color:"tomato", fontSize: "1rem"}}>Please provide valid username and password</p>
                    </>
                }
            </div>
            <p>Dont have an account yet ? <Link to="/register">Register</Link></p>
        </StyledMain>
     );
}
 
export default Login;