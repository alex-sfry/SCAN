import { React, useState, useEffect } from 'react';
import css from './Header.module.css';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/headerLogo.png';
import logoMobile from '../../assets/images/headerLogo-mobile.png';
import logoMobileBurger from '../../assets/images/headerLogo-mobile-burger.png';
import user from '../../assets/images/user.png';
import spinner from '../../assets/images/spinnerHeader.svg';
import { persistor } from '../../store/store.js';

const Header = () => {
    const [isActive, setIsActive] = useState(false)

    const location = useLocation();
    const selectedData = useSelector((state) => state, shallowEqual);
    const dispatch = useDispatch();
    const date = new Date();

    useEffect(() => {
        setIsActive(false);
    }, [location])

    useEffect(() => {
        document.body.style.overflowY = isActive ? 'hidden' : 'auto';
    }, [isActive])

    const logOut = () => {
        dispatch({ type: 'CLEAR_LOGIN_STATE' });
        persistor.purge();
    }

    const handleClick = () => {
        setIsActive(!isActive);
    }

    const isLoggedIn = () => {
        if (Object.hasOwn(selectedData.login, 'token')) {
            if (Object.hasOwn(selectedData.login.token, 'accessToken')) {
                return true;
            }
        }
        return false;
    }

    const renderConditions = () => {
        //check if token is expired
        if (isLoggedIn()) {
            if (Date.parse(selectedData.login.token.expire) - Date.parse(date) < 0){
                logOut();
            } 
        }
        
        if (isLoggedIn()) {
                return (
                    <>
                        <div className={`${css.headerStats} ${css.flexAlignCenter}`}>
                            {!selectedData.login.isLoading ?
                                <>
                                    <div className={`${css.headerStatsText} ${css.flexCol}`}>
                                        <p className={css.label}>Использовано компаний</p>
                                        <span className={css.qtyMobile}>
                                            {Object.hasOwn(selectedData.login, 'info') && selectedData.login.info.usedCompanyCount}
                                        </span>
                                        <p className={css.label}>Лимит по компаниям</p>
                                        <span className={css.qtyMobile}>
                                            {Object.hasOwn(selectedData.login, 'info') && selectedData.login.info.companyLimit}
                                        </span>
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
                        <div 
                            onClick={handleClick} 
                            className={isActive ? `${css.burger} ${css.burgerClose}`: css.burger}
                        >
                            <span onClick={handleClick}></span>
                            <span onClick={handleClick}></span>
                            <span onClick={handleClick}></span>
                        </div>
                        <div className={`${css.user} ${css.flexAlignCenter}`}>
                            <div className={`${css.userText} ${css.flexCol}`}>
                                <span className={css.userName}>Алексей А.</span>
                                <div className={css.userBtn}>
                                    <button onClick={logOut}>Выйти</button>
                                </div>
                            </div>
                            <img src={user} alt="фотография" className={css.userImg} width={32} height={32} />
                        </div>
                    </>
                )          
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
                    <div onClick={handleClick} className={isActive ? `${css.burger} ${css.burgerClose}`: css.burger}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </>
            )
        }
    }

    return (
        <header className={css.header}>
            <div className={`${css.container} ${css.flexAlignCenter}`}>
                <Link to="/" >
                    <div className={css.headerLogo}>
                        <img src={logo} alt="логотип" className={css.logoImg} width={141} height={91} />
                        <img 
                            src={isActive ? logoMobileBurger : logoMobile} alt="логотип" className={css.logoImgMobile} 
                            width={111} 
                            height={93}
                        />
                    </div>
                </Link>               
                <div className={`${css.headerMain} ${css.flexAlignCenter}`}>
                    <nav>
                        <ul className={isActive ? `${css.menu} ${css.menuShow}` : css.menu}>
                            <li className={css.menuItem}><Link to="/" >Главная</Link></li>
                            <li className={css.menuItem}><a href="/">Тарифы</a></li>
                            <li className={css.menuItem}><a href="/">FAQ</a></li>

                            {!isLoggedIn() ? (<div className={`${css.accountMobile} ${css.flexAlignCenter}`}>
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
                            </div>)
                                : <div className={css.userBtnMobile}>
                                    <button onClick={logOut}>Выйти</button>
                                </div>}
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