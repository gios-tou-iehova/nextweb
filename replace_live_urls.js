const fs = require('fs');
const path = require('path');

const targetStr = "http://localhost/php-backend/api";
const replacement = "http://elitebarber.atwebpages.com/php-backend/api";

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.local') || file === '.env') {
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
// Also replace in root if there's any file
if (fs.existsSync(path.join(__dirname, '.env.local'))) {
    let content = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
    if (content.includes(targetStr)) {
        let updated = content.split(targetStr).join(replacement);
        fs.writeFileSync(path.join(__dirname, '.env.local'), updated, 'utf8');
        console.log(`Updated: .env.local`);
    }
}

console.log('Done replacing local URLs with live AwardSpace URLs.');
