import { useState } from 'react'

function Title({text}) {
    return <h2>{text}</h2>;
}

function Button({onClick,text}) {
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
    if (all < 1) return <p>No feedback given</p>
    return (
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
    );
} 

function GiveFeedback({goodOnClick, neutralOnClick, badOnClick}) {
    return (
        <div>
            <Button onClick={goodOnClick} text="Good"/>
            <Button onClick={neutralOnClick} text="Neutral"/>
            <Button onClick={badOnClick} text="Bad"/>
        </div>
    );
}

function App() {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    return (
        <main>
            <section>
                <Title text="Give feedback"/>
                <GiveFeedback 
                goodOnClick={() => setGood(s => s+1)}
                neutralOnClick={() => setNeutral(s => s+1)}
                badOnClick={() => setBad(s => s+1)}
                />
            </section>
            <section>
                <Title text="Statistics"/>
                <Statistics 
                good={good} 
                neutral={neutral} 
                bad={bad}
                />
            </section>
        </main>
    );
}

export default App;