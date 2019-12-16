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

const deleteNote = (title) => {
    const notes = loadNotes();
    const noteFound = notes.find((note) => note.title == title);
    if (!noteFound) {
        console.log(chalk.red(`Note "${title}" does not exist.`));
    } else {
        const notesToKeep = notes.filter((note) => {
            return note.title != title;
        });
        saveNotes(notesToKeep);
        console.log(chalk.green(`Note "${title}" ${chalk.greenBright("deleted")}.`));
    }
};

const listNotes = () => {
    const notes = loadNotes();
    if (!isEmpty()) {
        console.log(chalk.blueBright.inverse("Your notes: "));
        notes.forEach(note => {
            console.log(chalk.gray.inverse.italic.bold(note.title));
        });
    }
};

const readNote = (title) => {
    if (!isEmpty()) {
        const notes = loadNotes();
        const noteFound = notes.find((note) => note.title == title);
        if (noteFound) {
            console.log(chalk.magenta.inverse.italic(`Your note "${title}" says:`) + " " + chalk.bgBlueBright(`${noteFound.body}`));
        } else {
            console.log(chalk.red(`Note "${title}" does not exist.`));
        }
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("../data/notes.json");
        const notes = JSON.parse(dataBuffer.toString());
        return notes;
    } catch (e) {
        return [];
    }
}

const isEmpty = () => {
    const notes = loadNotes();
    if (notes.length == 0) {
        console.log(chalk.blueBright.inverse("You don't have any notes yet."));
        console.log(chalk.magentaBright(`You can create one using the "add" command.`));
        return true;
    } else {
        return false;
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("../data/notes.json", dataJSON);
}


module.exports = {
    addNote,
    listNotes,
    deleteNote,
    readNote
};