import { createContext, useReducer, useEffect, useState } from "react";

const UsersContext = createContext()

const ACTION_TYPE = {
    GET: 'getAllUsers',
    ADD: 'addNewUser'
}

const reducer = (state, action) => {
    switch(action.type){
        case ACTION_TYPE.GET:
            return action.data
        case ACTION_TYPE.ADD:
            fetch('http://localhost:8080/user', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(action.data)
            })
            return [...state, action.data]
        
    }
}

const UsersProvider = ({children}) => {

    const [users, setUsers] = useReducer(reducer, [])

    const [currentUser, setCurrentUser] = useState(null)

    const [validUser, setValidUser] = useState(false)

    useEffect(() => {
        fetch('http://localhost:8080/user')
        .then(res => res.json())
        .then(data => setUsers({
            type: ACTION_TYPE.GET,
            data: data
        }))
    }, [])

    return ( 
        <UsersContext.Provider
            value={{
                users,
                setUsers,
                ACTION_TYPE,
                setValidUser,
                validUser,
                currentUser,
                setCurrentUser
            }}
        >
            {children}
        </UsersContext.Provider>
     );
}
 
export {UsersProvider};
export default UsersContext