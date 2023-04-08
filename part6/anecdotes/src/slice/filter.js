import {createSlice} from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: "",
    reducers: {
        change(state, action) {
            return action.payload;
        }
    }
});

const filterActions = filterSlice.actions;
const filterReducer = filterSlice.reducer;

export {
    filterActions,
    filterReducer
};