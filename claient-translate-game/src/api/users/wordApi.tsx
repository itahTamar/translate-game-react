import axios from 'axios';
import { WordObject } from './../../types/words';

//get all user word by userId
//userId in cookie
export const getAllUserWord = async () => {
    try {
        const response = await axios.get('/api/userWords/getAllUsersWords');
        console.log("At getAllUserWordByUserId the response:", response)
        const { ok, words } = response.data;
        console.log("At getAllUserWordByUserId the results:", words)

         if (ok) {
            const wordsArray = response.data.words.map((item: WordObject) => item.word);
            console.log("At getAllUserWordByUserId the wordsArray:",wordsArray);
            return wordsArray;
        } else {
            console.error("Error retrieving words:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
}; //work ok

//get-random-X-user-words  x=9 at server
//get array of 9 words
// userId in cookie
export const getXRandomUserWordByUserId = async () => {
    try {
        const response = await axios.get(`/api/userWords/getXRandomUserWords`);
        const { ok, results } = response.data;
        console.log("At getXRandomUserWordByUserId the results:", results)

         if (ok) {
            return results;
        } else {
            console.error("Error retrieving words:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
};

//add word (userId in cookie)
//fixed at server
export const addWord = async (en_word: string, he_word: string) => {
    try {
        const response = await axios.post(`/api/words/add-word`, {en_word, he_word});
        console.log("At addWord the results:", response)
        const { ok, words } = response.data;
        if (ok) {
           return words
        } else {
            console.error("Error retrieving words:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
};

//update word by wordID
//!build in server
export const updateWordById = async (word_id:string ,en_word: string, he_word: string ) => {
    try {
        const response = await axios.patch(`/api/words/${word_id}`, {en_word, he_word});
        const { ok, results } = response.data;
        console.log("At updateWordById the results:", results)

        if (ok) {
           return results
        } else {
            console.error("Error retrieving words:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
};

//delete-word by wordID
//!build in server
export const deleteWordById = async (word_id: string) => {
    try {
        const response = await axios.delete(`/API/words/${word_id}`);
        const { ok, results } = response.data;
        console.log("At deleteWordById the results:", results)

        if (ok) {
          
           return results
        } else {
            console.error("Error retrieving words:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
};
