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

  function runCode() {
    const code = editor.getValue();
    console.log('Executing Code:', code); // Debugging log to verify the code being executed
    window.api.updateOutput(code);
  }

  editor.onDidChangeModelContent(runCode);
  runCode();
});
