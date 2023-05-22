import React from 'react';
import css from './HomeTop.module.css';


const HomeTop = () => {
    return (
        <section className={css.homeTop}>
            <div className={css.homeTopLeft}>
                <h1 className={css.homeTopHeading}>
                    сервис по поиску публикаций<br></br>о компании<br></br>по его ИНН
                </h1>
                <p className={css.homeTopDescription}>
                    Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
                </p>
            </div>
            <div className={css.homeTopRight}></div>
        </section>
    )
}

export default HomeTop;