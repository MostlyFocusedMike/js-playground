let fs = require('fs');
// mkdir is async, so the callback gets executed after the file is made
// so since the write file function requires the folder, I thought it should go into 
// the callback 
// however, it does seem to work outside after, so this may be overkill

let dir = './tmp'; // relative to the file location it is executed in
fs.mkdir(dir, {}, (err) => { // that {} allows for recursive file creation
  if (err) {console.log('Error')};

  let markDown = process.argv[2] + "\n"
  fs.appendFile("./tmp/test.md", markDown, function(err) { // writeFile creates or overwrites, but appendFile creates or appends
    if (err) {return console.log(err)};
    console.log("The file was saved!");
  }); 
  
})
