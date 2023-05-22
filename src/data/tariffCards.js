import icon1 from '../assets/images/tariffIcon1.svg';
import icon2 from '../assets/images/tariffIcon2.svg';
import icon3 from '../assets/images/tariffIcon3.svg';

const tariffCards = [
    {
        title: 'Beginner',
        titleDescr: 'Для небольшого исследования',
        icon: icon1,
        iconPosition: {position: "absolute", top: '11px', right: 'calc(-100% + 16px)'},
        iconAlt: 'лампочка',
        regularPrice: '1200 ₽',
        promoPrice: '799 ₽',
        priceOption: 'или 150 ₽/мес. при рассрочке на 24 мес.',
        descrHeading: 'В тариф входит:',
        list: [
            'Безлимитная история запросов',
            'Безопасная сделка',
            'Поддержка 24/7'
        ],
        bgColor: 'orange',
        headerFontColor: 'fontBlack'
    },
    {
        title: 'Pro',
        titleDescr: 'Для HR и фрилансеров',
        icon: icon2,
        iconPosition: {position: "absolute", bottom: '9px', right: 'calc(-100% + 12px)'},
        iconAlt: 'стрела',
        regularPrice: '2600 ₽',
        promoPrice: '1299 ₽',
        priceOption: 'или 279 ₽/мес. при рассрочке на 24 мес.',
        descrHeading: 'В тариф входит:',
        list: [
            'Все пункты тарифа Beginner',
            'Экспорт истории',
            'Рекомендации по приоритетам'
        ],
        bgColor: 'aqua',
        headerFontColor: 'fontBlack'
    },
    {
        title: 'Business',
        titleDescr: 'Для корпоративных клиентов',
        icon: icon3,
        iconPosition: {position: "absolute", top: '23px', right: 'calc(-100% + 5px)'},
        iconAlt: 'ноутбук',
        regularPrice: '3700 ₽',
        promoPrice: '2379 ₽',
        priceOption: null,
        descrHeading: 'В тариф входит:',
        list: [
            'Все пункты тарифа Pro',
            'Безлимитное количество запросов',
            'Приоритетная поддержка'
        ],
        bgColor: 'black',
        headerFontColor: 'fontWhite'
    },
]

export default tariffCards;