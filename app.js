const FileSystem = require("fs");
const profileDataArgs = process.argv.slice(2);
const generatePage = require('./src/page-template.js');
//const profileDataArgs = process.argv.slice(2, process.argv.length);
//const name = profileDataArgs[0];
//const github = profileDataArgs[1];

const [name, github] = profileDataArgs;

/*const printProfileData = profileDataArgs => {
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



FileSystem.writeFile("index.html", generatePage(name, github), err => {
    if (err) throw err;
    console.log("Portfolio complete! Check out index.html to see the output!")
});