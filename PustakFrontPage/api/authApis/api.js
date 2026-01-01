import axios from "axios"
import {getAccess, getRefresh, setTokens, clearTokens} from './tokens'

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api"
});

api.interceptors.request.use(async (config) => {
    const token = await getAccess();
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use((response) => response,
    async (error) => {
        if(error.response?.status === 401){
            try {
                const refresh = await getRefresh();
                const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {refresh});

                await setTokens(refresh.data.access, refresh);

                error.config.headers.Authorization = `Bearer ${response.data.access}`

                return api(error.config);
            } catch (err) {
                await clearTokens();
                return Promise.reject(err)
            }
        }
        return Promise.reject(error)
    })