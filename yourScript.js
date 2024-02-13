const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', function () {
    ipcRenderer.on('update-bandwidth', (event, usageText) => {
        document.getElementById('usage').innerText = usageText;
    });
    ipcRenderer.on('update-speed', (event, usageText) => {
        document.getElementById('speed').innerText = usageText;
    });
});
