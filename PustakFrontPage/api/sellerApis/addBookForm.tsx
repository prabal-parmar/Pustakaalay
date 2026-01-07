import { api } from "../authApis/api";

export const addBookData = async (data: any) => {
    try {
        const formData = {
            title: data.title.toLowerCase(),
            author: data.author.toLowerCase(),
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            category: data.genre,
            educational_content: data.isEducational,
            condition: "new"
        }
        const response = await api.post('/seller/add-book/', formData);
        return [response.data.message, response.data.completed]

    } catch (error) {
        console.log(error)
        return ["Something went wrong", false]
    }
}