import React, { useState } from 'react';
import { ConfigProvider, Button } from 'antd';
import viVN from '../../locales/vi_VN'
import enUS from '../../locales/en_US';

const Test = () => {
    const [locale, setLocale] = useState(viVN); // Ngôn ngữ mặc định là tiếng Việt

    const toggleLocale = () => {
        const newLocale = locale === viVN ? enUS : viVN;
        setLocale(newLocale);
    };

    return (
        <ConfigProvider locale={locale}>
            <div style={{ padding: 24 }}>
                <h1>Ant Design Example</h1>
                <Button onClick={toggleLocale}>Toggle Language</Button>
            </div>
        </ConfigProvider>
    );
};

export default Test;
