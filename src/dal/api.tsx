import axios from "axios";

export type CurrencyType = {
    [key: string]: any
}

export const currencyApi = {
    getCourses (fromCurrency:string) {
const promise = axios.get<CurrencyType>(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        return promise
    }
}
