import React from 'react';
import css from './Input.module.css';

const Input = ({ type, name, register, required }) => {
    return (
        <>
            <input
                {...register(name, { required: required })}
                className={css.input}
                type={type}
                name={name}
            />
        </>
    )
}

export default Input;