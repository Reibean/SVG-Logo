const readline = require('readline');
const fs = require('fs');
const { createSVG, setSVG, draw } = require('svg-builder');
const { SequelizeScopeError } = require('sequelize');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

rl.question('Enter up to 3 characters: ', (userText) => {
    rl.question('Enter text color (keyword or hex code): ', (textColor) => {
        rl.question('Select a shape (circle, triangle, square): ',(selectedShape) => {
        rl.question('Enter shape color (keyword or hex code): ', (shapeColor) => {

            createLogo(userText, textColor, selectedShape, shapeColor);

            rl.close();
        });
        });
    });
});
