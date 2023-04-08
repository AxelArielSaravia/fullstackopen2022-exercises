import AnecdoteForm from "./components/AnecdoteForm.js";
import AnecdoteList from "./components/AnecdoteList.js";
import Filter from "./components/Filter.js";
import Notification from "./components/Notification.js";

function App() {
    return (
        <>
            <h1>Anecdotes</h1>
            <Notification/>
            <br/>
            <Filter/>
            <AnecdoteList/>
            <AnecdoteForm/>
        </>
    );
}

export default App;