import { React } from 'react';
import css from './DatePick.module.css';
import { Controller } from "react-hook-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const DatePick = ({ control, name, placeholder }) => {
    return (
        <>
            <Controller
                control={control}
                name={name}
                rules={{ required: true }}
                render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            sx={{
                                width: '100%',
                                height: 43,
                                '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                    height: 43
                                },
                                '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
                                    paddingLeft: 5
                                },
                                '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
                                    height: 43
                                }
                            }}
                            onChange={(e) => { field.onChange(e) }} // send value to hook form
                            selected={field.value}
                            maxDate={dayjs()}
                            placeholder=""
                            slotProps={{ textField: { placeholder: placeholder } }}
                        />
                    </LocalizationProvider>
                )}
            />
        </>
    )
}

export default DatePick;