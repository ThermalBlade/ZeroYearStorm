let {PythonShell} = require('python-shell')
var path = require("path")

function get_aj(){
    var options ={
        scriptPath: path.join(__dirname, '/../ZeroYearStorm/backend/'),
        args : ["AJ"]
    }

    let pyshell = new PythonShell('testing.py', options);
    pyshell.on('message', function(message){
        alert(message);
    })
    document.getElementById("test").innerText = "BayJ";
}

