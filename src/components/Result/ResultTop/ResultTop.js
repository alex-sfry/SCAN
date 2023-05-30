import React from 'react';
import css from './ResultTop.module.css';

const ResultTop = () => {
    return (
        <div className={css.resultTop}>
            <div className={css.resultTopLeft}>
                <h1 className={css.resultHeading}>
                    Ищем. Скоро будут результаты
                </h1>
                <p className={css.resultTopText}>
                    Поиск может занять некоторое время, просим сохранять терпение.
                </p>
            </div>
            <div className={css.resultTopRight}></div>
        </div>
    )
}

export default ResultTop;