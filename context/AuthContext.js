import { createContext,useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const login = () => {
        setLoading(false);
        setUserToken("token");
    }
    const logout = () => {
        setLoading(false);
        setUserToken(null);
    }
 return (
    <AuthContext.Provider value={{login,logout,isLoading,userToken}}>
        {children}
    </AuthContext.Provider>
 );
};