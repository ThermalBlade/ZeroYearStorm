let {PythonShell} = require('python-shell')
var path = require("path")
//const {dialog} = require('electron').remote

function sendPath(files){
    var options = {
        scriptPath: path.join(__dirname, '\\backend'),
        args : [files]
    }
    let pyshell = new PythonShell('hecTranslation.py', options);
    pyshell.on('message', function(message){
        alert(message);
    })
}

/*let username = process.env.username || process.env.user;
let defPath;
if(process.env.NODE_ENV == 'production'){
    defPath = 'C:\\Users\\' + username + '\\Desktop\\'
}
else{
    defPath = ''
}
document.querySelector('#selectBtn').addEventListener('click', function(e){
    dialog.showOpenDialog({
        defaultPath: defPath,
        properties: ['openFile'],
        filters: [{name: 'Hec-1', extensions: ['txt', 'OUT']}]
    }, function(files){
        if (files !== undefined) {
            sendPath(files[0]);
        }
    });
});*/