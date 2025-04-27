import axios from 'axios';

import {
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
    useMemo
} from 'react';

//Create Auth Context
const AuthContext = createContext();


//Create the AuthProvider

const AuthProvider = ({children}) => {
    //token state
    const [token, setToken] = useState(localStorage.getItem('token'));

    //functions to change token
    const changeToken = (token) => {
        setToken(token);
    };

    //useEffect
    useEffect(() => {
        if(token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token');
        }
    }, [token]);

    //Memo for the context value
    const contextValue = useMemo(
        () => ({
            token, 
            changeToken,
        }), [token]
    );

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}


//Exports

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider;
