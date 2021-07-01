import React from 'react'

const Header = props => {
  return (
    <h2>{props.course_name}</h2>
  );
};

const Part = props => {
  return (
    <p>{props.name} {props.exercises}</p>
  );
};

const Content = props => {
  return (
    <>
      {props.parts.map(part => {
        return <Part key={part.id} name={part.name} exercises={part.exercises} />
      })}
    </>
  );
};

const Total = props => {
  return (
    <p>
      Number of exercises {props.parts.reduce((sum, part) => {
        return sum + part.exercises;
      }, 0)}
    </p>
  );
};

const Course = props => {
  const {course} = props;
  return (
    <>
      <Header course_name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
}

export default Course;