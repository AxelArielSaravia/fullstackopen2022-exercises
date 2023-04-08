import { useState } from 'react'

/* -------------------------------------------------------------------------- */
/*                                GLOBAL STATE                                */
/* -------------------------------------------------------------------------- */
const anecdotes = [
  {
    anecdote: 'If it hurts, do it more often.',
    votes: 1
  },
  {
    anecdote: 'Adding manpower to a late software project makes it later!',
    votes: 3
  },
  {
    anecdote: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 4
  },
  {
    anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 2
  },
  {
    anecdote: 'Premature optimization is the root of all evil.',
    votes: 0
  },
  {
    anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0
  },
  {
    anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    votes: 0
  },
];

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
const addAnecdoteVotes = i => { anecdotes[i].votes += 1; }
const selectMostVoteAnecdote = () => {
  let i = 0;
  let max = anecdotes[i].votes
  anecdotes.forEach((val, key) => {
    if (val.votes <= max) return;
    i = key;
    max = val.votes;
  }); 
  console.log("called")
  return anecdotes[i].anecdote;
}
/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */
const Title = ({text}) => <h2>{text}</h2>

const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>;

const Anecdote = ({text}) => <p>{text}</p>;

const ShowVotes = ({index}) => <p><strong>Votes: </strong>{anecdotes[index].votes}</p>;

const App = () => {
  const [selected, setSelected] = useState(0)
  const [, setVote] = useState(false);
  const mostVotedAnecdote = selectMostVoteAnecdote();
  const handleVote = () => {
    addAnecdoteVotes(selected);
    setVote(s => !s);
  }

  const handleNext = () => {
    if (selected + 1 >=  anecdotes.length) setSelected(() => 0);
    setSelected(s => s+1);
  }

  return (
    <main>
      <section>
        <Title text="Anecdote of the day"/>
        <div>
          <Button onClick={handleVote} text="vote"/>
          <Button onClick={handleNext} text="next anecdote"/>
        </div>
        <ShowVotes index={selected}/>
        <Anecdote text={anecdotes[selected].anecdote}/>
      </section>
      <section>
        <Title text="Anecdote with most votes"/>
        <Anecdote text={mostVotedAnecdote}/>
      </section>
    </main>
  )
}

export default App