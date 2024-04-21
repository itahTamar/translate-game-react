// logout
import axios from "axios";
import Cookies from 'js-cookie';

//register
export const register = async (username: string, password: string) => {
    try {
        if (!password || !username) throw new Error("please provide a valid username and password to register");
        return await axios.post("/api/users/register", { username, password})
        
    } catch (error) {
        console.error(error)
    }
} //

//logIn
export const login = async (username: string, password: string) => {
    try {
        if ( !username || !password) throw new Error("please provide a valid username and password to login");
        return await axios.post("/api/users/login", {username, password})
        //return "ok" from server and userID encoded in cookie
    } catch (error) {
        console.error(error)
    }
} //

//get user name
//!fix on server
export const getUserName = async () => {
    try {
        const result = await axios.get(`/api/users/getUser`)
        return result
    } catch (error) {
        console.error(error)
    }
}

//logOut
export const logout = () => {
    Cookies.remove('user')
    return true
}

//get-scores
//!need to bield the fun' in server-side
//userId is in cookie
export const getUserScores = async () => {
    try {
        const result = await axios.get(`/api/users/getUserScores`)
        return result
    } catch (error) {
        console.error(error)
    }
}

//get-highest-score
//!need to bield the fun' in server-side using userId from cookie
export const getHighestUserScores = async () => {
    try {
        const result = await axios.get(`/api/users/getHighestUserScores`)
        return result
    } catch (error) {
        console.error(error)
    }
}
