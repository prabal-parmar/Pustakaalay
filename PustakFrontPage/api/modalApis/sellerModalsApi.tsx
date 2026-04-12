import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../authApis/api";

const getUsername = async () => {
    const username = await AsyncStorage.getItem("username");
    if (username){
        return username.toLowerCase();
    }
    return ""
}

export const fetchBookDataById = async (id: string) => {
    try {
        const username = await getUsername();
        if (!username){
            throw new Error("Unable to fetch username!")
        }
        const response = await api.get(`/seller/books/${username}/${id}`)

        return [response.data.message, response.data.data, response.data.completed]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null, false]
    }
}

export const fetchSellerMyBookData = async (book_id: string) => {
    try {
        const username = await getUsername();
        if (!username){
            throw new Error("Unable to fetch username!")
        }
        const response = await api.get(`/seller/books/mybooks/${username}/${book_id}`)

        return [response.data.message, response.data.data, response.data.completed]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null, false]
    }
}