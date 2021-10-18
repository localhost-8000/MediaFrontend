import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

var INITIAL_STATE = {
    user: null,
    isGglLoading: false,
    isFbLoading: false,
    error: false
};

if(sessionStorage.getItem("userData")) {
    INITIAL_STATE = {
        user: JSON.parse(sessionStorage.getItem("userData")),
        isGglLoading: false,
        isFbLoading: false,
        error: false
    }
}

export const AuthContext = createContext(INITIAL_STATE);


export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    return (
        <AuthContext.Provider 
            value={{
                user: state.user, 
                isGglLoading: state.isGglLoading, 
                isFbLoading: state.isFbLoading, 
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}