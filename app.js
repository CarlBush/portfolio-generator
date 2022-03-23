
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

const promptUser = () =>{
return inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is your name?"
    },
    {
        type: "input",
        name: "github",
        message: "Enter your GitHub Username"
    },
    {
        type: "input",
        name: "about",
        message: "Provide some information about yourself:"
    }

]);
};



const promptProject = portfolioData =>{
    // If there's no 'projects' array property, create one (IF FALSE)
    if(!portfolioData.projects){
        portfolioData.projects =[];
    }
    console.log(`
    =================
    Add a New Project
    =================
    `);
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project (Required)"
        },
        {
            type: "checkbox",
            name: "languages",
            message: "What did you build this project with? (Check all that apply)",
            choices: ["Javascript", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"]
        },
        {
            type:"input",
            name: "link",
            message: "Enter the GitHub link to your project. (Required)"
        },
        {
            type: "confirm",
            name: "feature",
            message: "Would you like to feature this project?",
            default: false
        },
        {
            type: "confirm",
            name: "confirmAddProject",
            message: "Would you like to enter antoher project?",
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        //IF TRUE
        if(projectData.confirmAddProject){
            return promptProject(portfolioData);
        }
        else{
            return portfolioData;
        }
    });
};

promptUser()
.then(promptProject)
.then(portfolioData =>{
    console.log(portfolioData);
});
//.then(answers => console.log(answers))
//.then(promptProject)
//.then(projectAnswers => console.log(projectAnswers));