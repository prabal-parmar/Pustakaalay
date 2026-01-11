import {api} from "@/api/authApis/api"

export const fetchProfileData = async (username: string) => {
    try {
        const response = await api.get('/seller/profile/', {params: {username: username.toLowerCase()}})
        // console.log(response.data.data)
        return response.data.data
    } catch (error) {
        console.log(error)
        return null
    }
}