import { React, useEffect } from 'react';
import css from './SearchForm.module.css';
import Input from '../../Input';
import { useForm, Controller } from "react-hook-form";
import Button from '../../Button';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import histogrReq from '../../../utils/histogramsRequest';
import useFetchData from '../../../hooks/useFetchData.js';

const SearchForm = () => {
    //TODO: validation, check different library for date picker and select

    const {idList, histoGram, isLoading, fetch} = useFetchData();
    const selectedData = useSelector((state) => state, shallowEqual);
    const dispatch = useDispatch();
    const token = selectedData.login.token.accessToken;
    
    useEffect(() => {
        // histoGram && dispatch({ type: 'ADD_HISTOGRAM', payload: [histoGram, isLoading] })
        // idList && dispatch({ type: 'ADD_DOC_IDS', payload: idList.items })
    }, [idList, histoGram, dispatch])

    const { register, formState: { errors, isValid }, handleSubmit, control, setError } = useForm({ mode: 'onChange' });

    const onSubmit = data => {
        if (data.dateFrom.$d.getTime() - data.dateTo.$d.getTime() > 0) {
            setError("dateFrom", { type: "required" }, { required: true });
            return;
        }

        dispatch({ type: 'IS_LOADING', payload: true })
        const req = histogrReq(data)
        console.log(req)
        fetch('/api/v1/objectsearch/histograms', req, token, 'searchInstance', 'histoGram');
        fetch('/api/v1/objectsearch', req, token, 'searchInstance', 'idList');
    }
    //console.log(new Date().toISOString().slice(0, 10))
    //console.log(errors);

    const renderAlert = (name) => {
        return (
            errors[name]?.type === 'required' ?
                <p className={css.alert} role="alert">Введите корректные данные</p> :
                <p className={css.isInvisible}>Введите корректные данные</p>
        )
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
                        />
                        {renderAlert('dateFrom')}
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
                        {renderAlert('dateFrom')}
                    </div>
                    <div className={css.formLeftBottom}>
                        <label htmlFor="cb1">Диапазон поиска*</label>
                        <div className={css.formLeftdate}>
                            <Controller
                                control={control}
                                name="dateFrom"
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            sx={{
                                                width: 174,
                                                height: 43,
                                                '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                                    height: 43
                                                },
                                                '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
                                                    paddingLeft: 5
                                                }
                                            }}
                                            onChange={(e) => { field.onChange(e) }} // send value to hook form
                                            selected={field.value}
                                            maxDate={dayjs()}
                                            placeholder=""
                                            slotProps={{ textField: { placeholder: "Дата конца" } }}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                            <Controller
                                control={control}
                                name="dateTo"
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            sx={{
                                                width: 174,
                                                height: 43,
                                                '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                                    height: 43
                                                }
                                            }}
                                            onChange={(e) => { field.onChange(e) }} // send value to hook form
                                            selected={field.value}
                                            maxDate={dayjs()}
                                            slotProps={{ textField: { placeholder: "Дата начала" } }}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </div>

                    </div>
                </div>
                <div className={css.formRight}>
                    <div className={css.checkboxes}>
                        <div>
                            <input
                                {...register("cb1", { required: false })}
                                className={css.checkbox} id="cb1" name="cb1" type="checkbox"
                            />
                            <label htmlFor="cb1">Признак максимальной полноты</label>
                        </div>
                        <div>
                            <input
                                {...register("cb2", { required: false })}
                                className={css.checkbox} id="cb2" name="cb2" type="checkbox"
                            />
                            <label htmlFor="cb2">Упоминания в бизнес-контексте</label>
                        </div>
                        <div>
                            <input
                                {...register("cb3", { required: false })}
                                className={css.checkbox} id="cb3" name="cb3" type="checkbox"
                            />
                            <label htmlFor="cb3">Главная роль в публикации</label>
                        </div>
                        <div>
                            <input
                                {...register("cb4", { required: false })}
                                className={css.checkbox} id="cb4" name="cb4" type="checkbox"
                            />
                            <label htmlFor="cb4">Публикации только с риск-факторами</label>
                        </div>
                        <div>
                            <input
                                {...register("cb5", { required: false })}
                                className={css.checkbox} id="cb5" name="cb5" type="checkbox"
                            />
                            <label htmlFor="cb5">Включать технические новости рынков</label>
                        </div>
                        <div>
                            <input
                                {...register("cb6", { required: false })}
                                className={css.checkbox} id="cb6" name="cb6" type="checkbox"
                            />
                            <label htmlFor="cb6">Включать анонсы и календари</label>
                        </div>
                        <div>
                            <input
                                {...register("cb7", { required: false })}
                                className={css.checkbox} id="cb7" name="cb7" type="checkbox"
                            />
                            <label htmlFor="cb7">Включать сводки новостей</label>
                        </div>
                    </div>
                    <div className={css.formRightBottom}>
                        <div className={css.btnDiv}>
                            <Button
                                type={'submit'}
                                disabled={!isValid}
                                btnClass={'btn22'}
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