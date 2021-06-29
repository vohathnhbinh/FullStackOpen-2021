import React, { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.content}</button>
  );
};

const Feedback = (props) => {
  const {handleGood, handleNeutral, handleBad} = props.handleClicks;
  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} content="good" />
      <Button handleClick={handleNeutral} content="neutral" />
      <Button handleClick={handleBad} content="bad" />
    </>
  );
};

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.text === "positive" ? "%" : ""}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const {good, neutral, bad} = props.feedback;
  const sum = good + neutral + bad;
  if (sum === 0)
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="total" value={sum} />
          <Statistic text="average" value={sum / 3} />
          <Statistic text="positive" value={(good / sum) * 100} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClicks = {
    handleGood: () => {
      setGood(good + 1);
    },
    handleNeutral: () => {
      setNeutral(neutral + 1);
    },
    handleBad: () => {
      setBad(bad + 1);
    }
  };

  return (
    <>
      <Feedback handleClicks={handleClicks} />
      <Statistics feedback={{good, neutral, bad}}/>
    </>
  );
};

export default App;