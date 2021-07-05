import React from "react";

const Person = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.number}</td>
      <td>
        <button onClick={props.handleDelete} id={props.id}>
          delete
        </button>
      </td>
    </tr>
  );
};

const Persons = (props) => {
  if (props.filtered_persons === "EMPTY") return <p>No person found</p>;
  else if (!(props.filtered_persons.length === 0))
    return (
      <table>
        <tbody>
          {props.filtered_persons.map((person) => {
            return (
              <Person
                key={person.id}
                name={person.name}
                number={person.number}
                handleDelete={props.handleDelete}
                id={person.id}
              />
            );
          })}
        </tbody>
      </table>
    );

  return (
    <table>
      <tbody>
        {props.persons.map((person) => {
          return (
            <Person
              key={person.id}
              name={person.name}
              number={person.number}
              handleDelete={props.handleDelete}
              id={person.id}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Persons;
