import {configureStore} from "@reduxjs/toolkit";

import {anecdoteReducer} from "./slice/anecdote.js";
import {filterReducer} from "./slice/filter.js";
import {notificationReducer} from "./slice/notification.js";

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
});

export default store;