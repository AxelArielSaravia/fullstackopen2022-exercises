import {useMutation, useQueryClient} from "react-query";

import {useNotificationDispatch, NotificationActions} from "../NotificationContext.js";

import anecdoteService from "../services/anecdotes.js";

const textAreaStyle ={
    width: "90%"
};

function AnecdoteForm() {
    const notificationDispatch = useNotificationDispatch();
    const QC = useQueryClient();
    const anecdotesMutation = useMutation(
        anecdoteService.create,
        {
            onSuccess(newAnecdote) {
                const anecdotes = QC.getQueryData("anecdotes");
                notificationDispatch(
                    NotificationActions.addAnecdote(newAnecdote.content)
                );
                QC.setQueryData(
                    "anecdotes",
                    Array.prototype.concat.call(anecdotes, newAnecdote)
                );
            },
            onError(error) {
                console.log(error);
                notificationDispatch(
                    NotificationActions.shortAnecdote
                );
            }
        }
    );

    function submitAnecdote(event) {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.reset();
        anecdotesMutation.mutate(content);
    }

    return (
        <div>
            <h2>Add an Anecdote</h2>
            <form onSubmit={submitAnecdote}>
                <textarea name="anecdote" rows="4" style={textAreaStyle}/>
                <br/>
                <button type="submit">add</button>
            </form>
        </div>
    );
}

export default AnecdoteForm;