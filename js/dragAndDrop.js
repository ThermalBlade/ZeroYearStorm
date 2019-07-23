function dropHandler(ev){
    ev.preventDefault();
    if(ev.dataTransfer.items){
        if(ev.dataTransfer.items.length === 1){
            // Use DataTransferItemList interface to access the file(s)
            for(var i = 0; i < ev.dataTransfer.items.length; i++){
                // If dropped items aren't files, reject them
                if (ev.dataTransfer.items[i].kind === 'file'){
                    var file = ev.dataTransfer.items[i].getAsFile();
                    console.log('... file[' + i + '].name = ' + file.name);
                }
            }
        }
    } 
    else{
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
      }
    }
  }
  function dragOverHandler(ev) {
    console.log('File(s) in drop zone'); 
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }