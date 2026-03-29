import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../authApis/api";

const getUsername = async () => {
    const username = await AsyncStorage.getItem("username");
    if (username){
        return username.toLowerCase();
    }
    return ""
}

export const fetchBuyerSellBooksData = async () => {
    try {
        const username = await getUsername();
        const response = await api.get('/buyer/my-sell-books/', {params: {username: username?.toLowerCase()}})

        return [response.data.message, response.data.data, true];
    } catch (error) {
        console.log(error);
        return ["Something went wrong!" ,null ,false]
    }
}

export const addBuyerBookToSell = async (data: any) => {
    try {
        const username = await getUsername();
        const formData = {
            username: username?.toLowerCase(),
            name: data.name,
            author: data.author,
            description: data.description,
            price: data.price,
            category: data.category.toLowerCase(),
            genre: data.genre.toLowerCase()
        }
        const response = await api.post('/buyer/sell-book/', formData);

        return [response.data.message, true]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", false]
    }
}

export const addBuyerNewEbook = async (data: any) => {
    try {
        const username = await getUsername();
        const formData = {
            username: username?.toLowerCase(),
            name: data.name,
            author: data.author,
            description: data.description,
            category: data.category.toLowerCase(),
            genre: data.genre.toLowerCase()
        }
        console.log(data)
        const response = await api.post('/buyer/e-book/', formData);
        return [response.data.message, true]
    } catch (error) {
        console.log(error);
        return ["Something went wrong!", false]
    }
}

export const fetchBuyerEbook = async () => {
    try {
        const username = await getUsername();
        const response = await api.get('/buyer/my-ebooks/', {params: {username: username?.toLowerCase()}})

        return [response.data.message, response.data.data, true];
    } catch (error) {
        console.log(error);
        return ["Something went wrong!", null, false]
    }
}

export const checkBuyerSeenEbook = async (ebook_id: string) => {
    try {
        const username = await getUsername();
        const response = await api.get(`/buyer/${username}/ebook/${ebook_id}`)

        return [response.data.message, response.data.data, true]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null, false]
    }
}

export const addExchangeBook = async (bookData: any) => {
    try {
        const username = await getUsername();
        const response = await api.post('/buyer/exchange-book/', {...bookData, username: username});

        return [response.data.message, response.data.data, response.data.completed]
    } catch (error) {
        console.log(error)
        return ["Something went wrong", null, false]
    }
}