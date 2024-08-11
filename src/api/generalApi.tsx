import axios from "axios";
import { deleteUserWordById } from "./wordApi";

export const deleteDataById = async (serverUrl: string, data: any) => {
    try {
        const response = deleteUserWordById(serverUrl, data)
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

export const updateDataById = async (serverUrl: string, data_id:string ,field: string, update:string | number) => {
    try {
        const response = await axios.patch(`${serverUrl}/api/books/"${data_id}"`, {field, update});
        const { ok, results } = response.data;

        if (ok) {
           return results
        } else {
            console.error("Error retrieving data:", response.data.error);
        }
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
};