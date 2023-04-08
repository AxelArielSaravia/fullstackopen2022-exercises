import {useMutation, useQueryClient} from "react-query";

import {useNotificationDispatch, NotificationActions} from "../NotificationContext.js";

import anecdoteService from "../services/anecdotes.js";

const anecdoteStyle = {
    border: "2px solid",
    borderRadius: "10px",
    margin: "5px",
    padding: "5px"
};

function Anecdote({content, votes, onClick}) {
    return (
        <div style={anecdoteStyle}>
            <p>{content}</p>
            <div>
                <span>has {votes} {votes === 1 ? "vote" : "votes"} </span>
                <button onClick={onClick}>+</button>
            </div>
        </div>
    );
}

function findIndex(anecdote, i, anecdotes) {
    const boolean = this.id !== anecdote.id;
    if (!boolean) {
        anecdotes[i] = this.changed;
    }
    return boolean;
}

function AnecdoteList({anecdotes}) {
    const notificationDispatch = useNotificationDispatch();
    const QC = useQueryClient();
    const anecdotesMutation = useMutation(
        anecdoteService.changeVote,
        {
            onSuccess(changed) {
                const id = changed.id;
                const anecdotes = QC.getQueryData("anecdotes");
                notificationDispatch(
                    NotificationActions.voteAnecdote(changed.content)
                );
                anecdotes.every(findIndex, {id, changed});
                QC.setQueryData("anecdotes", anecdotes);
            }
        }
    );

    return anecdotes.map(function (anecdote) {
        const id = anecdote.id;
        return (
            <Anecdote
                key={id}
                onClick={function () {
                    anecdotesMutation.mutate(anecdote);
                }}
                {...anecdote}
            />
        );
    });
}

export default AnecdoteList;