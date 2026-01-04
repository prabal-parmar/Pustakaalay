import { api } from "../authApis/api";

export const fetchBuyerProfileData = async (username: string) => {
    try {
        const response = await api.get('/buyer/profile/', {params: {username: username.toLowerCase()}})

        return response.data.data
    } catch (error) {
        console.log(error)
        return null
    }
}