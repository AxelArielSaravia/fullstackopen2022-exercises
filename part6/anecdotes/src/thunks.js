import anecdoteService from "./services/anecdotes.js";

import {anecdoteActions} from "./slice/anecdote.js";
import {notificationActions} from "./slice/notification";

function AnecdoteFormThunk(content) {
    return function (dispatch) {
        return (
            anecdoteService
            .create(content)
            .then(function (anecdote) {
                dispatch(anecdoteActions.create(anecdote));
                dispatch(notificationActions.change({
                    content,
                    type: "add"
                }));
                setTimeout(function () {
                    dispatch(notificationActions.clear());
                }, 5000);
            })
            .catch(function (error) {
                dispatch(notificationActions.change({
                    content,
                    type: "add"
                }));
            })
        );
    };
}

function initializeThunk(dispatch) {
    return anecdoteService.getAll().then(function (anecdotes) {
        dispatch(anecdoteActions.newState(anecdotes));
    });
}

function voteThunk(anecdote, content) {
    return function (dispatch) {
        return (
            anecdoteService.changeVote(anecdote)
            .then(function (data) {
                dispatch(anecdoteActions.vote(data));
                dispatch(notificationActions.change({
                    content,
                    type: "vote"
                }));
                setTimeout(function () {
                    dispatch(notificationActions.clear());
                }, 5000);
            })
        );
    };
}


export {
    AnecdoteFormThunk,
    initializeThunk,
    voteThunk
};