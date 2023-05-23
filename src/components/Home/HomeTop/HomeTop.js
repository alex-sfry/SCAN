import React from 'react';
import css from './HomeTop.module.css';
import Button from '../../Button';
import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const HomeTop = () => {
    const selectedData = useSelector((state) => state, shallowEqual);

    const handleClick = () => {

    }

    const renderConditions = () => {
        if (Object.hasOwn(selectedData.login, 'token')) {
            if (Object.hasOwn(selectedData.login.token, 'accessToken')) {
                return (
                    <div className={css.btnDiv}>
                        <Link to="search">
                            <Button
                                btnClass='btn22'
                                bgColor='bgBlue'
                                fontColor='white'
                                type='button'
                                disabled={false}
                                handleClick={handleClick}
                            >
                            Запросить данные
                            </Button>
                        </Link>
                    </div>
                )
            }
        }
    }

    return (
        <section className={css.homeTop}>
            <div className={css.homeTopLeft}>
                <h1 className={css.homeTopHeading}>
                    сервис по поиску публикаций<br></br>о компании<br></br>по его ИНН
                </h1>
                <p className={css.homeTopDescription}>
                    Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
                </p>
                {renderConditions()}
            </div>
            <div className={css.homeTopRight}></div>
        </section>
    )
}

export default HomeTop;