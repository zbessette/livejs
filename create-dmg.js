const { createDMG } = require('electron-installer-dmg');
const path = require('path');

createDMG(
  {
    appPath: path.join(__dirname, 'LiveJS-darwin-arm64/LiveJS.app'), // Path to the built app
    name: 'LiveJS', // DMG name
    out: path.join(__dirname, 'dist'), // Output folder
    overwrite: true, // Overwrite existing files
    dmgTitle: 'Live JS', // Title shown in Finder
  },
  (err) => {
    if (err) {
      console.error('Error creating DMG:', err);
    } else {
      console.log('DMG created successfully!');
    }
  }
);
