const fs = require('fs');
const https = require('https');
const path = require('path');

const url2 = "https://raw.githubusercontent.com/pmndrs/drei/master/.storybook/public/mac-draco.glb"; 

const downloadFile = (fileUrl, outputPath) => {
  return new Promise((resolve, reject) => {
    https.get(fileUrl, { headers: { 'User-Agent': 'Node.js' } }, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(outputPath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
         downloadFile(response.headers.location, outputPath).then(resolve).catch(reject);
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const dir = path.join(__dirname, 'public', 'models');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

console.log("Downloading mac-draco.glb...");
downloadFile(url2, path.join(dir, 'mac-draco.glb'))
  .then(() => console.log("Success! Saved to public/models/mac-draco.glb"))
  .catch(err => {
    console.error("Error downloading url2:", err.message);
    // Fallback URL if first fails
    const fallbackUrl = "https://raw.githubusercontent.com/jiwooproity/engineer-portfolio-3d/main/public/models/macbook.gltf";
    console.log("Trying fallback URL...");
    downloadFile(fallbackUrl, path.join(dir, 'macbook.gltf'))
      .then(() => console.log("Success! Saved to public/models/macbook.gltf"))
      .catch(e => console.error("Fallback failed:", e.message));
  });
