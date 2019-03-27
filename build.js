/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf').sync;
const { execSync } = require('child_process');
const prompt = require('prompt-sync')();

// Prep command executor
const exec = (command) => {
  return execSync(command, { stdio: 'inherit' });
};

const filesToKeep = [
  'node_modules',
  'build.js',
  'package-lock.json',
  'package.json',
  'README.md',
  'src',
];

// Read all files in project
const files = fs.readdirSync('.');

// Choose which files to delete
const filesToDelete = files.filter((file) => {
  // Don't delete hidden files
  if (file.startsWith('.')) {
    return false;
  }

  // Don't delete filesToKeep
  if (filesToKeep.indexOf(file) >= 0) {
    return false;
  }

  return true;
});

// Tell user what we're about to delete
if (filesToDelete.length > 0) {
  console.log('\n\nBefore building, we will delete the following files:');
  filesToDelete.forEach((file) => {
    console.log(`- ${file}`);
  });
  console.log('\nPress enter to continue, ctrl + c to quit');
  const ret = prompt();
  if (ret === null) {
    process.exit(0);
  }
}

// Delete files
filesToDelete.forEach((file) => {
  rimraf(path.join(__dirname, file));
});

// Run build process
exec('NODE_ENV=production babel src --out-dir . --copy-files');
