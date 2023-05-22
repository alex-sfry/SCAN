import { React } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import css from './Header.module.css';
import logo from '../../assets/images/headerLogo.png';
import user from '../../assets/images/user.png';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const selectedData = useSelector((state) => state, shallowEqual);
    const dispatch = useDispatch();
    //console.log('useSelector', selectedData);

    const renderConditions = () => {
        if (Object.hasOwn(selectedData, 'token')) {
            if (Object.hasOwn(selectedData.token, 'accessToken')) {
                return (
                    <>
                        <div className={`${css.headerStats} ${css.flexAlignCenter}`}>
                            <div className={`${css.headerStatsText} ${css.flexCol}`}>
                                <p className={css.label}>Использовано компаний</p>
                                <p className={css.label}>Лимит по компаниям</p>
                            </div>
                            <div className={`${css.headerStatsQty} ${css.flexCol}`}>
                                <span className={css.qty}>34</span>
                                <span className={css.qty}>100</span>
                            </div>
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
                            <Link to="/authorization"><div
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