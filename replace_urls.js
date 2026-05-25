const fs = require('fs');
const path = require('path');

const targetStr = "'http://localhost/backend/api'";
const targetStr2 = '"http://localhost/backend/api"';
const targetStr3 = "'http://localhost/backend/api/";
const targetStr4 = '"http://localhost/backend/api/';

const replacement = "(process.env.NEXT_PUBLIC_API_URL || 'http://localhost/php-backend/api')";
const replacement3 = "`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost/php-backend/api'}/";

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = content;
            
            // For simple strings like fetch('http://localhost/backend/api/barbers')
            // we can replace 'http://localhost/backend/api' with `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost/php-backend/api'}`
            // which requires changing the outer quotes to backticks if they are single or double.
            // A simpler regex approach:
            
            // 1. replace 'http://localhost/backend/api/...' -> `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost/php-backend/api'}/...`
            updated = updated.replace(/['"]http:\/\/localhost\/backend\/api\/([^'"]+)['"]/g, "`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost/php-backend/api'}/$1`");
            
            // 2. replace 'http://localhost/backend/api' -> (process.env.NEXT_PUBLIC_API_URL || 'http://localhost/php-backend/api')
            updated = updated.replace(/['"]http:\/\/localhost\/backend\/api['"]/g, "(process.env.NEXT_PUBLIC_API_URL || 'http://localhost/php-backend/api')");

            // 3. handle template literals like `http://localhost/backend/api/...`
            updated = updated.replace(/http:\/\/localhost\/backend\/api/g, "${process.env.NEXT_PUBLIC_API_URL || 'http://localhost/php-backend/api'}");

            if (content !== updated) {
                fs.writeFileSync(fullPath, updated, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

replaceInDir(path.join(__dirname, 'app'));
console.log('Done replacing URLs in app directory.');
