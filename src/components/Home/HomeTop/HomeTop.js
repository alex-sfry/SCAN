import { React , useEffect } from 'react';
import css from './HomeTop.module.css';
import Button from '../../Button';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { persistor } from '../../../store/store.js';


const HomeTop = () => {
    const selectedData = useSelector((state) => state, shallowEqual);
    const dispatch = useDispatch();
    console.log(selectedData)
    useEffect(() => {
        dispatch({ type: 'CLEAR_QUERY_REDUCER' })
        dispatch({ type: 'CLEAR_RESULT_REDUCER' })
    }, [])

    const renderCondition = () => {
        if (Object.hasOwn(selectedData.login, 'token')) {
            if (Object.hasOwn(selectedData.login.token, 'accessToken')) {
                return <div className={css.btnDiv}>
                    <Link to="search">
                        <Button
                            btnClass='btn22'
                            bgColor='bgBlue'
                            fontColor='white'
                            type='button'
                            disabled={false}
                        >
                            Запросить данные
                        </Button>
                    </Link>
                </div>
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
                {renderCondition()}
            </div>
            <div className={css.homeTopRight}></div>
        </section>
    )
}

export default HomeTop;