import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../authApis/api";

const getUsername = async () => {
    const username = await AsyncStorage.getItem("username");
    if (username){
        return username.toLowerCase();
    }
    return ""
}

export const fetchMyRecentInventoryData = async () => {
    try {
        const username = await getUsername();
        const response = await api.get('/seller/my-inventory/', {params: {username: username}})

        return [response.data.message, response.data.data, response.data.completed]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null, false]
    }
}

export const fetchRecentBuyBookRequestData = async () => {
    try {
        const username = await getUsername()
        const response = await api.get(`/seller/books-request/${username}`)

        return [response.data.message, response.data.data, response.data.completed]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null, false]
    }
}