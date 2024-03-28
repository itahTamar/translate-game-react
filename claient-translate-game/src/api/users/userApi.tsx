// logout
import axios from "axios";
import Cookies from 'js-cookie';

//register
export const register = async (username: string, password: string) => {
    try {
        if (!password || !username) throw new Error("please provide a valid username and password to register");
        return await axios.post("/API/users/register", { username, password})
        
    } catch (error) {
        console.error(error)
    }
} //

//logIn
export const login = async (username: string, password: string) => {
    try {
        if ( !username || !password) throw new Error("please provide a valid username and password to login");
        return await axios.post("/API/users/login", {username, password})
        
    } catch (error) {
        console.error(error)
    }
} //

//logOut
export const logout = () => {
    Cookies.remove('user')
    return true
}

//get-scores
//!need to bield the fun' in server-side
export const getUserScores = async (userId: number) => {
    try {
       if (!userId) throw new Error("no userId in getUserScores");
        const result = await axios.get(`/API/users/getUserScores/${userId}`)
        return result
    } catch (error) {
        console.error(error)
    }
}

//get-highest-score
//!need to bield the fun' in server-side
export const getHighestUserScores = async (userId: number) => {
    try {
       if (!userId) throw new Error("no userId in getHighestUserScores");
        const result = await axios.get(`/API/users/getHighestUserScores/${userId}`)
        return result
    } catch (error) {
        console.error(error)
    }
}
