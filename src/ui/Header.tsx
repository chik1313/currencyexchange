import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../bll/store";
import {currencyExchangeTC} from "../bll/currency-reducer";
import Converter from "./Converter";
import s from './Converter.module.css'


export const Header = () => {
const [fromCurrency, setFromCurrency] = useState<string>('UAH')
const [toCurrency, setToFromCurrency] = useState<string>('USD')
const [exchangeRate,setExchangeRate] = useState(1)
const [ammount, setAmount] = useState<number>(0)
const [convertedAmount, setConvertedAmount] = useState(0);

const rate = useAppSelector(state => state.currency[toCurrency])
const dispatch = useAppDispatch()

useEffect(() => {
        const getExchangeRate = async () => {
            await dispatch(currencyExchangeTC(fromCurrency))
            setExchangeRate(rate);

        };
        getExchangeRate();
            setConvertedAmount(ammount * exchangeRate);

}, [rate,fromCurrency, ammount, convertedAmount, exchangeRate]);

const handleChanger = (value:number , name:string) => {
        const newValue = name === 'amount' ? value : value / exchangeRate;
        setAmount(newValue);
        setConvertedAmount(newValue * exchangeRate);
};

return (
    <div className={s.converter}>
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
)}
