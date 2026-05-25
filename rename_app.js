const fs = require('fs');
const path = require('path');

const replacements = [
    { target: /ELITE BARBER/g, replacement: "DAVID PRO BARBER HUB" },
    { target: /Elite Barber Shop/g, replacement: "David Pro Barber Hub" },
    { target: /Elite Barber Studio/g, replacement: "David Pro Barber Hub" },
    { target: /Elite Barber/g, replacement: "David Pro Barber Hub" },
    { target: /ELITE\s*<span[^>]*>BARBER<\/span>/g, replacement: "DAVID PRO <span style={{color:'#c41e3a'}}>BARBER HUB</span>" },
    { target: /elitebarbershop\.com/g, replacement: "davidprobarberhub.com" },
    { target: /info@elitebarber\.com/g, replacement: "info@davidprobarberhub.com" },
    { target: /@elitebarbershop/g, replacement: "@davidprobarberhub" },
    { target: /ELITE/g, replacement: "DAVID PRO" },
    { target: /Elite Gentlemen/g, replacement: "David Pro Gentlemen" },
    { target: /Elite/g, replacement: "David Pro" },
    { target: /elite/g, replacement: "david pro" }
];

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.css') || fullPath.endsWith('.json')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = content;
            
            for (const { target, replacement } of replacements) {
                updated = updated.replace(target, replacement);
            }
            
            if (updated !== content) {
                fs.writeFileSync(fullPath, updated, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

replaceInDir(path.join(__dirname, 'app'));
console.log('Done renaming Elite Barber to David Pro Barber Hub.');
