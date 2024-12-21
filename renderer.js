require.config({
  paths: {
    vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.41.0/min/vs',
  },
});

require(['vs/editor/editor.main'], function () {
  const editor = monaco.editor.create(document.getElementById('editor'), {
    value: '// Write JavaScript here\nconsole.log("Hello, World!");',
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true,
  });

  const outputFrame = document.getElementById('output-frame');

  // Rebuild the iframe to completely clear content
  function resetOutputFrame() {
    outputFrame.src = 'about:blank'; // Reload to clear iframe completely
    return new Promise((resolve) => {
      outputFrame.onload = () => {
        const outputDocument =
          outputFrame.contentDocument || outputFrame.contentWindow.document;
        outputDocument.open();
        outputDocument.write(`
          <html>
            <head>
              <style>
                body {
                  font-family: 'Courier New', Courier, monospace;
                  background-color: #1e1e1e;
                  color: #d4d4d4;
                  padding: 10px;
                  white-space: pre-wrap;
                  font-size: 14px;
                }
                .log { color: #9cdcfe; }
                .error { color: #f44747; }
              </style>
            </head>
            <body></body>
          </html>
        `);
        outputDocument.close();
        resolve(outputDocument);
      };
    });
  }

  // Append output to the iframe with a <br /> after each output
  function appendOutput(document, type, message) {
    const line = document.createElement('div');
    line.className = type;
    line.textContent = message;

    const lineBreak = document.createElement('br'); // Add line break
    document.body.appendChild(line);
    document.body.appendChild(lineBreak);
    document.body.appendChild(lineBreak);
  }

  // Evaluate code and capture logs
  async function runCode() {
    const code = editor.getValue();

    // Reset and get fresh iframe document
    const outputDocument = await resetOutputFrame();

    try {
      // Capture logs
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => {
        const logMessage = args.map((arg) => String(arg)).join(' ');
        logs.push(logMessage);
        appendOutput(outputDocument, 'log', logMessage); // Display logs
        originalLog.apply(console, args); // Also log to DevTools
      };

      // Evaluate code using eval
      const result = eval(code);

      // Display the final result if not undefined
      if (result !== undefined) {
        appendOutput(outputDocument, 'log', String(result));
      }
    } catch (error) {
      appendOutput(outputDocument, 'error', error.message); // Display errors
    }
  }

  // Re-run code on every editor change
  editor.onDidChangeModelContent(runCode);
  runCode();
});
