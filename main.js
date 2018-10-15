const {app, BrowserWindow} = require('electron');

let janela = null;

app.on('ready', () => {
    janela = new BrowserWindow({
        width: 800,
        height: 600,
        icon: 'imagens/brasil.png'
    });
    janela.loadFile('index.html');
});
