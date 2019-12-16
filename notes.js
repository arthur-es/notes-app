const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title == title);
    if (!duplicateNote) {
        console.log(chalk.green(`Note "${title}" saved.`));
        notes.push({
            title, body
        });
        saveNotes(notes);
    } else {
        console.log(chalk.red(`Note title "${title}" already exists.`));
    }
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const notes = JSON.parse(dataBuffer.toString());
        return notes;
    } catch (e) {
        return [];
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
}


module.exports = {
    addNote
};