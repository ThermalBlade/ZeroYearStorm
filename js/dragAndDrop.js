var droppedFilePath = "";
var openingFile = false;

//Called if the document isn't a standard HEC-1 output
function throwFileNumberError(){
  dialog.showErrorBox("Invalid Document", "Please only select one document.");
  dragLeaveHandler();
}
function throwNonFileError(){
  dialog.showErrorBox("Invalid Document", "Please select a valid file.");
  dragLeaveHandler();
}
function throwNonTxtError(){
  dialog.showErrorBox("Invalid Document", "Please select a .txt or .OUT file.");
  dragLeaveHandler();
}
function waitForError(){
  dialog.showErrorBox("Invalid Document", "Please select a .txt or .OUT file.");
  dragLeaveHandler();
}

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
            throwNonTxtError();
          }
          else{
            //This is the passing condition for the file, pass it to openFile
            droppedFilePath = path;
          }
        }
        else{
          throwNonFileError();
        }
      }
      else{
        throwFileNumberError();
      }
    }
  }
  else{
    throw waitForError();
  }
}

function changeDivs(addOns = ""){
  newWidth = "width:" + String((window.innerWidth / 2) - 60) + "px;";
  newHeight = "height:" + String(window.innerHeight - 25) + "px;";
  newDropZoneInsert = newWidth + " " + newHeight + addOns;
  document.getElementById('drop_zone').setAttribute("style", newDropZoneInsert);
}

function dragOverHandler(ev){
  ev.preventDefault();
  changeDivs("border: 2px dashed white;");
}

function dragLeaveHandler(ev){
  //ev.preventDefault();
  changeDivs("border: 2px dashed grey;");
}

window.addEventListener('resize', function(){
  if(this.document.getElementById('drop_zone') !== null){
    changeDivs();
  }
});
window.onload = function() {
  changeDivs();
};