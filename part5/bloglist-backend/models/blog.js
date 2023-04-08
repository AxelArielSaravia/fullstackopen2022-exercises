const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    author: String,
    likes: Number,
    title: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    },
    user: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
    }
});

blogSchema.set("toJSON", {
    transform: function (document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;