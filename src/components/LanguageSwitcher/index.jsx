import React from 'react';
import { Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux/features/languageSlice';

const LanguageSwitcher = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.language.lang);

    const handleLanguageChange = () => {
        const newLang = lang === 'vi' ? 'en' : 'vi';
        dispatch(setLanguage(newLang));
    };

    return (
        <div className='footer-lang' onClick={handleLanguageChange}>
            <Image
                preview={false}
                src={lang === 'vi' ? '/vietnam.svg' : '/united-states.svg'}
            />
            <span>{lang.toUpperCase()}</span>
        </div>
    );
};

export default LanguageSwitcher;
