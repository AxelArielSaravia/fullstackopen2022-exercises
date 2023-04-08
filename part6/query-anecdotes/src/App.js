import {useQuery} from "react-query";
import anecdoteService from "./services/anecdotes.js";

import AnecdoteForm from "./components/AnecdoteForm.js";
import AnecdoteList from "./components/AnecdoteList.js";
import Notification from "./components/Notification.js";

import {NotificationProvider, useNotificationValue} from "./NotificationContext.js";


function ShowNotification() {
    const content = useNotificationValue();
    if (content === "") {
        return;
    }
    return <Notification text={content}/>;
}

function Content() {
    const result = useQuery(
        "anecdotes",
        anecdoteService.getAll,
        {
            refetchOnWindowFocus: false,
            retry: false
        }
    );

    if (result.isLoading) {
        return <div>Loading...</div>;
    } else if (result.isError) {
        return (
            <Notification
                text="Anecdote service not available due te probles in server"
            />
        );
    } else {
        const anecdotes = result.data;
        return (
            <NotificationProvider>
                <ShowNotification/>
                <AnecdoteList anecdotes={anecdotes}/>
                <br/>
                <AnecdoteForm/>
            </NotificationProvider>
        );
    }
}

function App() {
    return (
        <>
            <h1>Anecdotes App</h1>
            <Content/>
        </>
    );
}

export default App;