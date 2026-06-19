import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../authApis/api";

const getUsername = async () => {
    const username = await AsyncStorage.getItem("username");
    if (username){
        return username.toLowerCase();
    }
    return ""
}

export const fetchHotEbooksData = async () => {
    try {
        const username = await getUsername();
        if (!username){
            throw new Error("Unable to fetch username!")
        }
        const response = await api.get('/buyer/hot-picks/', {params: {username: username}})
        
        return [response.data.message, response.data.data, response.data.completed]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null, false]
    }
}

export const fetchLocalExchangeData = async () => {
    try {
        const username = await getUsername();
        if (!username){
            throw new Error("Unable to fetch username!")
        }
        const response = await api.get('/buyer/rec-exchange/', {params: {username: username}})

        return [response.data.message, response.data.data, response.data.completed]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null, false]
    }
}

export const fetchBuyBookRequests = async () => {
    try {
        const username = await getUsername();
        if (!username){
            throw new Error("Unable to fetch username!")
        }
        const response = await api.get('/buyer/books/buy-request/', {params: {username: username}})

        return [response.data.message, response.data.data, response.data.completed]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null, false]
    }
}