import React from 'react';
import css from './TariffCard.module.css';
import Button from '../../Button';
import checkMark from '../../../assets/images/checkmark-green.svg';

const TariffCard = ({ content, border, btnBgColor, fontColor, text, display }) => {
    return (
        <div className={css.card} style={{ border: border }}>
            <div className={`${css.cardHeader} ${css[content.bgColor]} ${css[content.headerFontColor]}`}>
                <div className={css.cardHeaderTitle}>
                    <h3 className={css.title}>{content.title}</h3>
                    <p className={css.titleDescr}>{content.titleDescr}</p>
                </div>
                <div className={css.cardHeaderIcon}>
                    <img
                        className={css[content.cls]}
                        src={content.icon}
                        alt={content.iconAlt}
                    />
                </div>
            </div>
            <div className={css.cardMain}>
                <div className={css.cardContent}>
                <div className={css.activeTariff} style={{ display: display }}>Текущий тариф</div> 
                    <div className={css.priceContainer}>
                    
                        <div className={css.price}>
                            <span className={css.promoPrice}>{content.regularPrice}</span>
                            <span className={css.regularPrice}>{content.promoPrice}</span>
                        </div>
                        <p className={!content.priceOption ? css.hidden : undefined}>
                            {content.priceOption ? content.priceOption : 'n/a'}
                        </p>
                    </div>
                    <div className={css.description}>
                        <h4 className={css.subtitle}>{content.descrHeading}</h4>
                        <ul>
                            <li>
                                <img src={checkMark} alt="галочка" className={css.checkMark} />
                                {content.list[0]}
                            </li>
                            <li>
                                <img src={checkMark} alt="галочка" className={css.checkMark} />
                                {content.list[1]}
                            </li>
                            <li>
                                <img src={checkMark} alt="галочка" className={css.checkMark} />
                                {content.list[2]}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={css.cardBtn}>
                    <Button
                        fontColor={fontColor}
                        bgColor={btnBgColor}
                    >
                        {text}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TariffCard;