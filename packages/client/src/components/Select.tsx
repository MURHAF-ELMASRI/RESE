import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import SelectMui from '@material-ui/core/Select';
import { uniqueId } from 'lodash';
import React, { useState } from 'react';


export default React.memo(Select)

interface Props<V = any>{
    label:string
    data: {
        title: string
        value:V
    }[]
    value:V
    onChange?: (value: V) => void
    helperText?: string
    variant?:'filled'
    | 'outlined'
    | 'standard'
}

function Select(props: Props) {
    const {data,onChange,value,label,helperText,variant='outlined'}=props

    const [id]=useState(uniqueId())

    return (
        <FormControl variant={variant}>
            <InputLabel id={id}>{label}</InputLabel>
            <SelectMui labelId={id} onChange={onChange} value={value}>
            {
                data.map(row => {
                    <MenuItem value={row.value}>{row.title}</MenuItem>
                })
            }
            </SelectMui>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    )
    
}
