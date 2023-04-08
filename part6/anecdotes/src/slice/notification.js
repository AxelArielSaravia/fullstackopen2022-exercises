import {createSlice} from "@reduxjs/toolkit";

const initNotificationState = {
    content: "",
    type: ""
};

const notificationSlice = createSlice({
    name: "notification",
    initialState: initNotificationState,
    reducers: {
        change(state, action) {
            const {content, type} = action.payload;

            return {
                content,
                type
            };
        },
        clear() {
            return initNotificationState;
        }
    }
});

const notificationActions = notificationSlice.actions;
const notificationReducer = notificationSlice.reducer;

export {
    notificationActions,
    notificationReducer
};