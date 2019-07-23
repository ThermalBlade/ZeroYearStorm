const {dialog} = require('electron').remote;
const lineReader = require('line-reader');
var Promise = require('bluebird');

//Called if the document isn't a standard HEC-1 output
function throwError(){
    dialog.showErrorBox("Invalid Document", "Please select a valid HEC-1 output.");
    $('#selectBtn').prop('disabled', false);
}

//Creates the HTML table after the matrix is created.
function printMatrix(matrix){
    var newTable = document.createElement("TABLE");
    var row, cell, buttonNode, textNode;
    newTable.setAttribute("id", "hec1Table");

    //TOP ROW OF COLUMN DELETE BUTTONS
    row = document.createElement("tr");
    row.setAttribute("id", "topButtonsRow");
    cell = document.createElement("td");
    cell.setAttribute("class", "invisibleCell");
    row.appendChild(cell);
    for(var i = 0; i < matrix[0].length; i ++){
        if(i < 5){
            cell = document.createElement("td");
            buttonNode = document.createTextNode("X");
        }
        else{
            cell = document.createElement("td");
            cell.setAttribute("class", "invisibleCell");
        }
        if(i === 0){
            cell.appendChild(buttonNode);
            cell.setAttribute("class", "deleteOperationColCell");
        }
        else if(i === 1){
            cell.appendChild(buttonNode);
            cell.setAttribute("class", "deleteStationColCell");
        }
        else if(i == 2){
            cell.appendChild(buttonNode);
            cell.setAttribute("class", "deleteAreaColCell");
        }
        else if(i == 3){
            cell.appendChild(buttonNode);
            cell.setAttribute("class", "deletePlanColCell");
        }
        else if(i == 4){
            cell.appendChild(buttonNode);
            cell.setAttribute("class", "deleteFlowColCell");
        }
        row.appendChild(cell);
    }
    newTable.appendChild(row);

    //FILLS REST OF TABLE WITH BUTTONS/INPUT
    for(let i = 0; i < matrix.length; i ++){
        row = document.createElement("tr");
        cell = document.createElement("td");
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
            cell = document.createElement("td");
            textNode = document.createTextNode(matrix[i][j]);
            cell.appendChild(textNode);
            cell.setAttribute("class", "normalCell");
            row.appendChild(cell);
        }
        newTable.appendChild(row);
    }

    //CREATES THE DOWNLOAD CSV BUTTON
    var newButton = document.createElement("button");
    var text = document.createTextNode("Download CSV");
    newButton.appendChild(text);
    newButton.setAttribute("id", "downloadButton");
    if(matrix[0][0] === "OPERATION" && matrix[0][1] === "STATION"){
        document.getElementById("container").appendChild(newButton);
        document.getElementById("container").appendChild(newTable);
    }
    else{
        throwError();
    }
}

//This chunk is functions that interpret the document, line-by-line
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

//Calls functions based on line type, goes through whole file line by line.
function interpretFile(filePath){
    var looking = false;
    var post = false;
    var flowingRow = false;
    var timingRow = false;
    var valid = false;
    var postCounter = 0;
    var lineCounter = 0;
    var eachLine = Promise.promisify(lineReader.eachLine);
    eachLine(filePath, function(line){
        lineCounter += 1;
        if(line.includes("RATIOS APPLIED TO PRECIPITATION")){
            looking = true;
            matrix = [];
        }
        else if(line.includes("SUMMARY OF KINEMATIC WAVE")){
            printMatrix(matrix);
            valid = true;
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
                        valid = true;
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
    }).then(function(){
        if(lineCounter === 0 || !valid){
            throwError();
        }
    });
}

//Establishes a default path to look for the file first.
let username = process.env.username || process.env.user;
let defPath;
if(process.env.NODE_ENV == 'production'){
    defPath = 'C:\\Users\\' + username + '\\Desktop\\'
}
else{
    defPath = ''
}

//Look for a Hec-1 file via user, call interpret function with path.
document.querySelector('#selectBtn').addEventListener('click', function(e){
    e.preventDefault();
    $('#selectBtn').prop('disabled', true);
    dialog.showOpenDialog({
        defaultPath: defPath,
        properties: ['openFile'],
        filters: [{name: 'Hec-1', extensions: ['txt', 'OUT']}]
    }, function(filePaths){
        if (filePaths !== undefined){
            interpretFile(filePaths[0]);
        }
    });
});