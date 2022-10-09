import { useState } from 'react'

const Title = ({text}) => <h2>{text}</h2>;

const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text + ": "}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
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

const GiveFeedback = ({goodOnClick, neutralOnClick, badOnClick}) => (
  <div>
    <Button onClick={goodOnClick} text="Good"/>
    <Button onClick={neutralOnClick} text="Neutral"/>
    <Button onClick={badOnClick} text="Bad"/>
  </div>
);

const App = () => {
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
  )
}

export default App;