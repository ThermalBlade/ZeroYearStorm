//Delete singular row

document.addEventListener("mouseover", someListener);

function someListener(event){
    var element = event.target;
    console.log(element.classList)
    if(element.classList.contains("deleteRowCell")){
        if(element.classList.contains("deleteTopRow")){
            console.log("aa")
            document.table.deleteRow(0)
        }
    }
}