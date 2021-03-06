//Variables to be accessed by openFile.js
var droppedFilePath = "";
var droppedFilePath2 = "";
var openingFile = false;
//Fetch colors from CSS
var bodyStyles = window.getComputedStyle(document.body);
var dzLineColor = bodyStyles.getPropertyValue('--drop-zone-line-color'); 
var dzHighlightColor = bodyStyles.getPropertyValue('--drop-zone-line-highlight');

//Adjusts css boxes based on window size
function changeDivs(leftAddOns = "", rightAddOns = ""){
  divWidth = 76;
  //Left Div
  let newWidth = "width:" + String((window.innerWidth / 2) - divWidth) + "px;";
  let newHeight = "height:" + String(window.innerHeight - 42) + "px;";
  let newDropZoneInsert = newWidth + " " + newHeight + leftAddOns;
  document.getElementById('drop_zone').setAttribute("style", newDropZoneInsert);

  //Right Div
  newWidth = "width:" + String((window.innerWidth / 2) - divWidth) + "px;";
  newHeight = "height:" + String(window.innerHeight - 42) + "px;";
  newDropZoneInsert = newWidth + " " + newHeight + rightAddOns;
  document.getElementById('drop_zone2').setAttribute("style", newDropZoneInsert);
}

//Glow up if file is over
function dragOverHandler(ev){
  ev.preventDefault();
  changeDivs("border: 2px dashed " + dzHighlightColor + ";", "");
}

//Glow down if file leaves area
function dragLeaveHandler(ev){
  changeDivs("border: 2px dashed " + dzLineColor + ";", "");
}

//Called if the document isn't a standard HEC-1 output
function throwFileError(message){
  dialog.showErrorBox("Invalid Document", message);
  dragLeaveHandler();
}

//Called when something is dropped into left side
function dropHandler(ev){
  ev.preventDefault();
  if(openingFile === false){
    if(ev.dataTransfer.items){
      if(ev.dataTransfer.items.length === 1){
        if(ev.dataTransfer.items[0].kind === 'file'){
          let file = ev.dataTransfer.items[0].getAsFile();
          let path = file.path;
          let fileType = path.substr(path.length - 3);
          if(fileType !== 'OUT' && fileType !== 'txt'){
            throwFileError("Please select a .txt or .OUT file.");
          }
          else{
            //This is the passing condition for the file, openFile.js accesses this global variable.
            droppedFilePath = path;
          }
        }
        else{
          throwFileError("Please select a valid file.");
        }
      }
      else{
        throwFileError("Please only select one document.");
      }
    }
  }
  else{
    throwFileError("Please select a .txt or .OUT file.");
  }
}

//Same but for right
function dragOverHandler2(ev){
  ev.preventDefault();
  changeDivs("", "border: 2px dashed " + dzHighlightColor + ";");
}
function dragLeaveHandler2(ev){
  changeDivs("", "border: 2px dashed " + dzLineColor + ";");
}
function dropHandler2(ev){
  ev.preventDefault();
  if(openingFile === false){
    if(ev.dataTransfer.items){
      if(ev.dataTransfer.items.length === 1){
        if(ev.dataTransfer.items[0].kind === 'file'){
          let file = ev.dataTransfer.items[0].getAsFile();
          let path = file.path;
          let fileType = path.substr(path.length - 3);
          if(fileType !== 'csv' && fileType !== 'CSV'){
            throwFileError("Please select a .csv file.");
          }
          else{
            droppedFilePath2 = path;
          }
        }
        else{
          throwFileError("Please select a valid file.");
        }
      }
      else{
        throwFileError("Please only select one document.");
      }
    }
  }
  else{
    throwFileError("Please select a .csv file.");
  }
}

//Listen for a change in window size, call adjustments
window.addEventListener('resize', function(){
  if(this.document.getElementById('drop_zone') !== null){
    changeDivs();
  }
});
window.onload = function() {
  changeDivs();
};