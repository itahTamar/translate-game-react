import axios from 'axios';
import { WordObject } from './../types/words';

//get all user word by userId
//userId in cookie
export const getAllUserWord = async () => {
    try {
        const response = await axios.get('/api/userWords/getAllUsersWords');
        console.log("At getAllUserWordByUserId the response:", response)
        const { ok, words } = response.data;
        console.log("At getAllUserWordByUserId the results:", words)
        if (ok) {
            return words;
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
        console.log("At getXRandomUserWordByUserId the response:", response)
        console.log("At getXRandomUserWordByUserId the response.data:", response.data)

        const { ok, words } = response.data;
        console.log("At getXRandomUserWordByUserId the words:", words)

         if (ok) {
            return words;  //array of [{_id, en_word, he_word},{}..]
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
        const { ok, words, message } = response.data;
        if (ok) {
           return {words, message}
        } else {
            console.error("Error retrieving words:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
};

//update word by wordID
//build in server
    //old virion
export const updateWordById = async (word_id:string ,en_word: string, he_word: string ) => {
    try {
        const response = await axios.patch(`/api/words/updateWord/${word_id}`, {en_word, he_word});
        console.log("At updateWordById the response:", response)
        
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
}; //work ok

export const updateWordFieldByWordId = async (words_id:string ,field: string, updateData: string ) => {
    try {
        const response = await axios.patch(`/api/words/updateWordFieldByWordId/${words_id}`, {field, updateData});
        console.log("At updateWordById the response:", response)
        //response = {ok, response, massage, error?}
        const { ok, results, massage } = response.data;
        console.log("At updateWordFieldByWordId the results:", results)

        if (ok) {
           return {results, massage}
        } else {
            console.error("Error retrieving words:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
};

//delete-word by wordID
//build in server
export const deleteUserWordById = async (word_id: string) => {
    try {
        const response = await axios.delete(`/api/userWords/deleteUserWord/${word_id}`);
        console.log("At deleteWordById the response:", response)

        if (response.data.ok) {
           return response.data
        } else {
            console.error("Error retrieving words:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
};
