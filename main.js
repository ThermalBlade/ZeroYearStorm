const electron = require('electron');
const url = require('url');
const path = require('path');

//SET ENV
process.env.NODE_ENV = 'development'

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;

app.on('ready', function(){ 
    //Create new window
    mainWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true
        }
    });
    //Load HTML into window
    //pass file://dirname/mainWindow.html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes:true
    }));
    //Quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    });
    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert Menu
    Menu.setApplicationMenu(mainMenu);
});

//Create Menu Template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? //On mac?
                'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

//If mac, add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

//Add dev tools item if not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? //On mac?
                'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){ //Put DevTools on current window
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}