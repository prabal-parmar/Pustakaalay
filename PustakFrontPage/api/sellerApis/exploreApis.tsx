import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../authApis/api";

const getUsername = async () => {
  const username = await AsyncStorage.getItem("username");
  if (username) {
    return username.toLowerCase();
  }
  return "";
};

export const fetchExploreBooksData = async () => {
  try {
    const username = await getUsername();

    if (!username) {
      throw new Error("Unable to fetch username!");
    }
    const response = await api.get("/seller/explore/", {
      params: { username: username },
    });

    return [response.data.message, response.data.data, response.data.completed];
  } catch (error) {
    console.error(error);
    return ["Something went wrong!", null, false];
  }
};

export const toggleBookLiked = async (book_id: string) => {
    try {
        const username = await getUsername();

        if (!username){
            throw new Error("Unable to fetch username!");
        }
        const response = await api.put(`/seller/books/${username}/${book_id}/like/`)

        return [response.data.message, response.data.data, response.data.completed]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null, false];
    }
}

export const toggleBookSaved = async (book_id: string) => {
    try {
        const username = await getUsername();

        if (!username){
            throw new Error("Unable to fetch username!");
        }
        const response = await api.put(`/seller/books/${username}/${book_id}/save/`)

        return [response.data.message, response.data.data, response.data.completed]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null, false];
    }
}

export const sendBuyBookRequestSeller = async (id: string, price: string) => {
    try {
        const username = await getUsername();
        const response = await api.post(`/seller/book/buy-book/`, {username: username, 
                                                                    book_id: id, 
                                                                    price: price})

        return [response.data.message, response.data.data, response.data.completed]
    } catch (error) {
        console.log(error)
        return ["Something went wrong!", null, false]
    }
}
