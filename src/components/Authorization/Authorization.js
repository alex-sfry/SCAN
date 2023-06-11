import { React, useState, useEffect } from 'react';
import css from './Authorization.module.css';
import Tabs from '../Tabs';
import padlock from '../../assets/images/padlock.svg';
import SignIn from '../Forms/AuthorizationForm/SignIn.js';
import SignUp from '../Forms/AuthorizationForm/SignUp.js';

const Authorization = () => {
    const [activeSignIn, setActiveSignIn] = useState('');
    useEffect(() => { setActiveSignIn(true) }, []);

    const handleTabClick = (id) => {
        id === 0 && setActiveSignIn(true);
        id === 1 && setActiveSignIn(false);
    }

    return (
        <div className={css.container}>
            <div className={css.title}>
                <h1 className={css.heading}>
                    Для оформления подписки
                    на тариф, необходимо авторизоваться.
                </h1>
                <div className={css.bgImage}></div>
            </div>
            <div className={css.formContainer}>
                <img className={css.padlock} src={padlock} alt="замок" width="75" height="92" />
                <div className={css.tabs}>
                    <Tabs
                        id="signIn"
                        handleClick={handleTabClick}
                        activeTab = {activeSignIn ? 0 : 1}
                        config={['Войти', 'Зарегистрироваться']}
                    />
                </div>
                { activeSignIn ? <SignIn /> : <SignUp />}
            </div>
            <div className={css.bgImageMobile}></div>
        </div>
    )
}

export default Authorization;