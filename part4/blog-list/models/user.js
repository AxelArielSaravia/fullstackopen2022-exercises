const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    blogs: [{
        ref: "Blog",
        type: mongoose.Schema.Types.ObjectId
    }],
    passwordHash: String,
    username:{
        required: true,
        type: String,
        unique: true
    }
});

userSchema.set("toJSON", {
    transform: function (document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;