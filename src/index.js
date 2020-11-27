const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

app.on('ready', e => {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    height: 800,
		width: 1200,
    title: 'tashfeer',
    frame: false
  });
  window.loadURL(
    url.format({
      slashes: true,
      protocol: 'file:',
      pathname: path.join(__dirname, 'mainWindow/mainWindow.html')
    })
  )
})