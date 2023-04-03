import {currencyApi, CurrencyType} from "../dal/api";
import {Dispatch} from "redux";

const initialState:CurrencyType = {

}

export const currencyReducer = (state:CurrencyType = initialState , action:ActionType ):CurrencyType => {
    switch(action.type) {
        case "CHANGE-CURRENCY": {
            return action.rates
        }
        default:
            return state
    }
}

const currencyExchangeAC = (rates:CurrencyType) => {
    return {
        type: "CHANGE-CURRENCY",
        rates
    }as const
}

export const currencyExchangeTC = (fromCurrency:string) => async (dispatch: Dispatch<ActionType>) => {
    const response = await currencyApi.getCourses(fromCurrency);
    dispatch(currencyExchangeAC(response.data.rates))
    // console.log(response.data.rates)
    // const exchangeRate = response.data.rates[toCurrency];
    // setExchangeRate(exchangeRate);
}

type ActionType = ReturnType<typeof currencyExchangeAC>
