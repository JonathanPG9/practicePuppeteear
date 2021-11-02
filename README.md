## Pre-requisites 
### Node 10+

## Test

We are using child_process which allows us to create new processes.
In this case we will use exec() that allows us to create a new shell process and can execute shell commands that it accepts through its callback, we will use the command curl that allows us to bring/extract all the html of the page that we will require in the params of exec(). We will require at the beginning the JSON with the data of the urls that contains the names and url
of each page in question, then we iterate this information and with the exec function we send a curl as a param for each URL and the stdout (response from the console with the html) we use FS to be able to write an html file with this response for each of the urls

## NPM scripts
* npm run start
* npx server dist