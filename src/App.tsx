import React, {useEffect, useState} from 'react';
import './App.css'
import Converter from "./ui/Converter";
import {currencyApi} from "./dal/api";

function App() {
    const [fromCurrency, setFromCurrency] = useState<string>('UAH')
    const [toCurrency, setToFromCurrency] = useState<string>('USD')
    const [rates, setRates] = useState({})
    const [exchangeRate,setExchangeRate] = useState<number>(1)
    const [ammount, setAmount] = useState<number>(0)
    const [convertedAmount, setConvertedAmount] = useState(0);


    useEffect(() => {
        const getExchangeRate = async () => {
            const response = await currencyApi.getCourses(fromCurrency);
            setRates(response)
            console.log(rates)
            const exchangeRate = response.data.rates[toCurrency];
            setExchangeRate(exchangeRate);
        };
        getExchangeRate();
        setConvertedAmount(ammount * exchangeRate);
    }, [fromCurrency, toCurrency, ammount, convertedAmount, exchangeRate]);

    const handleChanger = (value:number , name:string) => {
        const newValue = name === 'amount' ? value : value / exchangeRate;
        setAmount(newValue);
        setConvertedAmount(newValue * exchangeRate);
    };

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
