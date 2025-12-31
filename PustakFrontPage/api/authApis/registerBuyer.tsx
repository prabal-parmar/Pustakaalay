import axios from "axios";

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

const checkFirstName = (name: string) => {
    if(!name.trim()){
        return false;
    }
    return true;
}

const checkContact = (mobile: string) => {
    const mobileRegex = /^[6-9]\d{9}$/
    
    return mobileRegex.test(mobile);
}

export const registerBuyer = async (buyerData: any) => {
    try {
        if(!checkEmail(buyerData.email) &&
            !checkPassword(buyerData.password) &&
            !checkUsername(buyerData.username) &&
            !checkFirstName(buyerData.first_name) &&
            !checkContact(buyerData.mobile)){
                return [false, "Invalid Input"]
            }
        
        const data = {
            first_name: buyerData.first_name.trim(),
            last_name: buyerData.last_name.trim(),
            email: buyerData.email.toLowerCase(),
            age: buyerData.age,
            gender: buyerData.gender.toLowerCase(),
            username: buyerData.username.toLowerCase(),
            password: buyerData.password,
            city: buyerData.city,
            contact_number: buyerData.mobile
        }
        const response = await axios.post('http://127.0.0.1:8000/api/register-buyer/', data)

        return [response.data.completed, response.data.message]

    } catch (error) {
        console.log(error)
        return [false, "Something went wrong"]
    }
}