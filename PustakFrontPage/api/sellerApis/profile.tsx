import {api} from "@/api/authApis/api"
import AsyncStorage from "@react-native-async-storage/async-storage";

const getUsername = async () => {
    const username = await AsyncStorage.getItem("username");
    if (username){
        return username.toLowerCase();
    }
    return ""
}

export const fetchProfileData = async (username: string) => {
    try {
        const response = await api.get('/seller/profile/', {params: {username: username.toLowerCase()}})
        // console.log(response.data.data)
        return response.data.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const fetchSellerBookData = async () => {
    try {
        const username = await getUsername();
        const response = await api.get('/seller/my-all-books/', {params: {username: username.toLowerCase()}})
        // console.log(response.data.allBooks)
        return [response.data.data, response.data.message, response.data.completed]
    } catch (error) {
        console.log(error)
        return [[], "Something went wrong", false]
    }
}