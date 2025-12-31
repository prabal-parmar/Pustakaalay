import axios from "axios"

const checkName = (name: string) => {
    if(!name.trim() && name.trim().length < 5){
        return false;
    }
    return true;
}

const checkEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

const checkPassword = (password: string) => {
    if(password.length < 5){
        return false;
    }
    return true;
}

const checkUsername = (username: string) => {
    if(username.trim().length >= 5){
        return true;
    }
    return false;
}

export const registerSeller = async (sellerData: any) => {
    try {
        if(!checkName(sellerData.name) && 
            !checkEmail(sellerData.email) && 
            !checkPassword(sellerData.password) && 
            !checkUsername(sellerData.username)){

            return [false, "Invalid Input"]
        }

        const data = {
            name: sellerData.name,
            email: sellerData.email.toLowerCase(),
            username: sellerData.username.toLowerCase(),
            password: sellerData.password,
            sellertype: sellerData.sellerType.toLowerCase(),
            location: sellerData.location,
        }

        const request = await axios.post('http://127.0.0.1:8000/api/register-seller/', data)

        return [request.data.completed, request.data.message]
    } catch (error) {
        console.log(error)
        return [false, "Something went wrong"];
    }
}