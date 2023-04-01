import axios from "axios";



export const currencyApi = {
    getCourses (fromCurrency:string) {
const promise = axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        return promise
    }
}
