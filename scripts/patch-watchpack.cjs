const fs = require('fs');
const path = require('path');

const pnpmDir = path.join(__dirname, '..', 'node_modules', '.pnpm');
const entries = fs.readdirSync(pnpmDir);
const nextDir = entries.find(e => e.startsWith('next@') && !e.includes('firebase') && !e.includes('sitemap'));
if (!nextDir) {
  console.error('Could not find Next.js package in .pnpm');
  process.exit(1);
}

const wpFile = path.join(pnpmDir, nextDir, 'node_modules', 'next', 'dist', 'compiled', 'watchpack', 'watchpack.js');
const src = fs.readFileSync(wpFile, 'utf8');
const patches = [
  {
    needle: `i.code==="ENOENT"||i.code==="EPERM"||i.code==="EACCES"||i.code==="EBUSY"`,
    replacement: `i.code==="ENOENT"||i.code==="EPERM"||i.code==="EACCES"||i.code==="EBUSY"||i.code==="EINVAL"`,
  },
  {
    needle: `s.code!=="ENOENT"&&s.code!=="EPERM"&&s.code!=="EBUSY"`,
    replacement: `s.code!=="ENOENT"&&s.code!=="EPERM"&&s.code!=="EBUSY"&&s.code!=="EINVAL"`,
  },
];

let patched = src;
let applied = 0;
for (const p of patches) {
  if (patched.includes(p.replacement)) {
    console.log(`Already patched: ${p.needle}`);
    continue;
  }
  if (!patched.includes(p.needle)) {
    console.error(`Could not find: ${p.needle}`);
    continue;
  }
  patched = patched.replace(p.needle, p.replacement);
  console.log(`Patched: ${p.needle}`);
  applied++;
}

if (applied === 0) {
  console.log('All patches already applied');
}
fs.writeFileSync(wpFile, patched, 'utf8');
