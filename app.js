const yargs = require("yargs");
const { addNote } = require("./notes");

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


yargs.parse();

