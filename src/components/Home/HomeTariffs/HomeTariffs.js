import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import css from './HomeTariffs.module.css';
import TariffCard from '../TariffCard';
import uniqid from 'uniqid';
import tariffCards from '../../../data/tariffCards';

const HomeTariffs = () => {
    const selectedData = useSelector((state) => state, shallowEqual);
    const bgColor = [['isOrange', '#FFB64F'],['isAqua', '#7CE3E1'], ['isBlack', '#000000']];
    let active;

    if (Object.hasOwn(selectedData.login, 'token')) {
        active = 1;
    } else active = 0;
    
	return (
		<section className={css.homeTariffs}>
			<h2 className={css.title}>
                наши тарифы
            </h2>
            <div className={css.cards}>
                <ul>
                    {
                        tariffCards.map((item, index) => {
                            return <li key={uniqid()}>
                                <TariffCard
                                    content={item}
                                    icon={item.icon}
                                    bgColor={bgColor[index][0]}
                                    border={index === active - 1 ? `2px solid ${bgColor[index][1]}` : 'none'}
                                    display={index === active - 1 ? 'block' : 'none'}none
                                    btnBgColor={index === active - 1 ? 'bgGray' : 'bgBlue'}
                                    fontColor={index === active - 1 ? 'black' : 'white'}
                                    text={index === active - 1 ? 'Перейти в личный кабинет' : 'Подробнее'}
                                />
                            </li>
                        })
                    }
                </ul>
            </div>
		</section>
	)
}

export default HomeTariffs;