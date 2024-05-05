import axios from 'axios';

//get all user word by userId
//!build in server 
// export const getAllUserWordByUserId = async (user_id: string) => {
    export const getAllUserWord = async () => {
    try {
        const response = await axios.get('/api/userWords/get-user-words');
        const { ok, results } = response.data;
        console.log("At getAllUserWordByUserId the results:", results)

         if (ok) {
            return results;
        } else {
            console.error("Error retrieving words:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
};

// get-random-9-user-words
//get array of 9 words
// userId in cookie
//! fix on server
export const getRandomNineUserWordByUserId = async () => {
    try {
        const response = await axios.get(`/api/userWords/get-user-words`);
        const { ok, results } = response.data;
        console.log("At getRandomNineUserWordByUserId the results:", results)

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
//!fix at server
export const addWord = async (en_word: string, he_word: string) => {
    try {
        const response = await axios.post(`/api/words/add-word}`, {en_word, he_word});
        const { ok, results } = response.data;
        console.log("At addWord the results:", results)
        if (ok) {
           return results
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
