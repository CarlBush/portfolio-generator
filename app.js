
/*const profileDataArgs = process.argv.slice(2);
const profileDataArgs = process.argv.slice(2, process.argv.length);
const name = profileDataArgs[0];
const github = profileDataArgs[1];

const printProfileData = profileDataArgs => {
    for (let i = 0; i < profileDataArgs.length; i++){
        console.log(profileDataArgs[i]);
    }

    console.log('================');
    //IS THE SAME AS THIS..
    //profileDataArgs.forEach((profileItem) => {
        //console.log(profileItem))}; 
    profileDataArgs.forEach(profileItem => console.log(profileItem));
};

printProfileData(profileDataArgs);*/

//KEEP EVERYTHING BELOW THIS LINE

const inquirer = require("inquirer");
//const FileSystem = require("fs");
//const generatePage = require('./src/page-template.js');
//const [name, github] = profileDataArgs;



/*FileSystem.writeFile("index.html", generatePage(name, github), err => {
    if (err) throw err;
    console.log("Portfolio complete! Check out index.html to see the output!")
});*/

inquirer
.prompt([
    {
    type: "input",
    name: "name",
    message: "What is your name?"
    }

])
.then(answers => console.log(answers));