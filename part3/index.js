require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(express.static('build'));

app.use(express.json());
app.use(cors());
morgan.token('person', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :person'
  )
);

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    res.write(`<p>Phonebook has info for ${persons.length} people</p>`);
    res.write(`<p>${new Date().toString()}</p>`);
    res.end();
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((result) => {
      console.log(result);
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  // if (!name || !number) {
  //   return res.status(400).send({
  //     error: "Missing name or number",
  //   });
  // }

  // Person.find({ name }).then((persons) => {
  //   if (persons.length > 0) {
  //     return res.status(400).send({
  //       error: "Name already exists",
  //     });
  //   }
  // });

  const person = new Person({ name, number });

  person
    .save()
    .then((result) => {
      res.json(person);
    })
    .catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;

  const { name, number } = req.body;

  const person = { name, number };

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});

app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
});

app.use((err, req, res, next) => {
  console.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(err);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
