import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../authApis/api";

export const fetchAllBooksOfSeller = async () => {
    try {
        const username = await AsyncStorage.getItem("username");
        const response = await api.get('/seller/my-all-books/', {params: {username: username?.toLowerCase()}})
        // console.log(response.data)
        return [response.data.allBooks, response.data.message, response.data.completed]
    } catch (error) {
        console.log(error)
        return [[], "Something went wrong", false]
    }
}