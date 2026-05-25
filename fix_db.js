const fs = require('fs');
const path = require('path');

const handlersDir = 'c:\\xampp\\htdocs\\php-backend\\handlers';

const OLD = `mysql:host=localhost;dbname=barbing_db", "root", ""`;
const NEW = `mysql:host=fdb1032.awardspace.net;dbname=4761973_barbing", "4761973_barbing", "Hello123###"`;

const files = fs.readdirSync(handlersDir);
files.forEach(file => {
    if (!file.endsWith('.php')) return;
    const fullPath = path.join(handlersDir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes(OLD)) {
        const updated = content.split(OLD).join(NEW);
        fs.writeFileSync(fullPath, updated, 'utf8');
        console.log(`✅ Fixed: ${file}`);
    } else {
        console.log(`⏭  Skipped: ${file} (no match)`);
    }
});
console.log('\nDone! All handlers updated with AwardSpace credentials.');
