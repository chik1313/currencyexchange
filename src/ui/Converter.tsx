import React, {useState} from 'react';
import s from './Converter.module.css'
import {MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";

export type PropsType = {
    value: number,
    currency:string,
    name:string|undefined,
    onChangeCurrency: (value: string) => void
    handleAmountChange:(value:number , name:string)=> void
}
export const defaultCurrencies = ["UAH" , "USD" , "EUR"]
const Converter = (props:PropsType) => {
    const [currency, setCurrency] = useState(props.currency);

    const handleChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value as string);
    };

    return (
        <div className={s.container}>
            <Select
                value={currency}
                label="cur"
                onChange={handleChange}
            >
                {defaultCurrencies.map((el , i )=>
                        <MenuItem key={i} color="secondary" value={el} onClick={()=>props.onChangeCurrency(el)}>{el}</MenuItem>
                    )}

            </Select>
            <TextField name={props.name}
                       label="Value"
                       variant="outlined"
                       value={props.value}
                       onChange={(e)=>props.handleAmountChange(
                           +e.currentTarget.value , e.currentTarget.name )
                       }/>

        </div>
    );
};

export default Converter;
