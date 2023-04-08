const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();
const Phonebook = require("./models/person.js");

const app = express();


/* -------------------------------------------------------------------------- */
/*                                Morgan tokens                               */
/* -------------------------------------------------------------------------- */
morgan.token("body", function (req) {
  if (Object.keys(req.body).length === 0) return "";
  return JSON.stringify(req.body);
});

/* -------------------------------------------------------------------------- */
/*                                 MIDDLEWARES                                */
/* -------------------------------------------------------------------------- */
app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
app.use(express.static("build"));

/* -------------------------------------------------------------------------- */
/*                                 HTTP RUTES                                 */
/* -------------------------------------------------------------------------- */

/* ----------------------------- */
/*             /info             */
/* ----------------------------- */

app.get("/info", (_, response) => {
  Phonebook.find({}).then(phonebook => {
    response.send(`
      <h1>Phonebook Info</h1>
      <p>Phonebook has info for ${phonebook.length} people</p>
      <p>Date request: ${new Date()}</p>
    `);
  });
});

/* ----------------------------- */
/*         /api/persons          */
/* ----------------------------- */

app.get("/api/persons", (_, response) => {
  Phonebook.find({}).then(phonebook => { response.json(phonebook); });
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  //console.log("body",body);
  if (!body || (typeof body !== "object" && (!("name" in body) || !("number" in body)))) {
    return response.status(400).json({ error: "content missing" });
  }
  const person = new Phonebook({
    name: body.name,
    number: body.number
  });
  person.save()
    .then(savedPerson => {
      console.log(savedPerson);
      response.json(savedPerson);
    })
    .catch(error => next(error));
});

/* ----------------------------- */
/*       /api/persons/:id        */
/* ----------------------------- */

app.get("/api/persons/:id", (request, response) => {
  Phonebook.findById(request.params.id)
    .then(person => { response.json(person); })
    .catch(error => {
      console.error(error);
      response.status(404).end();
    });
});


app.delete("/api/persons/:id", (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then(() => { response.status(204).end(); })
    .catch(error => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  if (!body) return response.status(404).end();

  const person = {
    name: body.name,
    number: body.number
  };

  Phonebook.findByIdAndUpdate(
    request.params.id,
    person,
    { new: true, runValidators: true, context: "query" }
  )
    .then(updatedPerson => { response.json(updatedPerson); })
    .catch(error => next(error));
});

/* -------------------------------------------------------------------------- */
/*                               ERROR MIDLEWARE                              */
/* -------------------------------------------------------------------------- */
const errorHandler = (error, _, response, next) => {
  console.error(error.message);

  if (error.name === "CastError")
    return response.status(400).json({ error: "malformatted id" });
  else if (error.name === "ValidationError")
    return response.status(400).json({ error: error.message });

  next(error);
};

app.use(errorHandler);

/* -------------------------------------------------------------------------- */
/*                                   LISTEN                                   */
/* -------------------------------------------------------------------------- */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });