import React from 'react';
import css from './SearchForm.module.css';
import Input from '../../Input';
import { useForm } from "react-hook-form";
import Button from '../../Button';
import useAxios from '../../../hooks/useAxios.js';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';


const SearchForm = () => {
    //const { status, fetch } = useAxios();
    const dispatch = useDispatch();
    //const selectedData = useSelector((state) => state, shallowEqual);
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const { register, formState: { errors, isValid }, handleSubmit } = useForm({ mode: 'onChange' });
    const onSubmit = data => console.log(data);
    //const onChange = data => { console.log(data)} 
    //console.log(errors);

    // const renderAlert = (name) => {
    //     return (
    //         errors[name]?.type === 'required' ?
    //             <p className={css.alert} role="alert">Введите корректные данные</p> :
    //             <p className={css.isInvisible}>Введите корректные данные</p>
    //     )
    // }

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
                        {/* {renderAlert('inn')} */}
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
                    </div>
                    <div className={css.formLeftBottom}>
                        <label htmlFor="cb1">Диапазон поиска*</label>
                        <div className={css.formLeftdate}>
                            <input
                                {...register("dateFrom", { required: true })}
                                className={css.date}
                                id="dateFrom"
                                name="dateFrom"
                                type="date"
                            />
                            <input
                                {...register("dateTo", { required: true })}
                                className={css.date}
                                id="dateTo"
                                name="dateTo"
                                type="date"
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