import {createContext, useReducer, useContext} from "react";

const NotificationContext = createContext();

function reducer(state, action) {
    const type = action.type;
    if (type === "notification/addAnecdote") {
        return `A new anecdote added: "${action.payload}"`;
    } else if (type === "notification/voteAnecdote") {
        return `anecdote "${action.payload}" voted`;
    } else if (type === "notification/shortAnecdote") {
        return "too short anecdote, must have length 5 or more";
    } else if (type === "notification/clear") {
        return "";
    } else {
        return state;
    }
}

function NotificationProvider({children}) {
    const state = useReducer(reducer, "");
    return (
        <NotificationContext.Provider value={state}>
            {children}
        </NotificationContext.Provider>
    );
}

function useNotificationValue() {
    return useContext(NotificationContext)[0];
}

function useNotificationDispatch() {
    const dispatch = useContext(NotificationContext)[1];
    return function (action) {
        dispatch(action);
        setTimeout(function () {
            dispatch(NotificationActions.clear);
        }, 5000);
    };
}

const NotificationActions = Object.freeze({
    addAnecdote(anecdoteText) {
        console.log(anecdoteText);
        return {
            type: "notification/addAnecdote",
            payload: anecdoteText
        };
    },
    voteAnecdote(anecdoteText) {
        return {
            type: "notification/voteAnecdote",
            payload: anecdoteText
        };
    },
    shortAnecdote: {
        type: "notification/shortAnecdote"
    },
    clear: {
        type: "notification/clear"
    }
});

export {
    NotificationActions,
    NotificationProvider,
    useNotificationDispatch,
    useNotificationValue
};