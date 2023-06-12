import React from 'react';
import css from './DocCard.module.css';
import noImage from '../../../assets/images/no-image.png';

const parseImg = (xml) => {
    const imgRegExp = /img src=".+?"/i;
    const img = xml.match(imgRegExp);

    if (img) {
        return img[0].slice(img[0].indexOf('"') + 1, -1);
    } else return noImage;
}

const parseText = (xml) => {
    const regexp = /<.+?>/gi;
    const rnRegExp = /[\r\n]/gi;
    const parser = new DOMParser();

    const parsedXML = parser.parseFromString(xml, 'text/xml')
    const sentences = [...parsedXML.querySelectorAll('sentence')];

    //get first 6 sentences
    const text = sentences.map((sentence, index) => {
        if (index > 5) return null;
        return [...sentence.childNodes].map(item => {
            if (item.childNodes.length > 1) {
                return [...item.childNodes].map(item => {
                    return item.textContent.trim()
                })
            } else return item.textContent.trim()
        }).join(' ')
    })

    const joinedText = text.join(' ');

    //remove all html tags
    const cleanText = joinedText.replaceAll(regexp, '')

    //add <p> tags
    const cleanText4 = cleanText.replaceAll(rnRegExp, '</p><p>');
    const finalText = '<p>' + cleanText4 + '<span>   ...</span>';
    
    return {__html: finalText};
}

const DocCard = ({ content }) => {
    return (
        <div className={css.docCard}>
            <div className={css.cardHeader}>
                <span>{new Date(content.issueDate).toLocaleDateString('ru-RU')}</span>
                <span>{content.source.name}</span>
            </div>
            <h3 className={css.cardTitle}>{content.title.text}</h3>
            <span className={css.cardBadge}>Технические новости</span>
            <div className={css.cardImage}>
                <img src={parseImg(content.content.markup)} alt="" className={css.cardImg}/>
            </div>
            <div className={css.cardText} dangerouslySetInnerHTML={parseText(content.content.markup)} />          
            <div className={css.cardFooter}>
                <div className={css.cardBtn}>
                    <a href={content.url} target='_blank' rel='noreferrer'>Читать в источнике</a>
                </div>
                <span className={css.cardStats}>{content.attributes.wordCount} слов</span>
            </div>
        </div>
    )
}

export default DocCard;