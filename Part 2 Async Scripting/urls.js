// requiring the needed modules fs to read and write files, axios for the get request/async call, and URL which is used to import the class from the url module to mainpulate URLs in my script
const fs = require("fs");
const axios = require("axios");
const { URL } = require("url");

// our main function - needs to read one file and write many - lets start with reading
// takes 3 params - the file path, how to interpret, and callback func - this will be an async callback as we are going to be using a GET request inside
// start with error first coding - if there is an error we will console log and exit the file immediately
// declaring a variable called urls which is going to take the data from the async func and split it on the new lines
// using a for loops we will loop throuhg the urls and try on each
    // a singleURL is a new URL(url), hostname is a singleUrl with method hostname, and response is an await axios.get(url)
// we are then using the built in method from fs to write a file and sync using hostname.html and the response data - console logging this information and catching an error if one should arise
fs.readFile("urls.txt", "utf8", async (err, data) => {
  if (err) {
    console.error(`Error reading the original file: ${err}`);
    process.exit(1);
  }

  const urls = data.split("\n");

  for (let url of urls) {
    try {
      const singleUrl = new URL(url);
      const hostname = singleUrl.hostname;
      const response = await axios.get(url);

      fs.writeFileSync(`${hostname}.html`, response.data);
      console.log(`Saved HTML from ${url} as ${hostname}.html`);
    } catch (err) {
      console.error(`Error processing URL: ${url}`);
      console.error(err);
    }
  }
});
