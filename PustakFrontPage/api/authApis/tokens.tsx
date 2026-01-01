import AsyncStorage from "@react-native-async-storage/async-storage";

export const setTokens = async (access: any, refresh: any) => {
  await AsyncStorage.setItem("access", access);
  await AsyncStorage.setItem("refresh", refresh);
};

export const getAccess = async () => {
  return await AsyncStorage.getItem("access");
};

export const getRefresh = async () => {
  return await AsyncStorage.getItem("refresh");
};

export const clearTokens = async () => {
  await AsyncStorage.clear();
};
