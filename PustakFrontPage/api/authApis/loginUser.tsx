import axios from "axios";
import {setTokens, clearTokens} from './tokens'

export const loginBuyer = async (loginData: any) => {
    try {
        const data = {
            username: loginData.username.trim().toLowerCase(),
            password: loginData.password
        }
        // console.log(data)
        const response = await axios.post('http://127.0.0.1:8000/api/login-buyer/', data)
        await setTokens(response.data.access, response.data.refresh);

        return [response.data.completed, response.data.message]
    } catch (error) {
        console.log(error)
        return [false, "Something went wrong"]
    }
}

export const loginSeller = async (loginData: any) => {
    try {
        const data = {
            username: loginData.username.trim().toLowerCase(),
            password: loginData.password
        }
        const response = await axios.post('http://127.0.0.1:8000/api/login-seller/', data)
        await setTokens(response.data.access, response.data.refresh);

        return [response.data.completed, response.data.message];
    } catch (error) {
        console.log(error)
        return [false, "Something went wrong"]
    }
}

export const logout = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/logout/');
        await clearTokens();
        return [response.data.completed, response.data.message]
    } catch (error) {
        console.log(error)
        return [false, "Something went wrong"]
    }
}