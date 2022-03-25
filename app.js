
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

//const generateSite = require("./utils/generate-site.js");
const {writeFile, copyFile} = require("./utils/generate-site.js");
const inquirer = require("inquirer");
//const fs = require("fs");
const generatePage = require('./src/page-template.js');
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
        message: "What is your name? (Required)",
        validate: nameInput => {
            if (nameInput) {
                return true;
            }
            else{
                console.log("Please enter your name!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "github",
        message: "Enter your GitHub Username (Required)",
        validate: nameInput => {
            if (nameInput) {
                return true;
            }
            else{
                console.log("Please enter your GitHub Username!");
                return false;
            }
        }
    },
    {
        type: "confirm",
        name: "confirmAbout",
        message: 'Would you like to enter some info about yourself for an "About" section?',
        default: true
    },
    {
        type: "input",
        name: "about",
        message: "Provide some information about yourself:",
        //IF YOU ANSWER NO FOR THE PREVIOUS SECTION THIS WILL NOT BE ASKED
        when: ({confirmAbout}) => {
            if(confirmAbout) {
                return true;
            }else{
                return false;
            }
        }
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
            message: "What is the name of your project? (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else{
                    console.log("Please enter the name of your project!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else{
                    console.log("Provide a description of the project");
                    return false;
                }
            }
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
            message: "Enter the GitHub link to your project. (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else{
                    console.log("Please enter your GitHub link to your project!");
                    return false;
                }
            }
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
            message: "Would you like to enter another project?",
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
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });

//THIS IS CALL BACKS AND NOT PROMISES
// promptUser()
// .then(promptProject)
// .then(portfolioData => {
//     const pageHTML = generatePage(portfolioData);
    
//     fs.writeFile('./dist/index.html', pageHTML, err => {
//          if(err) {
//              console.log(err);
//              return;
//          }
//          console.log("Page Created! Checkout index.html in this directory");

//          fs.copyFile("./src/style.css", "./dist/style.css", err =>{
//              if(err){
//                  console.log(err);
//                  return;
//              }
//              console.log("Style sheet was copied");
//          });
//     });
// });

//.then(answers => console.log(answers))
//.then(promptProject)
//.then(projectAnswers => console.log(projectAnswers));