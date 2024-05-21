import { deleteUserWordById } from "./wordApi";

export const deleteDataById = async (data: any) => {
    try {
        const response = deleteUserWordById(data)
        console.log("At deleteDataById the response:", response)

        if (response) {
           return response
        } else {
            console.error("Error retrieving data:");
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
};