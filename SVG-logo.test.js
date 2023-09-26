const fs = reuire('fs');
const path = require('path');

describe('SVG Logo', () => {
    it('should generate the logo.svg file', () => {
        const filePath = path.join(__dirname, 'logo.svg');
        const fileExists = fs.existsSync(filePath);
        
        expect(fileExists).toBe(true);
    });
});