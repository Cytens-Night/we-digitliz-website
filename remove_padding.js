const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'sections');

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    content = content.replace(/ md:pl-\[6rem\]/g, '');
    content = content.replace(/ md:pl-24/g, '');
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
