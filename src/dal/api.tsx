import axios from "axios";



export const currencyApi = {
    getCourses () {
const promise = axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
        return promise
    }
}