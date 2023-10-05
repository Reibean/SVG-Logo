// const fs = require('fs');
// const inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: 'input',
            name: 'userText',
            message: 'Enter up to 3 characters: ',
            validate: (value) => {
                return value.length <= 3 ? true : 'Text must be up to 3 characters long.';
            },
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter text color (keyword or hex code):',
        },
        {
            type: 'list',
            name: 'selectedShape',
            message: 'Select a shape',
            choices: ['circle', 'triangle', 'square'],
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter shape color (keywork or hex code):',
        },
    ])
    .then((answers) => {
        let shapeElement;
        switch (answers.selectedShape) {
            case 'circle':
                shapeElement = `<circle cx="150" cy="100" r="80" fill="${answers.shapeColor}" />`;
                break;
            case 'triangle':
                shapeElement = `<polygon points="150,20 280,180 20,180" fill="${answers.shapeColor}" />`;
                `<text x="150" y="140" font-size="24" text-anchor="middle" fill="white"></text>`
                break;
            case 'square':
                shapeElement = `<rect width="150" height="150" x="75" y="25" fill="${answers.shapeColor}" />`;
                break;
        }
        
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
        ${shapeElement}
        <text x="50%" y="50%" font-size="72" fill="${answers.textColor}" text-anchor="middle">${answers.userText}</text>
      </svg>`;
        
        fs.writeFileSync('logo.svg', svg);

        console.log('Generated logo.svg');
        })

    .catch((error) => {
        console.error(error);
    });