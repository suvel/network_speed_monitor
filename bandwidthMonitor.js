const si = require('systeminformation');
const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 300,
        height: 200,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    mainWindow.loadFile('index.html');



    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});

function updateBandwidth() {
    si.networkStats()
        .then(data => {
            const sentMB = data[0].tx_bytes / (1024 ** 2);
            const receivedMB = data[0].rx_bytes / (1024 ** 2);
            const sentMBBySec = data[0].tx_sec / (1024 ** 2);
            const receivedMBSec = data[0].rx_sec / (1024 ** 2);

            const usageText = `
            Overall:
                Sent: ${sentMB.toFixed(2)} MB\nReceived: ${receivedMB.toFixed(2)} MB
            SEC:
                Sent: ${sentMBBySec.toFixed(2)} MB\nReceived: ${receivedMBSec.toFixed(2)} MB
            `;
            mainWindow.webContents.send('update-bandwidth', usageText);
        })
        .catch(error => console.error(error));

    setTimeout(updateBandwidth, 1000); // Update every 1 second
}

app.on('ready', () => {
    createWindow();
    updateBandwidth();
});
