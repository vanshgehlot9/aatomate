const sharp = require('sharp');
const pngToIco = require('png-to-ico');
const fs = require('fs');

async function generate() {
  const inputFile = 'public/aatomate.jpeg';

  // 1. apple-icon.png (180x180) for iOS
  await sharp(inputFile)
    .resize(180, 180)
    .toFile('src/app/apple-icon.png');
  console.log('Generated src/app/apple-icon.png (180x180)');

  // 2. icon.png (192x192) for Google (multiple of 48) and general use
  await sharp(inputFile)
    .resize(192, 192)
    .toFile('src/app/icon.png');
  console.log('Generated src/app/icon.png (192x192)');

  // 3. Temporary PNGs for ICO generation (16x16 and 32x32)
  await sharp(inputFile).resize(16, 16).toFile('public/temp-16.png');
  await sharp(inputFile).resize(32, 32).toFile('public/temp-32.png');

  // 4. Generate favicon.ico directly in the public root folder
  const buf = await (typeof pngToIco === 'function' ? pngToIco : pngToIco.default)(['public/temp-16.png', 'public/temp-32.png']);
  fs.writeFileSync('public/favicon.ico', buf);
  console.log('Generated public/favicon.ico (16x16 & 32x32)');

  // Clean up temp files
  fs.unlinkSync('public/temp-16.png');
  fs.unlinkSync('public/temp-32.png');

  // Remove the default favicon in app if it exists so there are no conflicts
  if (fs.existsSync('src/app/favicon.ico')) {
    fs.unlinkSync('src/app/favicon.ico');
  }
}

generate().catch(console.error);
