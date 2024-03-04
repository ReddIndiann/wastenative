import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext,useEffect,useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [userRequests, setUserRequests] = useState([]);
    const [streamToken, setStreamToken] = useState(null);

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
        console.log("Logging in");
        setLoading(true);
        axios.post("http://172.20.10.5:5000/api/auth/login",{email,password})
        .then(res=>{
            const { email, role, token, username,comAssociate ,phone,id,streamToken,lat,long} = res.data;
            console.log("API Response:", res.data);
            const userInfo = { email, role, username,comAssociate,phone,id,lat,long};
            setUserInfo(userInfo);
            setUserToken(token);
            setStreamToken(streamToken);
            console.log('This is the streamToken:',streamToken);
            AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));     
            AsyncStorage.setItem("userToken",token);   
            const userEmail = email;  // Adjust this if the structure is different
            if (userEmail) {
                console.log("user email is parsed")
                fetchUserRequests(userEmail);
            }
        })
        .catch(error => {
            console.error("Login error", error);
        })
        .finally(() => {
            setLoading(false);
        });
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

    const completeRequest = async (requestId,comAssociate) => {
        console.log(requestId)
        try {
            const response = await axios.post("http://172.20.10.5:5000/api/drivers/status", { requestId,comAssociate });
            console.log("Request completed:", response.data);
            // You can add logic here to update your state or UI based on the response
        } catch (error) {
            console.error("Error completing request", error);
        }
    };

    useEffect(() => {
        isLogged();
    }, []);

 return (
    <AuthContext.Provider value={{login,logout,isLoading,userToken,userInfo,userRequests,completeRequest,streamToken}}>
        {children}
    </AuthContext.Provider>
 );
};