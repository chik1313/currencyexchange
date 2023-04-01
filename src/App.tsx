import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css'
import Converter from "./ui/Converter";
import {currencyApi} from "./dal/api";

// type ValueType = {
//     r030: number,
//     txt: string,
//     rate: number,
//     cc: string,
//     exchangedate: string
// }
function App() {
    const [fromCurrency, setFromCurrency] = useState<string>('UAH')
    const [toCurrency, setToFromCurrency] = useState<string>('USD')
    const [rates, setRates] = useState({})
    const [exchangeRate,setExchangeRate] = useState<number>(1)
    const [ammount, setAmount] = useState<number>(0)
    const [convertedAmount, setConvertedAmount] = useState(0);
    // const [toPrice, setToPrice] = useState<number>(0)

    useEffect(() => {
        const getExchangeRate = async () => {
            const response = await currencyApi.getCourses(fromCurrency);
            setRates(response)
            console.log(response)
            const exchangeRate = response.data.rates[toCurrency];
            setExchangeRate(exchangeRate);
        };
        getExchangeRate();
        setConvertedAmount(ammount * exchangeRate);
    }, [fromCurrency, toCurrency, ammount, convertedAmount, exchangeRate]);

    const handleChanger = (event: ChangeEvent<HTMLInputElement>) => {
        const value = +event.currentTarget.value;
        const newValue = event.currentTarget.name === 'amount' ? value : value / exchangeRate;
        setAmount(newValue);
        setConvertedAmount(newValue * exchangeRate);
    };

    /*const onChangeFromPrice = (value: number) => {

        const toCurrencyRate = rates.find(({cc}) => {
            return toCurrency === cc
        })!.rate

        if(fromCurrency === 'UAH') {
            const price = value / toCurrencyRate ;
            setToPrice(price)
            console.log({price})
            setFromPrice(value)
            return
        }

        else if (fromCurrency ===  toCurrency ) {
            setToPrice(value)
            setFromPrice(value)
            return
        }

        const fromCurrencyRate = rates.find(({cc}) => {
            return fromCurrency === cc
        })!.rate

        console.log(fromCurrency, toCurrencyRate)
        const price = ((value * fromCurrencyRate) / (value * toCurrencyRate)) * value
        setFromPrice(value)
        setToPrice(price)
    }
    const onChangeToPrice = (value: number) => {
        const fromCurrencyRate = rates.find(({cc}) => {
            console.log()
            return fromCurrency === cc
        })!.rate

        if(toCurrency === 'UAH') {
            const price = value / fromCurrencyRate ;
            setToPrice(value)
            setFromPrice(price)
            return
        }
        const toCurrencyRate = rates.find(({cc})=>{
            return toCurrency === cc
        })!.rate
        const price = (value * toCurrencyRate) / fromCurrencyRate
        setFromPrice(price)
        setToPrice(value)
    };
*/


    return (
        <div className="converter">
            <Converter value={ammount}
                       currency={fromCurrency}
                       onChangeCurrency={setFromCurrency}
                       handleAmountChange={handleChanger}
                       name='amount'
            />
            <Converter value={convertedAmount}
                       currency={toCurrency}
                       onChangeCurrency={setToFromCurrency}
                       handleAmountChange={handleChanger}
                       name='convertedAmount'
            />

        </div>
    );
}

export default App;
