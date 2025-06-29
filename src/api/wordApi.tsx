import axios from 'axios';

//get all user word by userId
//userId in cookie
export const getAllUserWord = async (serverUrl: string) => {
    try {
        const response = await axios.get(`${serverUrl}/api/userWords/getAllUsersWords`, { withCredentials: true });
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
export const getXRandomUserWordByUserId = async (serverUrl: string) => {
    try {
        const response = await axios.get(`${serverUrl}/api/userWords/getXRandomUserWords`, { withCredentials: true });
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
export const addWord = async (serverUrl: string, en_word: string, he_word: string) => {
    try {
        const response = await axios.post(`${serverUrl}/api/words/add-word`, {en_word, he_word}, { withCredentials: true });
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
export const updateWordById = async (serverUrl: string, word_id:string ,en_word: string, he_word: string ) => {
    try {
        const response = await axios.patch(`${serverUrl}/api/words/updateWord/${word_id}`, {en_word, he_word}, { withCredentials: true });
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

export const updateWordFieldByWordId = async (serverUrl: string, words_id:string ,field: string, updateData: string ) => {
    try {
        const results = await axios.patch(`${serverUrl}/api/words/updateWordFieldByWordId/${words_id}`, {field, updateData}, { withCredentials: true });
        console.log("At updateWordFieldByWordId the response:", results)
        //response = {ok, response, massage, error?}
        const { ok, response, massage } = results.data;
        console.log("At updateWordFieldByWordId the results:", response)

        if (ok) {
           return {response, massage}
        } else {
            console.error("Error retrieving words:", results.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
};

//delete-word by wordID
//build in server
export const deleteUserWordById = async (serverUrl: string, word_id: string) => {
    try {
        const response = await axios.delete(`${serverUrl}/api/userWords/deleteUserWord/${word_id}`, { withCredentials: true });
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

//delete all user's words
export const deleteAllUserWords = async (serverUrl: string) => {
    try {
        const response = await axios.delete(`${serverUrl}/api/userWords/deleteAllUserWords/`, { withCredentials: true });
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

//import from file
export const importUserWord = async (serverUrl: string, formData: FormData) => {
    try {
        const response = await axios.post(`${serverUrl}/api/userWords/importUserWordsFromCSV`, formData, {
            // headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true, // ✅ Ensure cookies are sent
        });
        console.log("At importUserWord the response:", response)

        if (response.data.ok) {
           return response.data.message
        } else {
            console.error("Error retrieving words at importUserWord:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
};