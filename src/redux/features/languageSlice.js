import { createSlice } from '@reduxjs/toolkit';
import i18n from '../../locales/i18n'; // Đường dẫn đến file i18n

export const languageSlice = createSlice({
    name: 'language',
    initialState: {
        lang: 'en', // hoặc 'vi' tùy vào ngôn ngữ mặc định bạn muốn
    },
    reducers: {
        setLanguage: (state, action) => {
            state.lang = action.payload;
            i18n.changeLanguage(action.payload);
        },
    },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
