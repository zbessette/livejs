# LiveJS

LiveJS is a simple Electron-based JavaScript editor that allows you to write and execute JavaScript code in real time. The app features a split view, with a code editor on the left and the output panel on the right, displaying the results immediately as you type.

## Features

- Real-time JavaScript code execution.
- Syntax-highlighted code editor powered by Monaco Editor.
- Console logs and errors displayed in a styled output panel.
- Clean and simple interface.

---

## Prerequisites

Ensure you have the following installed:

1. **Node.js** (v16.19.0 or later) - [Download Node.js](https://nodejs.org/)
2. **Python** (3.11 or earlier recommended) - [Download Python](https://www.python.org/)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd LiveJS
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Python Virtual Environment (if required for appdmg)

```bash
python3 -m venv venv
source venv/bin/activate
python3 -m pip install setuptools
```

### 4. Run the App Locally

```bash
npm start
```

---

## Packaging the App

### For macOS

1. **Package the App:**

```bash
npx electron-packager . LiveJS --platform=darwin --arch=x64 --overwrite
```

2. **Create a DMG File (Optional):**

```bash
node create-dmg.js
```

### Output:

- Packaged app: `LiveJS-darwin-x64/LiveJS.app`
- DMG installer: `dist/LiveJS.dmg`

---

## Troubleshooting

### 1. "Hit debug scenario" Logs

Suppress these logs by following the settings already implemented in the `main.js` file.

### 2. Python Errors (e.g., `distutils` or `externally-managed-environment`)

Use a virtual environment and install required dependencies as shown above.

### 3. Missing Modules

Clear cache and reinstall modules:

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

## File Structure

```
LiveJS/
├── dist/                   # DMG output folder
├── node_modules/           # Node.js dependencies
├── venv/                   # Python virtual environment
├── main.js                 # Electron main process
├── preload.js              # Preload script for security
├── index.html              # App interface layout
├── renderer.js             # Handles code execution
├── create-dmg.js           # Script for DMG creation
├── package.json            # Node.js dependencies and scripts
└── README.md               # Project documentation
```

---

## License

This project is licensed under the MIT License.

---

## Author

**Zyon Bessette**
