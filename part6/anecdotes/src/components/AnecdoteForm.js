import {useDispatch} from "react-redux";

import {AnecdoteFormThunk} from "../thunks.js";

function AnecdoteForm() {
    const dispatch = useDispatch();
    function submitAnecdote(event) {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.reset();
        dispatch(AnecdoteFormThunk(content));
    }

    return (
        <div>
            <h2>Add an Anecdote</h2>
            <form onSubmit={submitAnecdote}>
                <textarea name="anecdote" rows="4"/>
                <br/>
                <button type="submit">add</button>
            </form>
        </div>
    );
}

export default AnecdoteForm;