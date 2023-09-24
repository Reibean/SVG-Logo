const fs = require('fs');
const { createSVG, setSVG, draw } = require('svg-builder');
const inquirer = require('inquirer');


function createLogo(userText, textColor, selectedShape, shapeColor) {
    const width = 300;
    const height = 200;

    const svg = createSVG();

    if (selectedShape === 'circle') {
        draw(svg.circle().radius(50).center(width / 2, height / 2).fill(shapeColor));
    } else if (selectedShape === 'triangle') {
        draw(svg.polygon([width / 2, 20], [width - 20, height - 20], [20, height - 20]).fill(shapeColor));
    } else if (selectedShape === 'square') {
        draw(svg.rect(width, height).fill(shapeColor));
    }

    draw(svg.text(userText).fill(textColor).font({ size: 40 }).move(width / 2 - 50, height / 2 - 20));

    const svgString = setSVG(svg);

    fs.writeFileSync('logo.svg', svg.svg());

    console.log('Generated logo.svg');
}

inquirer
    .createPromptModule([
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
        createLogo(answers.userText, answers.textColor, answers.selectedShape, answers.shapeColor);
    })
    .catch((error) => {
        console.error(error);
    });