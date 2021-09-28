// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
var fs = require('fs');

function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        show: true,
        resizable: false,
        center: true,
        minimizable: false,
        closable: false,
        fullscreen: true,
        kiosk: true,
        frame: false,
        autoHideMenuBar: true,
        alwaysOnTop: true,
        webPreferences: {
        preload: path.join(__dirname, 'preload.js')
        }
    })

    // Open the DevTools.
    //mainWindow.webContents.openDevTools()
}

function readFile(fileURL,mimeType) {
    fs.readFile(fileURL,mimeType,(err,contents)=>{
      if (err) {
          return err;
      }

      console.log(contents);

      let wins = BrowserWindow.getAllWindows();
      wins[0].loadURL(contents);
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(() => {
    var url = "http://heatweb.atomiccodes.com.br"; 
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    var filepath = path.join('C:\\temp\\url.txt');

    readFile(filepath,'utf8');
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. Você também pode colocar eles em arquivos separados e requeridos-as aqui.