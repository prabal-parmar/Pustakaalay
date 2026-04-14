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
