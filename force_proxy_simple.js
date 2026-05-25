const fs = require('fs');
const path = require('path');

const targetStr = "process.env.NEXT_PUBLIC_API_URL || '/api/proxy'";
const replacement = "'/api/proxy'";

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js')) {
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
console.log('Done hardcoding /api/proxy.');
