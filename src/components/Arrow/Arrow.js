import React from 'react';
import css from './Arrow.module.css';

const Arrow = (props) => {
    const { onClick, direction, parentSlider } = props;
    return (
        <div className={`${css.arrow} ${css[direction]} ${css[parentSlider]}`} onClick={onClick}>
            {direction === 'arrowRight' &&
            <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="1.2">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
            </svg>}

            {direction === 'arrowLeft' &&
            <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="1.2">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            </svg>}
        </div>
    )
}

export default Arrow;