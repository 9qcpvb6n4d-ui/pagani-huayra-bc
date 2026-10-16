const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'ezgif');
const destDir = path.join(__dirname, '..', 'public', 'images', 'huayra-sequence');

if (!fs.existsSync(srcDir)) {
  console.error(`Source directory does not exist: ${srcDir}`);
  process.exit(1);
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Find all frame files matching ezgif-frame-*.jpg or .png, sorted numerically
const frameFiles = fs
  .readdirSync(srcDir)
  .filter((f) => /^ezgif-frame-\d+\.(jpg|jpeg|png)$/i.test(f) || /^\d+\.(jpg|jpeg|png)$/i.test(f))
  .sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, ''), 10);
    const numB = parseInt(b.replace(/\D/g, ''), 10);
    return numA - numB;
  });

console.log(`Found ${frameFiles.length} source frames in ${srcDir}`);

if (frameFiles.length === 0) {
  console.error('No matching frame images found in source directory!');
  process.exit(1);
}

// Clear existing files in destDir
const existingFiles = fs.readdirSync(destDir);
for (const file of existingFiles) {
  fs.unlinkSync(path.join(destDir, file));
}
console.log(`Cleared previous ${existingFiles.length} frames in destination directory.`);

// Copy 1:1 into destDir as 1.jpg, 2.jpg, ...
frameFiles.forEach((file, index) => {
  const frameNumber = index + 1;
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, `${frameNumber}.jpg`);
  fs.copyFileSync(srcPath, destPath);
});

console.log(`Successfully generated 1.jpg to ${frameFiles.length}.jpg in ${destDir}`);
