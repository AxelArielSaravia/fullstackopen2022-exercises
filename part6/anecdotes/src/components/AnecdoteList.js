import {useDispatch, useSelector} from "react-redux";

import {voteThunk} from "../thunks.js";


function sortAnecdotes(a, b) {
    console.log();
    return (
        a.votes < b.votes
        ? 1
        : (
            a.votes > b.votes
            ? -1
            : 0
        )
    );
}

function selectorCb(state) {
    const anecdoteList = Array.from(state.anecdotes);
    const filter = state.filter;
    return (
        filter === ""
        ? anecdoteList.sort(sortAnecdotes)
        : anecdoteList.filter(function (anecdote) {
            return anecdote.content.includes(filter);
        }).sort(sortAnecdotes)
    );
}

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


function AnecdoteList() {
    const dispatch = useDispatch();
    const state = useSelector(selectorCb);

    return state.map(function (anecdote) {
        const id = anecdote.id;
        return (
            <Anecdote
                key={id}
                onClick={function () {
                    dispatch(voteThunk(anecdote));
                }}
                {...anecdote}
            />
        );
    });
}

export default AnecdoteList;