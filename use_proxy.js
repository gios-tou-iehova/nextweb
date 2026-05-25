const fs = require('fs');
const path = require('path');

const targetStr = "http://elitebarber.atwebpages.com/php-backend/api";
const replacement = "/api/proxy";

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes(targetStr)) {
                let updated = content.split(targetStr).join(replacement);
                fs.writeFileSync(fullPath, updated, 'utf8');
                console.log(`Updated: ${file}`);
            }
        }
    }
}

replaceInDir(path.join(__dirname, 'app'));
console.log('Done pointing frontend to proxy.');
