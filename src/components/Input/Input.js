import React from 'react';
import css from './Input.module.css';

const Input = ({ type, name, register, required, placeholder }) => {
    return (
        <>
            <input
                {...register(name, { required: required })}
                className={css.input}
                type={type}
                name={name}
                placeholder={placeholder}
            />
        </>
    )
}

export default Input;