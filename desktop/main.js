const { app, BrowserWindow, Tray, Menu } = require('electron')
var path = require('path');
require('../express/server');

let tray = null

function createWindow() {
    

    tray = new Tray(path.join(__dirname, '/icon.ico'))
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Open', click:  function(){
            win.show();
        } },
        { label: 'Quit', click:  function(){
            app.isQuiting = true;
            app.quit();
        } }
    ])
    tray.setToolTip('Media Streamer')
    tray.setContextMenu(contextMenu)
    tray.setIgnoreDoubleClickEvents(true)
    tray.on('click', function(e){
        if (win.isVisible()) {
            win.hide()
        } else {
            win.show()
        }
      });

    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    win.loadFile(path.join(__dirname, '/index.html'))

    win.on('minimize', function (event) {
        event.preventDefault();
        win.hide();
    });


    // Open the DevTools.
    //win.webContents.openDevTools()
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})



app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.