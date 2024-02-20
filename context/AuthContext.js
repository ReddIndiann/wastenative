import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext,useEffect,useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const login = () => {
        setLoading(true);
        setUserToken("token");
        AsyncStorage.setItem("userToken", "token");
        setLoading(false);
    }
    const logout = () => {
        setLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem("userToken");
        setLoading(false);
    }

    const isLogged = async () => {
        try {
            setLoading(true)
            let userToken = await AsyncStorage.getItem("userToken");
            setUserToken(userToken);
        } catch (error) {
            console.log("log in error")
        }
    }

    useEffect(() => {
        isLogged();
    }, []);

 return (
    <AuthContext.Provider value={{login,logout,isLoading,userToken}}>
        {children}
    </AuthContext.Provider>
 );
};