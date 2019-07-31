function interpretFile2(filePath){
    openingFile = true;
    var looking = false;
    var post = false;
    var flowingRow = false;
    var timingRow = false;
    var valid = false;
    var postCounter = 0;
    var lineCounter = 0;
    var eachLine = Promise.promisify(lineReader.eachLine);
    eachLine(filePath, function(line){
        if(line.includes("DEVELOPED CONDITION" || "UNDEVELOPED CONDITTION") && looking === false){
            looking = true;
        }
        else if(looking === true && line.charAt(0) === ',' || looking === true && line.charAt(0) === ' '){
            looking = false;
        }
        else if(!line.includes("DEVELOPED CONDITION") && !line.includes("UNDEVELOPED CONDITTION")){
            
        }
    });
}

//LISTEN FOR USAGE OF RIGHT SIDE
document.querySelector('#selectBtn2').addEventListener('click', function(e){
    e.preventDefault();
    $('#selectBtn2').prop('disabled', true);
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{name: 'Hec-1', extensions: ['csv', 'CSV']}]
    }, function(filePaths){
        if(filePaths !== undefined){
            let currentFilePath = document.createElement("span");
            currentFilePath.setAttribute("id", "currentFilePath");
            let textNode = document.createTextNode(filePaths[0]);
            currentFilePath.appendChild(textNode);
            document.getElementById("storage").appendChild(currentFilePath);
            document.getElementById("currentFilePath").style.visibility = "hidden";
            
            let fnIndex = filePaths[0].lastIndexOf('\\');
            let fnIndex2 = filePaths[0].lastIndexOf('.');
            let name = filePaths[0].substring(fnIndex + 1, fnIndex2);
            if(fnIndex !== -1 && fnIndex2 !== -1){
                let currentDocName = document.createElement("span");
                currentDocName.setAttribute("id", "currentDocName");
                let textNode = document.createTextNode(name);
                currentDocName.appendChild(textNode);
                document.getElementById("storage").appendChild(currentDocName);
                document.getElementById("currentDocName").style.visibility = "hidden";
            }
            interpretFile2(filePaths[0]);
        }
        else{
            $('#selectBtn2').prop('disabled', false);
        }
    });
});
document.addEventListener("mouseover", someListener);
function someListener(e){
    e.preventDefault();
    if(droppedFilePath2 !== ""){
        if(droppedFilePath2 !== undefined){
            $('#selectBtn2').prop('disabled', true);
            let currentFilePath = document.createElement("span");
            currentFilePath.setAttribute("id", "currentFilePath");
            let textNode = document.createTextNode(droppedFilePath2);
            currentFilePath.appendChild(textNode);
            document.getElementById("storage").appendChild(currentFilePath);
            document.getElementById("currentFilePath").style.visibility = "hidden";

            let fnIndex = droppedFilePath2.lastIndexOf('\\');
            let fnIndex2 = droppedFilePath2.lastIndexOf('.');
            let name = droppedFilePath2.substring(fnIndex + 1, fnIndex2);
            if(fnIndex !== -1 && fnIndex2 !== -1){
                let currentDocName = document.createElement("span");
                currentDocName.setAttribute("id", "currentDocName");
                let textNode = document.createTextNode(name);
                currentDocName.appendChild(textNode);
                document.getElementById("storage").appendChild(currentDocName);
                document.getElementById("currentDocName").style.visibility = "hidden";
            }
            interpretFile2(droppedFilePath2);
        }
        droppedFilePath2 = "";
    }
}