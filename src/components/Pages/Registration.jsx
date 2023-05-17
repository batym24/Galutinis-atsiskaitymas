import { Link } from "react-router-dom";
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
        height: 560px;
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
    p {
            text-align: center;
            a {
                text-decoration: none;
                color: #0a95ff;
            }
        }
`

const Registration = () => {

    const {users, setUsers, ACTION_TYPE} = useContext(UsersContext)

    const values = {
        username: "",
        email: "",
        password: "",
        passwordRepeat: "",
        avatarUrl: ""
    }

    const validationSchema = yup.object({
        username: yup.string()
         .required('Please provide your username')
         .min(4, "Username should be atleast 4 symbols")
         .max(20, "User name shouldn't be longer than 20 symbols"),
        email: yup.string()
         .email('Please enter valid email')
         .required('Please provide your email'),
        password: yup.string()
         .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
          )
          .required('Please enter valid password'),
        passwordRepeat: yup.mixed()
         .oneOf([yup.ref('password')], 'Passwords must match')
         .required('Please enter valid password'),
        avatarUrl: yup.string()
        .url('This field must be a valid URL')
    })

    const formik = useFormik({
        initialValues: values,
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values)
        }
    })

    return ( 
        <StyledMain>
            <div>
                <h1>Registration</h1>
                <form>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input 
                        type="text" 
                        id="username"
                        name="username"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email" 
                        id="email"
                        name="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        id="password"
                        name="password"
                        />
                    </div>
                    <div>
                        <label htmlFor="passwordRepeat">Repeat password</label>
                        <input 
                        type="password" 
                        id="passwordRepeat"
                        name="passwordRepeat"
                        />
                    </div>
                    <div>
                        <label htmlFor="avatarUrl">Avatar url</label>
                        <input 
                        type="url" 
                        id="avatarUrl"
                        name="avatarUrl"
                        />
                    </div>
                    <input type="submit" value={"Register"} />
                </form>
            </div>
            <p>Already have an acount ? <Link to="/login">Log in</Link></p>
        </StyledMain>
     );
}
 
export default Registration;