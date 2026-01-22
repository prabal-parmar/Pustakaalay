import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../authApis/api";

export const fetchBuyerSellBooksData = async () => {
    try {
        const username = await AsyncStorage.getItem("username");
        const response = await api.get('/buyer/my-sell-books/', {params: {username: username?.toLowerCase()}})

        return [response.data.message, response.data.data, true];
    } catch (error) {
        console.log(error);
        return ["Something went wrong!" ,null ,false]
    }
}