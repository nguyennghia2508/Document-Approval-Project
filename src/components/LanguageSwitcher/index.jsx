import React, { useState } from 'react';
import { Image } from 'antd';

const LanguageSwitcher = () => {
    const [language, setLanguage] = useState('VN');

    const toggleLanguage = () => {
        setLanguage(language === 'VN' ? 'EN' : 'VN');
    };

    return (
        <div className='footer-lang' onClick={toggleLanguage}>
            {language === 'VN' ? (
                <>
                    <Image preview={false} src='/vietnam.svg'></Image>
                    <span>VN</span>
                </>
            ) : (
                <>
                    <Image preview={false} src='/united-states.svg'></Image>
                    <span>EN</span>
                </>
            )}
        </div>
    );
};

export default LanguageSwitcher;
