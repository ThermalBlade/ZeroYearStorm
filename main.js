const electron = require('electron');
const url = require('url');
const path = require('path');

//Environment type
process.env.NODE_ENV = 'production'

const {app, BrowserWindow, Menu} = electron;
let mainWindow;

//Set up the main window
app.on('ready', function(){ 
    //Create new window
    mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        width: 800,
        minWidth: 600,
        height: 600,
        minHeight: 400,
        webPreferences:{
            nodeIntegration: true
        }
    });
    //Load HTML into window
    //pass file://dirname/mainWindow.html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'loadWindow.html'),
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
                label: 'Quit',
                accelerator: 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

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
            },
            {
                label: 'Go Back',
                click(item){ //Put DevTools on current window
                    mainWindow.loadURL(url.format({
                        pathname: path.join(__dirname, 'loadWindow.html'),
                        protocol:'file:',
                        slashes:true
                    }));
                }
            }
        ]
    });
}