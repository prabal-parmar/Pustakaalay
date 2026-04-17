import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../authApis/api";

const getUsername = async () => {
    const username = await AsyncStorage.getItem("username");
    if (username){
        return username.toLowerCase();
    }
    return ""
}

export const fetchBooksEbooksForBuyer = async () => {
    try {
        const username = await getUsername();
        const response = await api.get('/buyer/explore/', {params: {username: username}})

        return [response.data.message, response.data.data, response.data.completed]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null, false]
    }
}

export const toggleBuyerBookLiked = async (id: string, type: string) => {
    try {
        const username = await getUsername();
        const response = await api.put(`/buyer/${type}/${username}/${id}/like/`)

        return [response.data.message, response.data.data, response.data.completed]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null, false]
    }
}