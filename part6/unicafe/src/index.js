import ReactDOM from "react-dom/client";
import {createStore} from "redux";

import counterReducer from "./reducer.js";

import "./index.css";

const store = createStore(counterReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));


const actions = Object.freeze({
    addGood: {type: "add good"},
    addOk: {type: "add ok"},
    addBad: {type: "add bad"},
    reset: {type: "reset"}
});

function addGood() {
    store.dispatch(actions.addGood);
}
function addOk() {
    store.dispatch(actions.addOk);
}
function addBad() {
    store.dispatch(actions.addBad);
}
function reset() {
    store.dispatch(actions.reset);
}

function Title({text}) {
    return <h2>{text}</h2>;
}

function Button({onClick, text}) {
    return <button onClick={onClick}>{text}</button>;
}

function StatisticLine({text, value}) {
    return (
        <tr>
            <td>{text + ": "}</td>
            <td>{value}</td>
        </tr>
    );
}

function Statistics({good, neutral, bad}) {
    const all = good + neutral + bad;
    const average = good - bad;
    return (
        all < 1
        ? <p>No feedback given</p>
        : (
            <table>
                <tbody>
                    <StatisticLine text="Good" value={good}/>
                    <StatisticLine text="Neutral" value={neutral}/>
                    <StatisticLine text="Bad" value={bad}/>
                    <StatisticLine text="All" value={all}/>
                    <StatisticLine text="Average" value={(average/all).toFixed(2)}/>
                    <StatisticLine text="Positive" value={Math.floor(good / all * 100) + "%"}/>
                </tbody>
            </table>

        )
    );
} 

function GiveFeedback() {
    return (
        <div>
            <Button onClick={addGood} text="Good"/>
            <Button onClick={addOk} text="Ok"/>
            <Button onClick={addBad} text="Bad"/>
            <Button onClick={reset} text="resetStats"/>
        </div>
    );
}

function App() {
    const {good, ok, bad} = store.getState();
    return (
        <main>
            <section>
                <Title text="Give feedback"/>
                <GiveFeedback/>
            </section>
            <section>
                <Title text="Statistics"/>
                <Statistics 
                    good={good} 
                    neutral={ok} 
                    bad={bad}
                />
            </section>
        </main>
    );
}

function renderApp() {
    root.render(<App/>)
}
renderApp();

store.subscribe(renderApp);