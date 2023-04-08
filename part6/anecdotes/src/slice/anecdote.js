import {createSlice} from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
    name: "anecdote",
    initialState: [],
    reducers: {
        create(state, action) {
            return [
                ...state,
                action.payload
            ];
        },
        newState(_, action) {
            return action.payload;
        },
        vote(state, action) {
            const changedAnecdote = action.payload;
            const id = changedAnecdote.id;
            const newState = [];
            for (
                let i = 0,
                    length = state.length;
                i < length;
                i += 1
            ) {
                newState.push(
                    state[i].id === id
                    ? changedAnecdote
                    : {...state[i]}
                );
            }
            return newState;
        }
    }
});

const anecdoteActions = anecdoteSlice.actions;
const anecdoteReducer =  anecdoteSlice.reducer;

export {
    anecdoteActions,
    anecdoteReducer,
};