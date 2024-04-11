// languageSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const languageSlice = createSlice({
    name: 'language',
    initialState: {
        value: 'en', // hoặc ngôn ngữ mặc định của bạn
    },
    reducers: {
        toggleLanguage: (state) => {
            state.value = state.value === 'en' ? 'vn' : 'en'; // chuyển đổi ngôn ngữ
        },
    },
});

export const { toggleLanguage } = languageSlice.actions;

export const selectLanguage = (state) => state.language.value;

export default languageSlice.reducer;
