import axios from "axios"

export const API_URL = "https://the-trivia-api.com/api"

export const getCategories = async () => {
    return await axios(`${API_URL}/categories`)
}