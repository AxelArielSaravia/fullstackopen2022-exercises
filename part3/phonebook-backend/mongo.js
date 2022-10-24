const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide the password as an argument: node mongo.js <password>");
  process.exit(1);
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model("Phonebook", personSchema);

const password = encodeURIComponent(process.argv[2]);
const url = `mongodb+srv://axel:${password}@cluster0.oqdlw.mongodb.net/fullstackopen_phonebook?retryWrites=true&w=majority`;

if (process.argv.length === 3) {
  mongoose.connect(url)
    .then(() => {
      Phonebook.find({}).then(result => {
        console.log("phonebook:");
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
      });
    })
    .catch((err) => console.log(err));

} else if (process.argv.length > 4) {
  mongoose.connect(url)
    .then(() => {
      const person = new Phonebook({
        name: String(process.argv[3]),
        number: String(process.argv[4]),
      });
      return person.save();
    })
    .then(() => {
      console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`);
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));

} else {
  console.log("Please provide a password, a name and a number as an argument: node mongo.js <password> <name> <number>");
  process.exit(1);
}