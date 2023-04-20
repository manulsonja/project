import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) =>  {
    
    let [authToken, setAuthToken ] = useState(localStorage.getItem("access_token") ? localStorage.getItem("access_token"): null);
    let [user, setUser ] = useState(localStorage.getItem("access_token") ? jwt_decode(localStorage.getItem("access_token")): null);
    

    return(
        <AuthContext.Provider value={{"name":user}}>
            {children}
        </AuthContext.Provider>
    )
}