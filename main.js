const {app, Menu, BrowserWindow} = require('electron');

let janela = null;

function criar_janela(){
  janela = new BrowserWindow({
      width: 800,
      height: 600,
      icon: 'imagens/brasil.png'
  });
  janela.loadFile('index.html');

}
app.on('ready', () => {
  criar_janela();
});
