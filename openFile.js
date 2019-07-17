const {dialog} = require('electron').remote;
const lineReader = require('line-reader');
const electron = require('electron');
const {ipcRenderer} = electron;
var tmp = require('tmp');

function startingRow(line){
    var row = [];
    var findingWord = true;
    var entry = "";
    var char;
    for(var i = 0; i < line.length; i++){
        char = line.charAt(i);
        if(findingWord === true && char !== " "){
            findingWord = false;
        }
        if(findingWord === false){
            if(entry.includes("RATIO ")){
                entry += char;
                findingWord = true;
            }
            else if(entry.includes("RATIO") && !entry.includes("OPERATIO")){
                entry += char;
            }
            else if(char === " "){
                findingWord = true;
            }
            else{
                entry += char;
            }
            if(findingWord === true){
                row.push(entry);
                entry = "";
            }
        }
    }
    row.splice(row.indexOf("PLAN") + 1, 0, "");
    return(row);
}

function numbersRow(line){
    var row = [];
    var findingWord = true;
    var entry = "";
    var char;
    for(var i = 0; i < 5; i++){
        row.push("");
    }
    for(var i = 0; i < line.length; i++){
        char = line.charAt(i);
        if(findingWord === true && char !== " "){
            findingWord = false;
        }
        if(findingWord === false){
            if(char === " "){
                findingWord = true;
            }
            else if(i === line.length - 1){
                entry += char;
                findingWord = true;
            }
            else{
                entry += char;
            }
            if(findingWord === true){
                row.push(entry);
                entry = "";
            }
        }
    }
    return(row);
}

function opAdd(line, l){
    var row = [];
    var findingWord = true;
    var entry = "";
    var char;
    for(var i = 0; i < line.length; i++){
        char = line.charAt(i);
        if(findingWord === true && char !== " "){
            findingWord = false;
        }
        if(findingWord === false){
            if(i === line.length - 1){
                entry += char;
                findingWord = true;
            }
            else{
                entry += char;
            }
            if(findingWord === true){
                row.push(entry);
                for(var j = 0; j < l - 1; j ++){
                    row.push("");
                }
                entry = "";
            }
        }
    }
    return(row);
}

function flowRow(line){
    var row = [];
    var findingWord = true;
    var entry = "";
    var char;
    for(var i = 0; i < line.length; i++){
        char = line.charAt(i);
        if(findingWord === true && char !== " "){
            findingWord = false;
        }
        if(findingWord === false){
            if(char === " "){
                findingWord = true;
            }
            else if(i === line.length - 1){
                entry += char;
                findingWord = true;
            }
            else{
                entry += char;
            }
            if(findingWord === true){
                row.push(entry);
                entry = "";
            }
        }
    }
    return(row);
}

function timeRow(line){
    var row = [];
    var findingWord = true;
    var entry = "";
    var char;
    for(var i = 0; i < 4; i++){
        row.push("");
    }
    for(var i = 0; i < line.length; i++){
        char = line.charAt(i);
        if(findingWord === true && char !== " "){
            findingWord = false;
        }
        if(findingWord === false){
            if(char === " "){
                findingWord = true;
            }
            else if(i === line.length - 1){
                entry += char;
                findingWord = true;
            }
            else{
                entry += char;
            }
            if(findingWord === true){
                row.push(entry);
                entry = "";
            }
        }
    }
    return(row);
}

function printMatrix(matrix){
    var newTable = document.createElement("TABLE");
    newTable.setAttribute("id", "hec1Table");
    for(var i = 0; i < matrix.length; i ++){
        var row = document.createElement("tr");
        var cell = document.createElement("td");
        buttonNode = document.createTextNode("X");
        if(i === 0){
            cell.setAttribute("class", "deleteTopRowCell");
            row.setAttribute("class", "topRow");
            cell.appendChild(buttonNode);
        }
        else if(i === 1){
            cell.setAttribute("class", "deleteSecondRowCell");
            row.setAttribute("class", "secondRow");
            cell.appendChild(buttonNode);
        }
        else if(i == 2){
            cell.setAttribute("class", "deleteOperationRowCell");
            row.setAttribute("class", "operationRow");
            cell.appendChild(buttonNode);
        }
        else if(i == 3){
            cell.setAttribute("class", "deleteFlowRowCell");
            row.setAttribute("class", "flowRow");
            cell.appendChild(buttonNode);
        }
        else if(i == 4){
            cell.setAttribute("class", "deleteTimeRowCell");
            row.setAttribute("class", "timeRow");
            cell.appendChild(buttonNode);
        }
        else if((i + 1) % 3 === 0){
            row.setAttribute("class", "operationRow");
        }
        else if(i % 3 === 0){
            row.setAttribute("class", "flowRow");
        }
        else if((i - 1) % 3 === 0){
            row.setAttribute("class", "timeRow");
        }
        if(i > 4){
            cell.setAttribute("class", "invisibleCell");
        }
        row.appendChild(cell);
        
        //Fill table with HEC-1 output
        for(var j = 0; j < matrix[0].length; j ++){
            var normalCell = document.createElement("td");
            var textNode = document.createTextNode(matrix[i][j]);
            normalCell.appendChild(textNode);
            normalCell.setAttribute("class", "normalCell");
            row.appendChild(normalCell);
        }
        newTable.appendChild(row);
    }
    var newButton = document.createElement("button");
    var text = document.createTextNode("Download XLSX");
    newButton.appendChild(text);
    newButton.setAttribute("id", "downloadButton");
    document.getElementById("container").appendChild(newButton);

    document.getElementById("container").appendChild(newTable);
}

function fi(filePath){
    var looking = false;
    var post = false;
    var flowingRow = false;
    var timingRow = false;
    var postCounter = 0;
    lineReader.eachLine(filePath, function(line){
        if(line.includes("RATIOS APPLIED TO PRECIPITATION")){
            looking = true;
            matrix = [];
        }
        else if(line.includes("SUMMARY OF KINEMATIC WAVE")){
            printMatrix(matrix);
            looking = false;
        }
        if(looking === true){
            if(line.includes("OPERATION")){
                matrix.push(startingRow(line));
            }
            else if(matrix.length === 1){
                matrix.push(numbersRow(line));
                post = true;
            }
            else if(post === true){
                postCounter += 1;
                if(postCounter === 2){
                    if(line.length === 0){
                        printMatrix(matrix);
                        looking = false;
                    }
                    else{
                        matrix.push(opAdd(line, matrix[0].length));
                        post = false;
                        flowingRow = true;
                        postCounter = 0;
                    }
                }
            }
            else if(flowingRow == true){
                matrix.push(flowRow(line))
                flowingRow = false;
                timingRow = true;
            }
            else if(timingRow == true){
                matrix.push(timeRow(line))
                post = true;
                timingRow = false; 
            }
        }
    });
}

let username = process.env.username || process.env.user;
let defPath;
if(process.env.NODE_ENV == 'production'){
    defPath = 'C:\\Users\\' + username + '\\Desktop\\'
}
else{
    defPath = ''
}
document.querySelector('#selectBtn').addEventListener('click', function(e){
    e.preventDefault();
    dialog.showOpenDialog({
        defaultPath: defPath,
        properties: ['openFile'],
        filters: [{name: 'Hec-1', extensions: ['txt', 'OUT']}]
    }, function(filePaths){
        if (filePaths !== undefined){
            fi(filePaths[0]);
        }
    });
});