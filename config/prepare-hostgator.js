const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '..');
const zipName = 'hostgator.zip';

execSync('npm run build', { stdio: 'inherit', cwd: root });
execSync('npm prune --production', { stdio: 'inherit', cwd: root });

const zipPath = path.join(root, zipName);
if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
execSync(`zip -r ${zipPath} . -x '*.git*' '${zipName}'`, { stdio: 'inherit', cwd: root });

