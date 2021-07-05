import React, { useState, useEffect } from "react";
import AddForm from "./Components/AddForm";
import Persons from "./Components/Persons";
import Filter from "./Components/Filter";
import personService from "./services/persons";
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [new_name, setNewName] = useState("");
  const [new_number, setNewNumber] = useState("");
  const [name_filter, setFilter] = useState("");
  const [filtered_persons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [msgType, setMsgType] = useState(null);

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    setMsgType("success");

    const thisPerson = persons.find((person) => person.name === new_name);
    if (thisPerson) {
      const result = window.confirm(
        `${new_name} is already added to phonebook, replace the old number with the new one?`
      );
      if (result) {
        const updatedPerson = { ...thisPerson, number: new_number };

        personService
          .update(updatedPerson.id, updatedPerson)
          .then((res) => {
            setPersons(
              persons.map((person) => {
                return person.id !== updatedPerson.id ? person : res.data;
              })
            );
            setNewName("");
            setNewNumber("");
            setFilter("");
            setFilteredPersons([]);

            setMessage(
              `${res.data.name}'s number has been updated with ${res.data.number}`
            );
          })
          .catch((err) => {
            setMsgType("error");
            setMessage(err.response.data);
          })
          .catch((err) => {
            setMsgType("error");
            setMessage(`${updatedPerson.name} has already been removed`);
            setPersons(
              persons.filter((person) => person.id !== updatedPerson.id)
            );
          });
      }
    } else {
      const new_person = {
        name: new_name,
        number: new_number,
      };

      personService
        .create(new_person)
        .then((res) => {
          setPersons(persons.concat(res.data));
          setNewName("");
          setNewNumber("");
          setFilter("");
          setFilteredPersons([]);

          setMessage(`${res.data.name} added`);
        })
        .catch((err) => {
          setMsgType("error");
          setMessage(err.response.data);
        });
    }

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    const new_name_filter = event.target.value;
    setFilter(new_name_filter);

    if (!(new_name_filter.length === 0)) {
      const temp = persons.filter((person) => {
        return person.name
          .toUpperCase()
          .includes(new_name_filter.toUpperCase());
      });
      if (temp.length === 0) setFilteredPersons("EMPTY");
      else setFilteredPersons(temp);
    } else setFilteredPersons([]);
  };

  const handleDelete = (event) => {
    setMsgType("error");
    const thisId = event.target.getAttribute("id");
    const thisPerson = persons.find((person) => person.id === thisId);
    const result = window.confirm(`Delete ${thisPerson.name}?`);

    if (result)
      personService.remove(thisId).then((res) => {
        setPersons(
          persons.filter((person) => {
            return person.id !== thisId;
          })
        );

        setMessage(`${thisPerson.name} deleted`);
      });

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Notification message={message} msgType={msgType} />
      <Filter
        handleFilterChange={handleFilterChange}
        name_filter={name_filter}
      />

      <h1>Add a new</h1>
      <AddForm
        handleSubmit={addPerson}
        handleNameChange={handleNameChange}
        new_name={new_name}
        handleNumberChange={handleNumberChange}
        new_number={new_number}
      />

      <h1>Numbers</h1>
      <Persons
        persons={persons}
        filtered_persons={filtered_persons}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default App;
