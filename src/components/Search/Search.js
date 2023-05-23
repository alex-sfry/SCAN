import React from 'react';
import css from './Search.module.css'

const Search = () => {
    return (
        <div className={css.container}>
            <div className={css.searchLeft}>
                <h1 className={css.heading}>Найдите необходимые данные в пару кликов.</h1>
                <div className={css.text}>
                    <p>Задайте параметры поиска.</p>
                    <p>Чем больше заполните, тем точнее поиск</p>
                </div>
                <form className={css.form} action="">
                    <div className={css.formLeft}>

                    </div>
                    <div className={css.formRight}>
                        <div className={css.checkboxes}>
                            <div>
                                <input className={css.checkbox} id="cb1" name="cb1" type="checkbox" />
                                <label htmlFor="cb1">Признак максимальной полноты</label>
                            </div>
                            <div>
                                <input className={css.checkbox} id="cb2" name="cb2" type="checkbox" />
                                <label htmlFor="cb2">Упоминания в бизнес-контексте</label>
                            </div>
                            <div>
                                <input className={css.checkbox} id="cb3" name="cb3" type="checkbox" />
                                <label htmlFor="cb3">Главная роль в публикации</label>
                            </div>
                            <div>
                                <input className={css.checkbox} id="cb4" name="cb4" type="checkbox" />
                                <label htmlFor="cb4">Публикации только с риск-факторами</label>
                            </div>
                            <div>
                                <input className={css.checkbox} id="cb5" name="cb5" type="checkbox" />
                                <label htmlFor="cb5">Включать технические новости рынков</label>
                            </div>
                            <div>
                                <input className={css.checkbox} id="cb6" name="cb6" type="checkbox" />
                                <label htmlFor="cb6">Включать анонсы и календари</label>
                            </div>
                            <div>
                                <input className={css.checkbox} id="cb7" name="cb7" type="checkbox" />
                                <label htmlFor="cb7">Включать сводки новостей</label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className={css.searchRight}></div>

        </div>
    )
}

export default Search;