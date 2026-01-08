import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../authApis/api";

export const addBookData = async (data: any) => {
    try {
        const username = await AsyncStorage.getItem("username");
        const formData = {
            name: data.title.toLowerCase(),
            author: data.author.toLowerCase(),
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            category: data.type.toLowerCase(),
            educational_content: data.isEducational,
            condition: data.condition.toLowerCase(),
            username: username?.toLowerCase()
        }
        console.log(formData)
        const response = await api.post('/seller/add-book/', formData);
        return [response.data.message, response.data.completed]

    } catch (error) {
        console.log(error)
        return ["Something went wrong", false]
    }
}