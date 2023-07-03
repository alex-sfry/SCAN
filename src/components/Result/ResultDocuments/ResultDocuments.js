import React from 'react';
import css from './ResultDocuments.module.css';
import { useSelector, shallowEqual } from 'react-redux';
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
                        return <li key={item.ok.id}><DocCard content={item.ok} /></li>
                    })
                }
            </div>
            {
                selectedData.query.loadedDocsQty < selectedData.query.docIDs.length ?
                    <div className={css.btnDiv}>
                        <Button
                            type={'button'}
                            disabled={''}
                            fontColor={'white'}
                            bgColor={'bgBlue'}
                            handleClick={handleClick}
                        >
                            Показать больше
                        </Button>
                    </div> : null
            }
           
        </div>
    )

}

export default ResultDocuments;