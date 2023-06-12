const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    no_of_comments: Number,
    userID : String,
    user : String
}, {
    versionKey: false
})


const NoteModel = mongoose.model("note", notesSchema);

module.exports = { NoteModel };

/**
 * title ==> String
body ==> String
device ==> String
no_of_comments ==> Number
 */