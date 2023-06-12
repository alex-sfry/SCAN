import React from 'react';
import css from './CheckBox.module.css';

const CheckBox = ({ label, name, register, required }) => {
    return (
        <div>
            <label className={css.label} htmlFor={name}>
                <input
                    {...register(name, { required: required })}
                    className={css.checkbox} id={name} name={name} type="checkbox"
                />
                <span className={css.fake}></span>
                <span className={css.text}>{label}</span>
            </label>
        </div>
    )
}

export default CheckBox;