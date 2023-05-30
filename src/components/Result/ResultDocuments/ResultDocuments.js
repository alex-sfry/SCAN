import React from 'react';
import css from './ResultDocuments.module.css';
import { useSelector, shallowEqual } from 'react-redux';
import uniqid from 'uniqid';
import Button from '../../Button';
import DocCard from '../DocCard';

const ResultDocuments = ({ handleClick }) => {
    const selectedData = useSelector((state) => state, shallowEqual);

    return (
        <div className={css.resDocConatiner}>
            <h2 className={css.resDocCHeading}>Список документов</h2>
            <div className={css.cardsContainer}>
                {
                    Object.hasOwn(selectedData.query, 'docs') &&
                    selectedData.query.docs.map(item => {
                        return <li key={uniqid()}><DocCard content={item.ok.id} /></li>
                    })
                }
            </div>
            <div className={css.btnDiv}>
                <Button
                    type={'button'}
                    disabled={''}
                    btnClass={'btn22'}
                    fontColor={'white'}
                    bgColor={'bgBlue'}
                    handleClick={handleClick}
                >
                    Показать больше
                </Button>
            </div>
        </div>
    )

}

export default ResultDocuments;