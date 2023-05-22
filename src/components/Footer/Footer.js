import React from 'react';
import css from './Footer.module.css'
import logo from '../../assets/images/footerLogo.png';

const Footer = () => {
	return (
        <footer className={css.footer}>
            <div className={`${css.container} ${css.flexAlignCenter}`}>
                <div className={css.footerLogo}>
                    <img src={logo} alt="логотип" className={css.logoImg} width={137} height={137} />
                </div>
                <div className={css.footerRight}>
                    <div className={css.contactInfo}>
                        <p>г. Москва, Цветной б-р, 40</p>
                        <p>+7 495 771 21 11</p>
                        <p>info@skan.ru</p>
                        
                    </div>
                    <div className={css.copyright}>Copyright. 2022</div>
                </div>
            </div>
        </footer>
	)
}

export default Footer;