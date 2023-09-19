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
    tasks.push(text.split(" ")[1]);
  } else if (text === "add\n") {
    console.log("error");
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
  tasks.forEach((item) => console.log(item));
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
  process.exit();
}

// The following line starts the application
startApp("Sabah Almel");
