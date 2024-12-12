const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  updateOutput: (code) => {
    const iframe = document.getElementById('output-frame');
    if (iframe) {
      const outputDocument =
        iframe.contentDocument || iframe.contentWindow.document;
      outputDocument.open();
      outputDocument.write(`
        <body>
          <script>
            try {
              ${code}
            } catch (error) {
              document.body.innerHTML = '<pre style="color: red;">Error: ' + error.message + '</pre>';
            }
          </script>
        </body>
      `);
      outputDocument.close();
    } else {
      console.error('Output iframe not found');
    }
  },
});
