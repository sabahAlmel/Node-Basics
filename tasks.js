let fs = require("fs");
let path = require("path");
const filename = process.argv[2] || "database.json";
/**
 * Starts the application
 * This is the function that is run when the app starts
 *
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------");
  try {
    let data = fs.readFileSync(path.join(__dirname, "", filename), "utf-8");
    tasks = JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("File not found:", path);
    } else {
      console.error("Error reading the file:", err);
    }
  }
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 *
 * For example, if the user entered
 * ```
 * node tasks.js batata
 * ```
 *
 * The text received would be "batata"
 * This function  then directs to other functions
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 *now if we enter just hello or hello x the result should be 
 hello x! or hello!
 *
 *we create a global variable tasks wich is an empty array
 * we add list command that display all tasks
 * then we do an add command that add task to the array tasks
 * if its just 'add' without anything it give an error
 * and remove command, if we write just 'remove' it remove the last element
 * if we add remove and index it remove this index 
 * but if this index is 0 and less or gratear than the tasks length it give an error
 * so this is the better remove
 * 
 * we put the edit command to edit an existing task
 * if the user enter just edit it give an error
 * else if they enter edit and the new value it will edit the last task
 * else if they enter edit with index and new value it edit this specific task
 * 
 * we add the check/uncheck command so we can now check the done task
 * and uncheck the task we don't need it by doing the variable task an array of object
 * this object containing 2 key(title of the task and done if it's checked or not)
 */
var tasks = [];
function onDataReceived(text) {
  if (text === "quit\n" || text === "exit\n") {
    quit();
  } else if (text.split(" ")[0] === "hello" || text === "hello\n") {
    hello(text.trim());
  } else if (text === "help\n") {
    displayAll("hello", "help", "quit", "exit");
  } else if (text === "list\n") {
    displayTasks(tasks);
  } else if (text.split(" ")[0] === "add") {
    let title = text.slice(4);
    tasks.push({ title: title, done: false });
  } else if (text === "add\n") {
    console.log("error");
  } else if (text === "remove\n") {
    tasks.pop();
  } else if (text.split(" ")[0] === "remove") {
    if (text.split(" ")[1] <= 0 || text.split(" ")[1] > tasks.length)
      console.log("this index not found");
    else tasks.splice(Number(text.split(" ")[1]) - 1, 1);
  } else if (text === "edit\n") {
    console.log("error enter the value or index to edit");
  } else if (
    text.split(" ")[0] === "edit" &&
    isNaN(text.split(" ")[1]) &&
    text.split(" ").length >= 2
  ) {
    tasks[tasks.length - 1] = text.slice(5);
  } else if (text.split(" ")[0] === "edit" && text.split(" ").length >= 3) {
    if (text.split(" ")[1] <= 0 || text.split(" ")[1] > tasks.length)
      console.log("this index not found to edit it");
    else {
      if (text.split(" ")[1] < 10)
        tasks[Number(text.split(" ")[1]) - 1] = text.slice(7);
      else if (text.split(" ")[1] > 10 && text.split(" ")[1] < 100)
        tasks[Number(text.split(" ")[1]) - 1] = text.slice(8);
      else tasks[Number(text.split(" ")[1]) - 1] = text.slice(9);
    }
  } else if (text === "check\n") {
    console.log("error enter the index of the task");
  } else if (text.split(" ")[0] === "check") {
    if (text.split(" ")[1] <= 0 || text.split(" ")[1] > tasks.length)
      console.log("this index not found to edit it");
    else tasks[Number(text.split(" ")[1]) - 1].done = true;
  } else if (text === "uncheck\n") {
    console.log("error enter the index of the task");
  } else if (text.split(" ")[0] === "uncheck") {
    if (text.split(" ")[1] <= 0 || text.split(" ")[1] > tasks.length)
      console.log("this index not found to edit it");
    else tasks[Number(text.split(" ")[1]) - 1].done = false;
  } else {
    unknownCommand(text);
  }
}

// this function take as parameter all the available comment
// and display them when the user enter help
function displayAll(...all) {
  console.log("--------------------");
  all.forEach((value) => {
    console.log(value);
  });
  console.log("--------------------");
}

function displayTasks(tasks) {
  console.log("--------------------");
  tasks.forEach((item) => {
    if (item.done == false) console.log("[ ] " + item.title);
    else console.log("[✓] " + item.title);
  });
  console.log("--------------------");
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"');
}

/**
 * Says hello
 *@param {string} text
 * @returns {void}
 * we take the text with trim so it remove \n and we concat the text with !
 */
function hello(text) {
  console.log(text + "!");
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log("Quitting now, goodbye!");
  const dataToWrite = JSON.stringify(tasks);
  fs.writeFileSync(path.join(__dirname, "", filename), dataToWrite, (err) => {
    console.log(err);
  });
  process.exit();
}

// The following line starts the application
startApp("Sabah Almel");
