import { React } from 'react';
import css from './Header.module.css';
import { shallowEqual, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { persistor } from '../../store/store.js';
import logo from '../../assets/images/headerLogo.png';
import user from '../../assets/images/user.png';

import spinner from '../../assets/images/spinnerHeader.svg';

const Header = () => {
    const location = useLocation();
    const selectedData = useSelector((state) => state, shallowEqual);
    //console.log('useSelector', selectedData);
    const date = new Date();
    if (Object.hasOwn(selectedData.login, 'token')) {
        Date.parse(selectedData.login.token.expire) - Date.parse(date) < 0 && persistor.purge();
    }
    const renderConditions = () => {
        if (Object.hasOwn(selectedData.login, 'token')) {
            if (Object.hasOwn(selectedData.login.token, 'accessToken')) {
                return (
                    <>
                        <div className={`${css.headerStats} ${css.flexAlignCenter}`}>
                            {!selectedData.login.isLoading ?
                                <>
                                    <div className={`${css.headerStatsText} ${css.flexCol}`}>
                                        <p className={css.label}>Использовано компаний</p>
                                        <p className={css.label}>Лимит по компаниям</p>
                                    </div>
                                    <div className={`${css.headerStatsQty} ${css.flexCol}`}>
                                        <span className={css.qty}>
                                            {Object.hasOwn(selectedData.login, 'info') && selectedData.login.info.usedCompanyCount}
                                        </span>
                                        <span className={css.qty}>
                                            {Object.hasOwn(selectedData.login, 'info') && selectedData.login.info.companyLimit}
                                        </span>
                                    </div>
                                </>
                                : (<img className={css.spinner} src={spinner} alt="loading..." />)}

                        </div>
                        <div className={`${css.user} ${css.flexAlignCenter}`}>
                            <div className={`${css.userText} ${css.flexCol}`}>
                                <span className={css.userName}>Алексей А.</span>
                                <a href="http://" className={css.userBtn}>Выйти</a>
                            </div>
                            <img src={user} alt="фотография" className={css.userImg} width={32} height={32} />
                        </div>
                    </>
                )
            }
        } else {
            return (
                <>
                    <div className={`${css.account} ${css.flexAlignCenter}`}>
                        <div className={css.signUp}>
                            <div className={css.signUpBtn} >
                                <Link to="#" >Зарегистрироваться</Link>
                            </div>
                        </div>
                        <div className={css.login}>
                            <Link to="authorization"><div
                                className={location.pathname === '/authorization' ? `${css.loginBtn} ${css.isActive}` :
                                    `${css.loginBtn}`}>
                                Войти
                            </div></Link>
                        </div>
                    </div>
                </>
            )
        }
    }
    return (
        <header className={css.header}>
            <div className={`${css.container} ${css.flexAlignCenter}`}>
                <div className={css.headerLogo}>
                    <img src={logo} alt="логотип" className={css.logoImg} width={141} height={91} />
                </div>
                <div className={`${css.headerMain} ${css.flexAlignCenter}`}>
                    <nav>
                        <ul className={css.menu}>
                            <li className={css.menuItem}><Link to="/" >Главная</Link></li>
                            <li className={css.menuItem}><a href="/">Тарифы</a></li>
                            <li className={css.menuItem}><a href="/">FAQ</a></li>
                        </ul>
                    </nav>
                    <div className={`${css.headerRight} ${css.flexAlignCenter}`}>
                        {renderConditions()}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;