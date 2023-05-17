import { createContext, useReducer, useEffect, useState } from "react";

const UsersContext = createContext()

const ACTION_TYPE = {
    GET: 'getAllUsers'
}

const reducer = (state, action) => {
    switch(action.type){
        case ACTION_TYPE.GET:
            return action.data
    }
}

const UsersProvider = ({children}) => {

    const [users, setUsers] = useReducer(reducer, [])

    useEffect(() => {
        fetch('http://localhost:8080/user')
        .then(res => res.json())
        .then(data => setUsers({
            type: ACTION_TYPE.GET,
            data: data
        }))
    }, [])

    console.log(users)

    return ( 
        <UsersContext.Provider
            value={{

            }}
        >
            {children}
        </UsersContext.Provider>
     );
}
 
export {UsersProvider};
export default UsersContext