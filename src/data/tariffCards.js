import icon1 from '../assets/images/tariffIcon1.svg';
import icon2 from '../assets/images/tariffIcon2.svg';
import icon3 from '../assets/images/tariffIcon3.svg';
import uniqid from 'uniqid';

const tariffCards = [
    {   
        id: uniqid(),
        title: 'Beginner',
        titleDescr: 'Для небольшого исследования',
        icon: icon1,
        cls: 'icon1',
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
        id: uniqid(),
        title: 'Pro',
        titleDescr: 'Для HR и фрилансеров',
        icon: icon2,
        cls: 'icon2',
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
        id: uniqid(),
        title: 'Business',
        titleDescr: 'Для корпоративных клиентов',
        icon: icon3,
        cls: 'icon3',
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