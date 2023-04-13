const fs = require('fs');
const request = require('request');

const link = process.argv[2];
const destinedFilePath = process.argv[3];

const fetchingPage = function(callback) {

  if (fs.existsSync(destinedFilePath)) {
    console.log("File existed! Try using another file name.");
    process.exit();
  }

  console.log("Start reading page...");
  // Async
  request(link, (error, response, body) => {
    if (!error) {
      callback(body);
    } else {
      console.log(error);
    }
  });
};

const callback = function(content) {

  // Async
  fs.writeFile(destinedFilePath, content, err => {
    if (err) {
      console.log("Error in writing content to file... ");
      console.log(err);
      if (err.code === 'ENOENT') {
        console.log("No such directory. Please use another file path.");
      }
      process.exit();
    } else {
      let contentSize = content.length; // by bytes
      console.log(`Downloaded and saved ${contentSize} bytes to ${destinedFilePath}`);
    }
  });
};

fetchingPage(callback);