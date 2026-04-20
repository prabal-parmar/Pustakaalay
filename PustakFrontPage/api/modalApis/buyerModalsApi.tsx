import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../authApis/api";

const getUsername = async () => {
    const username = await AsyncStorage.getItem("username");
    if (username){
        return username.toLowerCase();
    }
    return ""
}

export const fetchBookOrEbookDataById = async (id: string, type: string) => {
    try {
        const username = await getUsername();
        if (!username){
            throw new Error("Unable to fetch username!")
        }
        var response;

        if(type == "Buy"){
            response = await api.get(`/buyer/books/buy/${username}/${id}/`)
            return [response.data.message, response.data.data, response.data.completed]
        }
        else if(type == "Ebook"){
            response = await api.get(`/buyer/books/ebook/${username}/${id}/`)
            return [response.data.message, response.data.data, response.data.completed]
        }
        else if(type == "Exchange"){
            response = await api.get(`/buyer/books/exchange/${username}/${id}/`)
            return [response.data.message, response.data.data, response.data.completed]
        }
        else{
            throw new Error("Wrong type of Book selected!")
        }

    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null, false]
    }
}

export const fetchMyBookEbookExchangeBookById = async (id: string, type: string) => {
    try {
        const username = await getUsername();
        if(!username){
            throw new Error("Unable to fetch username!")
        }
        var response;
        if(type == "selling"){
            response = await api.get(`/buyer/mybooks/my/buy/${id}/`, {params: {username: username}})
            return [response.data.message, response.data.data, response.data.completed]
        }
        else if(type == "library"){
            response = await api.get(`/buyer/mybooks/my/ebook/${id}/`, {params: {username: username}})
            return [response.data.message, response.data.data, response.data.completed]
        }
        else if(type == "exchange"){
            response = await api.get(`/buyer/mybooks/my/exchange/${id}/`, {params: {username: username}})
            return [response.data.message, response.data.data, response.data.completed]
        }
        else{
            throw new Error("Wrong type of Book selected!")
        }
    } catch (error: any) {
        console.log(error.message)
        return ["Something went wrong!", null, false]
    }
}