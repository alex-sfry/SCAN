import { React } from 'react';
import css from './SearchForm.module.css';
import Input from '../../Input';
import Button from '../../Button';
import Checkbox from '../../CheckBox';
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import histogrReq from '../../../utils/histogramsRequest';
import useFetchData from '../../../hooks/useFetchData.js';
import uniqid from 'uniqid';
import DatePick from '../../DatePick';


const SearchForm = () => {
    const {fetch} = useFetchData();
    const selectedData = useSelector((state) => state, shallowEqual);
    const dispatch = useDispatch();
    const token = selectedData.login.token.accessToken;

    const { register, formState: { errors, isValid }, handleSubmit, control, setError } = useForm({ mode: 'onChange' });

    const onSubmit = data => {
        if (data.dateFrom.$d.getTime() - data.dateTo.$d.getTime() > 0) {
            setError("dateFrom", { type: "required" }, { required: true });
            return;
        }

        dispatch({ type: 'IS_LOADING', payload: true })
        const req = histogrReq(data)
        fetch('/api/v1/objectsearch/histograms', req, token, 'searchInstance', 'histoGram');
        fetch('/api/v1/objectsearch', req, token, 'searchInstance', 'idList');
    }

    const checkboxConfig = [
        'Признак максимальной полноты',
        'Упоминания в бизнес-контексте',
        'Главная роль в публикации',
        'Публикации только с риск-факторами',
        'Включать технические новости рынков',
        'Включать анонсы и календари',
        'Включать сводки новостей'
    ]

    //validate inn
    function validate(inn, error) {
        var result = false;
        if (typeof inn === 'number') {
            inn = inn.toString();
        } else if (typeof inn !== 'string') {
            inn = '';
        }
        if (!inn.length) {
            error.code = 1;
            error.message = 'ИНН пуст';
        } else if (/[^0-9]/.test(inn)) {
            error.code = 2;
            error.message = 'ИНН может состоять только из цифр';
        } else if ([10, 12].indexOf(inn.length) === -1) {
            error.code = 3;
            error.message = 'ИНН может состоять только из 10 или 12 цифр';
        } else {
            var checkDigit = function (inn, coefficients) {
                var n = 0;
                for (var i in coefficients) {
                    n += coefficients[i] * inn[i];
                }
                return parseInt(n % 11 % 10);
            };
            switch (inn.length) {
                case 10:
                    var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if (n10 === parseInt(inn[9])) {
                        result = true;
                    }
                    break;
                case 12:
                    var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
                        result = true;
                    }
                    break;
                default: result = false;
            }
            if (!result) {
                error.code = 4;
                error.message = 'Неправильное контрольное число';
            }
        }
        if(!result) {
            return error.message
        } else return result;
        
    }
    
    const renderAlert = (name) => {
        if(errors[name]?.type === 'required' ||  errors[name]?.type === 'validate') {
            return <p className={css.alert} role="alert">Введите корректные данные</p>
        } else return <p className={css.isInvisible}>Введите корректные данные</p>
    }

    return (
        <>
            <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={css.formLeft}>
                    <div className={css.formLeftMain}>
                        <label htmlFor="inn">ИНН компании *</label>
                        <Input
                            register={register}
                            name="inn"
                            required
                            type="text"
                            placeholder={'10 цифр'}
                            validate={validate}
                        />
                        {renderAlert('inn')}
                        <label className={css.selectLbl} htmlFor="tone">Тональность</label>
                        <select
                            {...register("tone", { required: false })}
                            className={css.select}
                            name="tone"
                        >
                            <option value="Любая">Любая</option>
                            <option value="Позитивная">Позитивная</option>
                            <option value="Негативная">Негативная</option>
                        </select>
                        <label className={css.qtyLbl} htmlFor="qty">Количество документов в выдаче*</label>
                        <Input
                            register={register}
                            name="qty"
                            required
                            type="text"
                            placeholder={'От 1 до 1000'}
                        />
                        {renderAlert('qty')}
                    </div>
                    <div className={css.formLeftBottom}>
                        <label htmlFor="cb1">Диапазон поиска*</label>
                        <div className={css.formLeftdate}>
                            <DatePick 
                                control={control}
                                name={'dateFrom'}
                                placeholder={'Дата начала'}
                            />
                            <DatePick 
                                control={control}
                                name={'dateTo'}
                                placeholder={'Дата конца'}
                            />
                        </div>
                    </div>
                    {renderAlert('dateFrom')}
                    <div className={css.btnDivMobile}>
                        <Button
                            type={'submit'}
                            disabled={!isValid}
                            fontColor={'white'}
                            bgColor={'bgBlue'}
                        >
                            Поиск
                        </Button>
                        <p className={css.comment}>* Обязательные к заполнению поля</p>
                    </div>
                </div>
                <div className={css.formRight}>
                    <div className={css.checkboxes}>
                        {
                            checkboxConfig.map((item, index) => {
                                return <Checkbox
                                    key={uniqid()}
                                    register={register}
                                    label={item}
                                    name={`cb${index + 1}`}
                                    required={false}
                                />
                            })
                        }
                    </div>
                    <div className={css.formRightBottom}>
                        <div className={css.btnDiv}>
                            <Button
                                type={'submit'}
                                disabled={!isValid}
                                fontColor={'white'}
                                bgColor={'bgBlue'}
                            >
                                Поиск
                            </Button>
                            <p className={css.comment}>* Обязательные к заполнению поля</p>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SearchForm;