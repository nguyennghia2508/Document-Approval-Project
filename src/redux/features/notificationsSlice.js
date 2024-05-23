// notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {

        showNotification(state, action) {
            state.loading = false;
            state.data = action.payload;
        },

    },
});

export const {
    fetchNotificationsStart,
    fetchNotificationsSuccess,
    fetchNotificationsFailure,
} = notificationSlice.actions;

export default notificationSlice.reducer;
