import React, { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.content}</button>
  );
};

const Anecdote = (props) => {
  if (props.anecdote === undefined)
    return (
      <>
        <h1>{props.header}</h1>
        <p>No anecdote has been voted</p>
      </>
    )
  return (
    <>
      <h1>{props.header}</h1>
      <p>{props.anecdote}</p>
      <p>has {props.vote} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ];
   
  const [selected, setSelected] = useState(0);

  const getRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [max_selected, setMaxSelected] = useState(-1)

  const updateVote = (index) => {
    return () => {
      const copy = [...votes];
      ++copy[index];
      setVotes(copy);

      const max = Math.max(...copy);
      setMaxSelected(copy.findIndex(element => element === max));
    }
  }

  return (
    <>
      <Anecdote
        header="Anecdote of the day"
        anecdote={anecdotes[selected]}
        vote={votes[selected]}
      />
      <Button handleClick={updateVote(selected)} content="vote" />
      <Button handleClick={getRandomAnecdote} content="next anecdote" />
      <Anecdote
        header="Anecdote with most votes"
        anecdote={anecdotes[max_selected]}
        vote={votes[max_selected]}
      />
    </>
  );
};

export default App;