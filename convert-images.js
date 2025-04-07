const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function convertImages() {
  const directory = './public/KLİNİK';
  
  try {
    const files = await fs.readdir(directory);
    
    for (const file of files) {
      if (file.toLowerCase().endsWith('.jpg')) {
        const inputPath = path.join(directory, file);
        const outputPath = path.join(directory, file.replace(/\.jpg$/i, '.webp'));
        
        // Convert to webp
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        // Delete original jpg file
        await fs.unlink(inputPath);
        
        console.log(`Converted and deleted: ${file}`);
      }
    }
    
    console.log('All conversions completed!');
  } catch (error) {
    console.error('Error:', error);
  }
}

convertImages(); 