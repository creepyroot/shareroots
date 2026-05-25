import fs from 'fs';
import path from 'path';

function cleanup(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      cleanup(fullPath);
    } else {
      if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.js')) {
        fs.unlinkSync(fullPath);
      }
    }
  }
}
cleanup('./src');
