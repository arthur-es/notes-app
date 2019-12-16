const yargs = require("yargs");
const { addNote, deleteNote, listNotes, readNote } = require("./notes");

//Create command to add a note
yargs.command({
    command: "add",
    describe: "Add a note.",
    builder: {
        title: {
            describe: "The note's title.",
            type: "string",
            demandOption: true
        },
        body: {
            describe: "The note's content.",
            type: "string",
            demandOption: true
        }
    },
    handler(argv) {
        addNote(argv.title, argv.body);
    }
});


//Create command to delete a note
yargs.command({
    command: "delete",
    describe: "Delete a note.",
    builder: {
        title: {
            describe: "The note's title.",
            type: "string",
            demandOption: true
        }
    },
    handler(argv) {
        deleteNote(argv.title);
    }
});

//Create command to read a note
yargs.command({
    command: "read",
    describe: "Read a note.",
    builder: {
        title: {
            describe: "The note's title.",
            type: "string",
            demandOption: true
        }
    },
    handler(argv) {
        readNote(argv.title);
    }
});

//Create command to list all notes
yargs.command({
    command: "list",
    describe: "List all notes.",
    handler() {
        listNotes();
    }
});


yargs.parse();

