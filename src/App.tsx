import React, {useEffect, useState} from 'react';
import './App.css'
import Converter from "./ui/Converter";
import {currencyApi} from "./dal/api";

type ValueType = {
    r030: number,
    txt: string,
    rate: number,
    cc: string,
    exchangedate: string
}
function App() {
    const [fromCurrency, setFromCurrency] = useState<string>('UAH')
    const [toCurrency, setToFromCurrency] = useState<string>('USD')
    const [rates, setRates] = useState<ValueType[]>([])
    const [fromPrice, setFromPrice] = useState<number>(0)
    const [toPrice, setToPrice] = useState<number>(0)

    useEffect(() => {
        currencyApi.getCourses()
            .then((res) => {
                setRates(res.data);
                console.log(res.data)
            })
    }, [])

    const onChangeFromPrice = (value: number) => {

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
            const price = value * 1
            setToPrice(price)
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
        }else if (fromCurrency ===  toCurrency ) {
            const price = value * 1
            setToPrice(price)
            setFromPrice(value)
            return
        }
        const toCurrencyRate = rates.find(({cc})=>{
            return toCurrency === cc
        })!.rate
        const price = ((value * toCurrencyRate) / (value * fromCurrencyRate)) * value
        setFromPrice(price)
        setToPrice(value)
    };

/*
    useEffect(() => {
        onChangeFromPrice(fromPrice)
    },[fromCurrency,fromPrice]);

    useEffect(() => {
        onChangeToPrice(toPrice)
    },[toCurrency,toPrice]);
*/

    return (
        <div className="converter">
            <Converter value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency}
                       onChangeValue={onChangeFromPrice}/>
            <Converter value={toPrice}
                       currency={toCurrency} onChangeCurrency={setToFromCurrency} onChangeValue={onChangeToPrice}/>
        </div>
    );
}

export default App;
