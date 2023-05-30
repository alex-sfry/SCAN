import React from 'react';
import css from './DocCard.module.css';
import { Link } from 'react-router-dom';

const DocCard = ( { content } ) => {
    return (
        <div className={css.docCard}>
            {content}


        </div>
    )
} 

export default DocCard;