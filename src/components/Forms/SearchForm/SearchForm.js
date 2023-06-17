import { React } from 'react';
import css from './SearchForm.module.css';
import Input from '../../Input';
import Button from '../../Button';
import Checkbox from '../../CheckBox';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import histogrReq from '../../../utils/histogramsRequest';
import useFetchData from '../../../hooks/useFetchData.js';
import uniqid from 'uniqid';
import DatePick from '../../DatePick';
import validate from '../../../utils/validateInn.js';

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