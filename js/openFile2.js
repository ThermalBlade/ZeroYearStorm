var wholeString = "";

function interpretFile2(filePath){
    openingFile = true;
    var looking = false;
    wholeString = "*" + '\n';
    var eachLine = Promise.promisify(lineReader.eachLine);
    eachLine(filePath, function(line){
        if(line.includes("DEVELOPED CONDITION" || "UNDEVELOPED CONDITTION") && looking === false){
            looking = true;
        }
        else if(looking === true && line.charAt(0) === ',' || looking === true && line.charAt(0) === ' '){
            looking = false;
        }
        else if(!line.includes("DEVELOPED CONDITION") && !line.includes("UNDEVELOPED CONDITTION") && looking === true){
            let kkIndex = line.indexOf(',', 0);
            let startIndex = 0;
            let kk = line.substring(startIndex, kkIndex);

            let lsBeg = "LS     0";
            let lsIndex = line.indexOf(',', kkIndex + 1);
            startIndex = kkIndex + 1;
            let ls = line.substring(startIndex, lsIndex);
            if(ls.includes('.', 1)){
                ls = ls.substring(1, ls.length);
            }

            let currentIndex = lsIndex;
            for(let i = 0; i < 3; i ++){
                currentIndex = line.indexOf(',', currentIndex + 1);
            }

            let baIndex = line.indexOf(',', currentIndex + 1);
            startIndex = currentIndex + 1;
            let ba = line.substring(startIndex, baIndex);
            if(ba.includes('.', 1)){
                ba = ba.substring(1, ba.length);
            }

            currentIndex = baIndex;
            for(let i = 0; i < 12; i ++){
                currentIndex = line.indexOf(',', currentIndex + 1);
            }

            let udIndex = line.indexOf(',', currentIndex + 1);
            startIndex = currentIndex + 1;
            let ud = line.substring(startIndex, udIndex);
            if(ud.includes('.', 1)){
                ud = ud.substring(1, ud.length);
            }

            wholeString = wholeString + "KK"
            for(let i = 0; i < 8 - 2 - kk.length; i ++){
                wholeString = wholeString + " ";
            }
            wholeString = wholeString + kk + '\n';

            wholeString = wholeString + "BA"
            for(let i = 0; i < 8 - 2 - ba.length; i ++){
                wholeString = wholeString + " ";
            }
            wholeString = wholeString + ba + '\n';

            wholeString = wholeString + lsBeg;
            for(let i = 0; i < 8 - ls.length; i ++){
                wholeString = wholeString + " ";
            }
            wholeString = wholeString + ls + '\n';

            wholeString = wholeString + "UD"
            for(let i = 0; i < 8 - 2 - ud.length; i ++){
                wholeString = wholeString + " ";
            }
            wholeString = wholeString + ud + '\n';

            wholeString = wholeString + "*" + '\n';
        }
    }).then(function(){
        let csvButton = document.createElement("button");
        let csvText = document.createTextNode("Download .DAT");
        csvButton.appendChild(csvText);
        csvButton.setAttribute("id", "downloadTxtButton");
    
        let newButton = document.createElement("button");
        let newText = document.createTextNode("Upload New File");
        newButton.appendChild(newText);
        newButton.setAttribute("id", "newButton");

        let dropZone = document.getElementById("dropZoneHolder");
        if(dropZone !== null){
            dropZone.parentNode.removeChild(dropZone);
            document.getElementById("container").appendChild(csvButton);
            document.getElementById("container").appendChild(newButton);
        }
        let newShowText = document.createElement("p");
        newText = document.createTextNode(wholeString);
        newShowText.appendChild(newText);
        newShowText.setAttribute("id", "showText");
        document.getElementById("container").appendChild(newShowText);
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

document.addEventListener("click", function(e){
    if(e.target.id === "downloadTxtButton")
    {
        function downloadCSV(csv, filename) {
            var csvFile;
            csvFile = new Blob([csv], {type: "text/plain"});
            let docName = document.getElementById("currentDocName");
            let name;
            if(docName !== null){
                name = docName.innerHTML + ".DAT";
            }
            else{
                name = "HEC1INPUT.DAT";
            }
            download(csvFile, name, "text/plain");
        }
        function exportTableToCSV(filename) {
            downloadCSV(wholeString, filename);
        }
        exportTableToCSV("working.csv")
    }
    else if(e.target.id === "newButton")
    {
        this.location.reload();
    }
});