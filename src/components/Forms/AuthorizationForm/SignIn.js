import { React, useEffect, useState } from 'react';
import css from './SignIn.module.css';
import { useForm } from "react-hook-form";
import Button from '../../Button';
import Input from '../../Input';
import google from '../../../assets/images/google.svg';
import facebook from '../../../assets/images/facebook.svg';
import yandex from '../../../assets/images/yandex.svg';
import useAxios from '../../../hooks/useAxios.js';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Navigate } from "react-router-dom";


const SingIn = () => {
    const [signIn, setSignIn] = useState({
        req: null,
        token: null,
        method: null,
        url: null,
        isLoading: true // useless
    });
    const { status } = useAxios(signIn.url, signIn.req, signIn.token, signIn.method);
    const dispatch = useDispatch();
    const selectedData = useSelector((state) => state, shallowEqual);
    let loginInfo;

    if (Object.hasOwn(selectedData, 'token')) loginInfo = selectedData.token

    useEffect(() => {
        if (status.data) {
            status.data.data.accessToken &&
                dispatch({ type: 'ADD_TOKEN', payload: [status.data.data, status.isLoading] })
            status.data.data.eventFiltersInfo &&
                dispatch({ type: 'ADD_INFO', payload: [status.data.data.eventFiltersInfo, status.isLoading] })
        }
    }, [status.data, dispatch])

    useEffect(() => {
        console.log('info')
        if (Object.hasOwn(selectedData, 'token')) {
            console.log('info')
            setSignIn({
                req: null,
                token: selectedData.token.accessToken,
                method: 'GET',
                url: '/api/v1/account/info'
            })
        }
    }, [loginInfo])

    //if(status.data) console.log(status.data.data);
    if (selectedData) console.log(selectedData)

    const { register, formState: { errors, isValid }, handleSubmit } = useForm({ mode: 'onChange' });
    //const onSubmit = data => console.log(data);
    //console.log(errors);

    const onSubmit = (data) => {
        if (!Object.hasOwn(selectedData, 'token')) {
            console.log('login')
            dispatch({ type: 'ADD_LOADING_STATUS', payload: true })
            setSignIn({
                req: { login: data.login, password: data.password },
                method: 'POST',
                url: '/api/v1/account/login'
            })
        }
    }

    const renderAlert = (name) => {
        return (
            errors[name]?.type === 'required' ?
                <p className={css.alert} role="alert">Введите корректные данные</p> :
                <p className={css.isInvisible}>Введите корректные данные</p>
        )
    }

    return (
        <>
            {Object.hasOwn(selectedData, 'token') ? <Navigate to="/" replace={true} /> :
                <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="login" className={css.isGray}>Логин или номер телефона:</label>
                    <Input
                        name="login"
                        register={register}
                        required
                        type="text"
                    />
                    {renderAlert('login')}
                    <label htmlFor="password" className={css.isGray}>Пароль:</label>
                    <Input
                        name="password"
                        register={register}
                        required
                        type="password"
                    />
                    {renderAlert('password')}
                    <div className={css.btnDiv}>
                        <Button
                            type={'submit'}
                            disabled={!isValid}
                            btnClass={'btn22'}
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