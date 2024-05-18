// logout
import axios from "axios";
import Cookies from 'js-cookie';

//register
export const register = async (userName: string, password: string) => {
    try {
        if (!password || !userName) throw new Error("please provide a valid username and password to register");
        const response = await axios.post("/api/users/register", { userName, password})
        console.log("at user-api register response from server is:", response.data.ok)
        if (!response.data.ok){
            alert("chose a different username")
            throw new Error(response.data);
            
        }
        return response.data
        
    } catch (error) {
        console.error(error)
    }
} //work ok

//logIn
export const login = async (userName: string, password: string) => {
    try {
        if ( !userName || !password) throw new Error("please provide a valid username and password to login");
        const response = await axios.post("/api/users/login", {userName, password})
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
export const getUserHighScore = async () => {
    try {
        const result = await axios.get(`/api/users/getUserHighScore`)  // get from server: { ok: true, highScore: userDB.highScore }
        console.log("at userApi/getUserHighScore the result:", result)
        if (!result) throw new Error("at userApi/getUserHighScore there was no result from server");
        console.log("at userApi/getUserHighScore the result.data.highScore:", result.data.highScore)
        
        if (result.data.ok)
            return result.data.highScore
    } catch (error) {
        console.error(error, "at userApi/getUserHighScore there was a catch error")
    }
}

//get-highest-score
//!need to bield the fun' in server-side using userId from cookie
export const saveUserScore = async () => {
    try {
        const result = await axios.post(`/api/users/`)
        return result
    } catch (error) {
        console.error(error)
    }
}
