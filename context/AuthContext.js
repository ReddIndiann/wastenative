import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext,useEffect,useState } from "react";
import axios from "axios";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [userRequests, setUserRequests] = useState([]);


    const fetchUserRequests = (email) => {
        axios.get(`http://172.20.10.5:5000/api/request/userhistory?author=${email}`)
            .then(res => {
                // Handle the response containing the requests
                console.log("User requests:", res.data);
                setUserRequests(res.data);
            })
            .catch(error => {
                console.error("Error fetching user requests", error);
            });
    }

   

    const login = (email,password) => {
        setLoading(true);
        axios.post("http://172.20.10.5:5000/api/auth/login",{email,password})
        .then(res=>{
            let userInfo = res.data
            console.log(res.data)
            console.log(userInfo.email)
            setUserInfo(userInfo);
            setUserToken(userInfo.data.token);
            AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));     
            AsyncStorage.setItem("userToken",userInfo.data.token);   
        })
        setUserToken("token");
        AsyncStorage.setItem("userToken", "token");
        setLoading(false);
        const userEmail = userInfo.email; // Assuming the email is directly on the userInfo object
        if (userEmail) {
            fetchUserRequests(userEmail);
        }
    }
    const logout = () => {
        setLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem("userInfo");
        AsyncStorage.removeItem("userToken");
        setLoading(false);
        console.log("logged out")
    }

    const isLogged = async () => {
        try {
            setLoading(true)
            let userInfo = await AsyncStorage.getItem("userInfo");
            let userToken = await AsyncStorage.getItem("userToken");
            userInfo = JSON.parse(userInfo);

            if(userInfo){
                setUserInfo(userInfo);
                setUserToken(userToken);
                console.log(userInfo)
                console.log(userToken)
            }

            setLoading(false);
            
        } catch (error) {
            console.log("log in error")
        }
    }

    useEffect(() => {
        isLogged();
    }, []);

 return (
    <AuthContext.Provider value={{login,logout,isLoading,userToken,userInfo,userRequests}}>
        {children}
    </AuthContext.Provider>
 );
};