const baseURL = "http://localhost:3001/anecdotes";

/*-
resolve :: (Response) -> Promise<object> */
function resolve(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

/*-
getAll :: () -> Promise<object> */
function getAll() {
    return fetch(baseURL).then(resolve);
}

/*-
create :: () -> Promise<object> */
function create(content) {
    const anecdote = {
        content,
        votes: 0
    };
    return (
        fetch(baseURL, {
            body: JSON.stringify(anecdote),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resolve)
    );
}

function changeVote(anecdote) {
    const id = anecdote.id;
    const changedAnecdote = {...anecdote};
    changedAnecdote.votes += 1;
    return (
        fetch(`${baseURL}/${id}`, {
            body: JSON.stringify(changedAnecdote),
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resolve)
    );
}

export default Object.freeze({
    create,
    changeVote,
    getAll
});