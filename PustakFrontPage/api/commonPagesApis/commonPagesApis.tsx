import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../authApis/api";

const getUsername = async () => {
    const username = await AsyncStorage.getItem("username");
    if (username){
        return username.toLowerCase();
    }
    return ""
}

export const getUserDetails = async () => {
    try {
        const username = await getUsername();
        if (!username){
            throw new Error("Unable to fetch username!")
        }
        const response = await api.get('user-detail/', {params: {username: username}})

        return [response.data.message, response.data.completed, response.data.data]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", false, null]
    }
}