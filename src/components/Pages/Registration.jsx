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
    min-height: calc(100vh - 100px);

    h1 {
        color: #494848;
    }
    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 3px solid gray;
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
            border: 2px solid gray;
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
    
    .login {
        font-size: 1rem;
    }
`

const Registration = () => {
    const {users, setUsers, ACTION_TYPE, validUser, setValidUser, setCurrentUser} = useContext(UsersContext)
    const navigate = useNavigate()

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
        onSubmit: (values, { resetForm }) => {
            const loggedInUser = users.find(user => values.username === user.username && values.password == user.password)
            const newUser = {
                id: generateId(),
                username: formik.values.username,
                email: formik.values.email,
                password: formik.values.password,
                avatarUrl: formik.values.avatarUrl
            }
            if(newUser.username !== users.find(user => user.username === newUser.username)?.username && newUser.email !== users.find(user => user.email === newUser.email)?.email){
                setUsers({
                    type: ACTION_TYPE.ADD,
                    data: newUser
                })
                setValidUser(false)
                setCurrentUser(loggedInUser)
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
                <h1>Registration</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input 
                        type="text" 
                        id="username"
                        name="username"
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
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                        {
                            (formik.touched.email && formik.errors.email) &&
                            <p style={{color: "tomato", textAlign:"center"}}>{formik.errors.email}</p>
                        }
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                        {
                            (formik.touched.password && formik.errors.password) &&
                            <p style={{color: "tomato", textAlign:"center"}}>{formik.errors.password}</p>
                        }
                    </div>
                    <div>
                        <label htmlFor="passwordRepeat">Repeat password</label>
                        <input 
                        type="password" 
                        id="passwordRepeat"
                        name="passwordRepeat"
                        value={formik.values.passwordRepeat}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                        {
                            (formik.touched.passwordRepeat && formik.errors.passwordRepeat) &&
                            <p style={{color: "tomato", textAlign:"center"}}>{formik.errors.passwordRepeat}</p>
                        }
                    </div>
                    <div>
                        <label htmlFor="avatarUrl">Avatar url</label>
                        <input 
                        type="url" 
                        id="avatarUrl"
                        name="avatarUrl"
                        value={formik.values.avatarUrl}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                        {
                            (formik.touched.avatarUrl && formik.errors.avatarUrl) &&
                            <p style={{color: "tomato", textAlign:"center"}}>{formik.errors.avatarUrl}</p>
                        }
                    </div>
                    <input type="submit" value={"Register"} />
                </form>
                {
                    validUser && 
                    <>
                    <p style={{color:"tomato", fontSize: "1rem"}}>Username or email is already in use</p>
                    <p style={{color:"tomato", fontSize: "1rem"}}>Please provide other username or email</p>
                    </>
                }
            </div>
            <p className="login">Already have an acount ? <Link to="/login">Log in</Link></p>
        </StyledMain>
     );
}
 
export default Registration;