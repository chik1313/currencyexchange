import React, {ChangeEvent, useState} from 'react';
import s from './Converter.module.css'
import {FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
export type PropsType = {
    value: number,
    currency:string,
    onChangeCurrency: (value: string) => void
    onChangeValue: (value:number) => void
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
                {defaultCurrencies.map(el =>
                        <MenuItem color="secondary" value={el} onClick={()=>props.onChangeCurrency(el)}>{el}</MenuItem>
                    )}

            </Select>
            <TextField
                       label="Value"
                       variant="outlined"
                       value={props.value}
                       onChange={(e)=> {
                           props.onChangeValue(+e.currentTarget.value)
                       }}/>

        </div>
    );
};

export default Converter;