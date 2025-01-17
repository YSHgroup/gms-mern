import axios from "axios"

export const getReviewer = () => {
    return axios.get('api/reviewer')
}