const electron = require('electron');

const createWindow = () => {
    const win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 500,
        minHeight: 300
    });

    win.loadFile('assets/index.html');
}

electron.app.whenReady().then(() => {
    createWindow();
});