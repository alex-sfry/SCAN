import React from 'react';
import css from './DocCard.module.css';
import { Link } from 'react-router-dom';

const DocCard = ({ content }) => {
    return (
        <div className={css.docCard}>
            <div className={css.cardHeader}>
                <span>13.09.2021</span>
                <span>Комсомольская правда KP.RU</span>
            </div>
            <h3 className={css.cardTitle}>
                Скиллфэктори - лучшая онлайн-школа для будущих айтишников
            </h3>
            <span className={css.cardBadge}>Технические новости</span>
            <div className={css.cardImage}>
                <img src="" alt="" />
            </div>
            <div className={css.cardText}>{content}</div>
            <div className={css.cardFooter}>
                <div className={css.cardBtn}>
                    <Link>Читать в источнике</Link>
                </div>
                <span className={css.cardStats}>2 543 слова</span>
            </div>


        </div>
    )
}

export default DocCard;