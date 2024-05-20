// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Giả sử en.js và vi.js là các module ES6 và mỗi module export một object, ví dụ: export default { key: 'value' }
import enUS from './en';
import viVN from './vi';

i18n
    // Kết nối i18n instance to react-i18next logic
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enUS // enUS phải là một object chứa các cặp key-value cho tiếng Anh
            },
            vi: {
                translation: viVN // viVN phải là một object chứa các cặp key-value cho tiếng Việt
            }
        },
        lng: 'en', // Ngôn ngữ mặc định khi khởi động ứng dụng
        fallbackLng: 'en', // Ngôn ngữ dự phòng khi không tìm thấy key trong ngôn ngữ hiện tại

        // Nên giữ nguyên bộ escape mặc định để tránh XSS, trừ khi bạn đã kiểm soát và sanitize output rồi.
        interpolation: {
            escapeValue: false // React đã tự động escape giá trị trước khi render.
        }
    });

export default i18n;
