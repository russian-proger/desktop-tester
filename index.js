const path = require('path');
const electron = require('electron');

const createWindow = () => {
    const win = new electron.BrowserWindow({
        width: 800,
        height: 800,
        minWidth: 500,
        minHeight: 300,
        icon: "icon.png"
    });

    win.menuBarVisible = false;

    win.loadFile('assets/index.html');
}

electron.app.whenReady().then(() => {
    createWindow();
});