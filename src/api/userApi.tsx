// logout
import axios from "axios";
import Cookies from 'js-cookie';

//register
export const register = async (serverUrl: string, userName: string, email: string, password: string) => {
    try {
        if (!password || !userName || !email) throw new Error("please provide a valid username and password to register");
        const response = await axios.post(`${serverUrl}/api/users/register`, { userName, email, password})
        console.log("at user-api register response from server is:", response.data.ok)
        if (!response.data.ok){
            alert("This username is already exist, sign-in or choose a different username")
            throw new Error(response.data);  
        }
        return response.data
        
    } catch (error) {
        console.error(error)
    }
} //work ok

//logIn
export const login = async (serverUrl: string, userName: string, email:string, password: string) => {
    try {
        if ( !userName || !password || !email) throw new Error("please provide a valid username and password to login");
        const response = await axios.post(`${serverUrl}/api/users/login`, {userName, email, password}, { withCredentials: true })
        console.log("at user-api login response from server is:", response)
        return response.data

        //return "ok: true" from server and userID encoded in cookie
    } catch (error) {
        console.error(error)
    }
} //work ok

//get user name
//!fix on server
//!unnecessary
// export const getUserName = async () => {
//     try {
//         const result = await axios.get(`/api/users/getUser`)
//         return result
//     } catch (error) {
//         console.error(error)
//     }
// }

//logOut
export const logout = () => {
    Cookies.remove('user')
    return true
}

//get user high scores
//userId is in cookie
export const getUserHighScore = async (serverUrl: string) => {
    try {
        const result = await axios.get(`${serverUrl}/api/users/getUserHighScore`, { withCredentials: true })  // get from server: { ok: true, highScore: userDB.highScore }
        console.log("at userApi/getUserHighScore the result:", result)
        if (!result) throw new Error("at userApi/getUserHighScore there was no result from server");
        console.log("at userApi/getUserHighScore the result.data.highScore:", result.data.highScore)
        
        if (result.data.ok)
            return result.data.highScore
    } catch (error) {
        console.error(error, "at userApi/getUserHighScore there was a catch error")
    }
}

//get-highest-score //!need to bield the fun' in server-side using userId from cookie
// export const saveUserScore = async () => {
//     try {
//         const result = await axios.post(`/api/users/`)
//         return result
//     } catch (error) {
//         console.error(error)
//     }
// }

export const recoveryEmail = async ({serverUrl,email} : {serverUrl: string, email: string}) => {
    try {
        if (!email) throw new Error("please provide a valid email");
        const recipient_email = email 
        console.log("at recoveryEmail response from recipient_email is:", recipient_email)

        const response = await axios.post(`${serverUrl}/send_recovery_email`, { recipient_email})
        console.log("at recoveryEmail response from server is:", response.data)
        if (!response.data.ok){
            alert("This username is already exist, sign-in or choose a different username")
            throw new Error(response.data);  
        }
        return response.data
        
    } catch (error) {
        console.error(error)
    }
}