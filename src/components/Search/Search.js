import React from 'react';
import css from './Search.module.css';
import SearchForm from '../Forms/SearchForm';
import { useSelector, shallowEqual } from 'react-redux';
import Result from '../Result';

const Search = () => {
    const selectedData = useSelector((state) => state, shallowEqual);
    //console.log('selectedData', selectedData)

    const renderConditions = () => {
        if (Object.hasOwn(selectedData.query, 'histIsLoading')) {
            return <Result />
        } else return <div className={css.container}>
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
            
        
    }

    return (
        <> 
            {renderConditions()}
        </>
            
        
    )
}

export default Search;