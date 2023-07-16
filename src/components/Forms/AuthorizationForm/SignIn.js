import { React, useEffect } from 'react';
import css from './SignIn.module.css';
import { useForm } from "react-hook-form";
import Button from '../../Button';
import Input from '../../Input';
import google from '../../../assets/images/google.svg';
import facebook from '../../../assets/images/facebook.svg';
import yandex from '../../../assets/images/yandex.svg';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Navigate } from "react-router-dom";
import useFetchData from '../../../hooks/useFetchData.js';

const SingIn = () => {
    const {error, status, fetch} = useFetchData();
    const dispatch = useDispatch();
    const selectedData = useSelector((state) => state, shallowEqual);

    useEffect(() => {
        if (status.data) {
            status.data.data.accessToken &&
                dispatch({ type: 'ADD_TOKEN', payload: [status.data.data, status.isLoading] })
            status.data.data.eventFiltersInfo &&
                dispatch({ type: 'ADD_INFO', payload: [status.data.data.eventFiltersInfo, status.isLoading] })
        }
    }, [error, status.data, dispatch])
    
    useEffect(() => {
        if (Object.hasOwn(selectedData.login, 'token') && !Object.hasOwn(selectedData.login, 'info')) {
            dispatch({ type: 'ADD_LOADING_STATUS', payload: true })
            fetch('/api/v1/account/info', null, selectedData.login.token.accessToken, 'queryInstance')
        }
    }, [selectedData.login.token, dispatch])

    const { register, formState: { errors, isValid }, handleSubmit } = useForm({ mode: 'onChange' });


    const onSubmit = (data) => {
        fetch('/api/v1/account/login', { login: data.login, password: data.password }, null, 'loginInstance')
    }

    const renderAlert = (name) => {
        return (
            error && error.response.status === 401 ?
                <>
                    <p className={css.alert} role="alert">{error.response.data.message}</p>
                    <p className={css.isInvisible}>{error.response.data.message}</p>
                </>
                :
                errors[name]?.type === 'required' ?
                    <p className={css.alert} role="alert">Введите корректные данные</p> :
                    <p className={css.isInvisible}>Введите корректные данные</p>
        )
    }

    return (
        <>
            {Object.hasOwn(selectedData.login, 'info') ? <Navigate to="/" replace={true} /> :
                <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="login" className={css.isGray}>Логин или номер телефона:</label>
                    <Input
                        name="login"
                        register={register}
                        required
                        type="text"
                        placeholder={""}
                    />
                    {renderAlert('login')}
                    <label htmlFor="password" className={css.isGray}>Пароль:</label>
                    <Input
                        name="password"
                        register={register}
                        required
                        type="password"
                        placeholder={""}
                    />
                    {renderAlert('password')}
                    <div className={css.btnDiv}>
                        <Button
                            type={'submit'}
                            disabled={!isValid || !status.isLoading}
                            fontColor={'white'}
                            bgColor={'bgBlue'}
                        >
                            Войти
                        </Button>
                    </div>
                    <div><a className={css.restorePwd} href="/authorization">Восстановить пароль</a></div>
                    <div className={css.formBottom}>
                        <p className={css.isGray}>Войти через:</p>
                        <div className={css.loginIcons}>
                            <img className={css.imgIcons} src={google} alt="Google" width="96" height="31" />
                            <img className={css.imgIcons} src={facebook} alt="Facebook" width="96" height="31" />
                            <img className={css.imgIcons} src={yandex} alt="Яндекс" width="96" height="31" />
                        </div>
                    </div>
                </form>
            }
        </>
    )
}

export default SingIn;