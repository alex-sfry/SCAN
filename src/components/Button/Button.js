import React from 'react';
import css from './Button.module.css';

const Button = (props) => {
    const { children, btnClass, fontColor, bgColor, disabled, handleClick, type } = props;
    let clsName = `${css.btn}`;
    if (btnClass) clsName += ` ${css[btnClass]}`;
    if (fontColor) clsName += ` ${css[fontColor]}`;
    if (bgColor) clsName += ` ${css[bgColor]}`;
    return (
        <button
            type={type}
            disabled={disabled}
            className={`${clsName}`}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

export default Button;