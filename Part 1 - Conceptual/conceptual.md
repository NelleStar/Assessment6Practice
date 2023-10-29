### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  - In JS there are 2 common ways to work with async code
    - callback functions:
      - a function passed as an argument invoked to complete a routine/action
      - allows JS to continue execution without a long wait
      - can be messy if nested or many
      - callback hell
      - commonly used in scenarios where we work with older async APIs that rely on them still
    - promises:
      - one time guarantee for future value (pending, resolved, rejected)
      - axios library  is a promise based ajax library used to make HTTP request that does 
      - NOT support callbacks
      - then/catch method:
        - methods on a promise 
        - schedule a callback to be executed when resolved or rejected
        - both methods take a function as an argument
    - async/await method: 
      - promise based code flow built of the promises and designed to make async code more readable and maintainable 
      - uses async and await keywords to define and pause the execution of code
      - can use rejected promises to throw errors
 

- What is a Promise?
  -   object representing the eventual completion/failure of an async operation
  -   placeholder
  -   flexible control flow
  -   core part of async code and play a crucial role in managing complex operations

- What are the differences between an async function and a regular function?
  - async function always returns a promise which allows use to work in a more structured and straightforwad way where as regular functions return their result immediately
  - async functions pause their execution while other code runs while its waiting for its operation to complete where as regular code will pause the rest of the code until its done
  - error handling is easier with async functions as we can use the try/catch blocks and regular functions are manually stated 

- What is the difference between Node.js and Express.js?
  - Node is a technology that allows us to run JS on the server side (no DOM) that has access to a large set of libraries via npm and excels as handling simultaneous events and data streaming. It is built on a Chrome engine, is lightweight and efficient!
  - Express is a framework for Node that is designed for building apps and APIs. It is the backend part of Mean (a free opensource JS software stack)
  - simplifies web building by providing a set of tools 
  - focused on creating serves and routing HTTP requests

- What is the error-first callback pattern?
  - a way to handle errors in functions that operate asynchromously
  - is a function that returns an error object whenever any successful data is returned by the function
  - the first argument is reserved for the err obj by the func
  - the err obj is set to null when no error occurs but will describe the nature of the error if one does occur
 

- What is middleware?
  - key concept in many web frameworks
  - easy way of running code in the middle of request response cycle thus allowing us to modify/enhance the objects
  - can be used to parse request body as JSON, handle errors, authenticate users, log information, reduces code duplication
  - functions that have access to the request object, response object and the next function in the req/res cycle
  - can execute code, make changes to the objects listed, end the response cycle, and call the 'next' function
  - placement is important - if at the top of the file/global it will run for every request but if its after a route it might not run because the req/res cycle has been ended!

- What does the `next` function do?
  - callback function provided as a parameter to middleware functions
  - when invoked it executes middleware succeeding it
  - used to pass control
  - if not called the request is left hanging open - by calling it you are moving the code along appropriately 

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
  - uses await 3 times in one function meaning 3 HTTP requests all made one right after the other - more efficient to make these calls as a Promise.all() so they are sent at once if they are not relying on one another
  - No error handling is being used so if any fail we wont know why/which/whats happening or where to start fixing it
  - variable names could be better --- for instance we dont know what we are retrieving from each user based on this information - It could be better to day elieData or elieBio instead of just the name.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
