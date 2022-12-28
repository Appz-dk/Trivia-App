import axios from "axios"
import { API_URL } from "./getCategories"

type TArgs = {
    categoryToReqest: string,
    difficulty: string,
    questionsAmount: string,
}

export const getQuestions = async ({ categoryToReqest, difficulty, questionsAmount }: TArgs) => {
    return await axios(`${API_URL}/questions?categories=${categoryToReqest}&limit=${questionsAmount}&difficulty=${difficulty}`)
}