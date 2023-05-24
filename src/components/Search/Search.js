import React from 'react';
import css from './Search.module.css';
import SearchForm from '../Forms/SearchForm';

const Search = () => {
    return (
        <div className={css.container}>
            <div className={css.searchLeft}>
                <h1 className={css.heading}>Найдите необходимые данные в пару кликов.</h1>
                <div className={css.text}>
                    <p>Задайте параметры поиска.</p>
                    <p>Чем больше заполните, тем точнее поиск</p>
                </div>
                <SearchForm />
            </div>
            <div className={css.searchRight}></div>

        </div>
    )
}

export default Search;