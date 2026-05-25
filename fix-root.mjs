import fs from 'fs';
import path from 'path';

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            content = content.replace(/peerId/g, 'rootId');
            content = content.replace(/connectToPeer/g, 'connectToRoot');
            fs.writeFileSync(fullPath, content);
        }
    }
}

walk('./src');
