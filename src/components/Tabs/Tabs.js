import React from 'react';
import css from './Tabs.module.css';
import uniqid from 'uniqid';

const Tabs = ({ config, activeTab, id, handleClick }) => {
    
    return (
        config.map((item, index) => {
            return <div
                key={uniqid()}
                className={activeTab === index ? `${css.tab} ${css.isActive}` : css.tab}
                onClick={() => handleClick(index)}
            >
                <button id={id} className={css.tabBtn}>{item}</button>
                <span className={activeTab === index ? `${css.tab} ${css.isActive}` : undefined}></span>
            </div>
        })
    )
}

export default Tabs;