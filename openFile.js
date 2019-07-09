const {dialog} = require('electron').remote;
const lineReader = require('line-reader');

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
    var firstSpace = false;
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
                for(var i = 0; i < l - 1; i ++){
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

function fi(filePath){
    let looking = false;
    let post = false;
    let flowRow = false;
    let postCounter = 0;
    var matrix = [];
    lineReader.eachLine(filePath, function(line){
        if(line.includes("RATIOS APPLIED TO PRECIPITATION")){
            looking = true;
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
                    matrix.push(opAdd(line, matrix[0].length));
                    post = false;
                    flowRow = true;
                    postCounter = 0;
                }
            }
            else if(flowRow == true){
                matrix.push(flowRow(line))
            }
        }
    });
    console.log(matrix);
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