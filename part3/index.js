const express = require('express');
const app = express();
const morgan = require('morgan')

app.use(express.json());
morgan.token('person', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'));

app.use(express.static('build'));

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get('/api/persons', (req, res) => {
  res.send(persons);
});

app.get('/info', (req, res) => {
  res.write(`<p>Phonebook has info for ${persons.length} people</p>`);
  res.write(`<p>${(new Date()).toString()}</p>`);
  res.end();
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.send(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    persons.filter(they => they !== person);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

const generateId = () => {
  let id;
  do {
    id = Math.floor(Math.random() * 1000) + 1;
  } while (persons.some(person => person.id === id));
  return id;
}

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).send({
      error: 'Missing name or number'
    });
  }

  if (persons.some(person => person.name === name)) {
    return res.status(400).send({
      error: 'Name already exists'
    })
  }

  const person = {
    name,
    number,
    id: generateId()
  }

  persons.concat(person);
  res.send(person);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})