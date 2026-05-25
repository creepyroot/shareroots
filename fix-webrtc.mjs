import fs from 'fs';
let content = fs.readFileSync('./src/screens/Home.jsx', 'utf8');
content = content.replace(/WebRTC connection/g, 'secure channel');
fs.writeFileSync('./src/screens/Home.jsx', content);
