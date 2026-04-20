import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../authApis/api";

const getUsername = async () => {
    const username = await AsyncStorage.getItem("username");
    if (username){
        return username.toLowerCase();
    }
    return ""
}
export const fetchBuyerProfileData = async (username: string) => {
    try {
        const response = await api.get('/buyer/profile/', {params: {username: username.toLowerCase()}})

        return [response.data.message, response.data.data]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null];
    }
}

export const fetchBuyerTradeHistory = async () => {
    try {
        const username = await getUsername();
        if (!username){
            throw new Error("Unable to fetch username!")
        }
        const response = await api.get('/buyer/trade-history/', {params: {username: username}})

        return [response.data.message, response.data.data, response.data.completed]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null, false];
    }
}

export const fetchAllLikedBooksData = async () => {
    try {
        const username = await getUsername();
        if (!username){
            throw new Error("Unable to fetch username!")
        }
        const response = await api.get('/buyer/books/all-liked-books/', {params: {username: username}});

        return [response.data.message, response.data.data, response.data.completed]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null, false];
    }
}