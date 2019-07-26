function changeColColorBack(table, col){
    let lightGrey = "rgb(72, 72, 72)";
    let mediumGrey = "rgb(66, 66, 66)";
    let darkGrey = "rgb(60, 60, 60)";
    for(var i = 1, row; row = table.rows[i], i < table.rows.length; i ++){
        let className = row.className;
        if(className === "topRow"){
            row.cells[col].style.backgroundColor = lightGrey;
        }
        else if(className === "secondRow"){
            row.cells[col].style.backgroundColor = lightGrey;
        }
        else if(className === "operationRow"){
            row.cells[col].style.backgroundColor = darkGrey;
        }
        else if(className === "flowRow"){
            row.cells[col].style.backgroundColor = mediumGrey;
        }
        else if(className === "timeRow"){
            row.cells[col].style.backgroundColor = lightGrey;
        }
    }
}

function changeColColor(color, table, col) {
    for(var i = 1, row; row = table.rows[i], i < table.rows.length; i ++){
        row.cells[col].style.backgroundColor = color;
    }
}

function changeColor(color, elms) {
    let n = elms.length;
    for(var i = 0; i < n; i ++){
        for(var j = 1; j < elms[0].cells.length; j ++){
            elms[i].cells[j].style.backgroundColor = color;
        }
    }
}

function checkForHighlight(){
    let redHighlight = "rgb(100, 26, 26)";
    let lightGrey = "rgb(72, 72, 72)";
    let mediumGrey = "rgb(66, 66, 66)";
    let darkGrey = "rgb(60, 60, 60)";

    //Top Row
    $('.deleteTopRowCell').on('mouseenter', function(){
        let elms = document.getElementsByClassName('topRow');
        changeColor(redHighlight, elms)
    })
    $('.deleteTopRowCell').on('mouseout', function(){
        let elms = document.getElementsByClassName('topRow');
        changeColor(lightGrey, elms)
    })
    //Second Row
    $('.deleteSecondRowCell').on('mouseenter', function(){
        let elms = document.getElementsByClassName('secondRow');
        changeColor(redHighlight, elms)
    })
    $('.deleteSecondRowCell').on('mouseout', function(){
        let elms = document.getElementsByClassName('secondRow');
        changeColor(lightGrey, elms)
    })
    //Operation Row
    $('.deleteOperationRowCell').on('mouseenter', function(){
        let elms = document.getElementsByClassName("operationRow");
        changeColor(redHighlight, elms)
    })
    $('.deleteOperationRowCell').on('mouseout', function(){
        let elms = document.getElementsByClassName("operationRow");
        changeColor(darkGrey, elms)
    })
    //Flow Row
    $('.deleteFlowRowCell').on('mouseenter', function(){
        let elms = document.getElementsByClassName("flowRow");
        changeColor(redHighlight, elms)
    })
    $('.deleteFlowRowCell').on('mouseout', function(){
        let elms = document.getElementsByClassName("flowRow");
        changeColor(mediumGrey, elms)
    })
    //Time Row
    $('.deleteTimeRowCell').on('mouseenter', function(){
        let elms = document.getElementsByClassName("timeRow");
        changeColor(redHighlight, elms)
    })
    $('.deleteTimeRowCell').on('mouseout', function(){
        let elms = document.getElementsByClassName("timeRow");
        changeColor(lightGrey, elms)
    })

    //Operation Col
    $('.deleteOperationColCell').on('mouseenter', function(){
        let table = document.getElementById('hec1Table');
        let row = document.getElementById("topButtonsRow");
        let button = "deleteOperationColCell"
        let colCounter;
        for(var j = 0; j < row.cells.length; j ++){
            if(row.cells[j].className === button){
                colCounter = j;
                break;
            }
        }
        changeColColor(redHighlight, table, colCounter);
    })
    $('.deleteOperationColCell').on('mouseout', function(){
        let table = document.getElementById('hec1Table');
        let row = document.getElementById("topButtonsRow");
        let button = "deleteOperationColCell"
        let colCounter;
        for(var j = 0; j < row.cells.length; j ++){
            if(row.cells[j].className === button){
                colCounter = j;
                break;
            }
        }
        changeColColorBack(table, colCounter);
    })
    //Station Col
    $('.deleteStationColCell').on('mouseenter', function(){
        let table = document.getElementById('hec1Table');
        let row = document.getElementById("topButtonsRow");
        let button = "deleteStationColCell"
        let colCounter;
        for(var j = 0; j < row.cells.length; j ++){
            if(row.cells[j].className === button){
                colCounter = j;
                break;
            }
        }
        changeColColor(redHighlight, table, colCounter);
    })
    $('.deleteStationColCell').on('mouseout', function(){
        let table = document.getElementById('hec1Table');
        let row = document.getElementById("topButtonsRow");
        let button = "deleteStationColCell"
        let colCounter;
        for(var j = 0; j < row.cells.length; j ++){
            if(row.cells[j].className === button){
                colCounter = j;
                break;
            }
        }
        changeColColorBack(table, colCounter);
    })
    //Area Col
    $('.deleteAreaColCell').on('mouseenter', function(){
        let table = document.getElementById('hec1Table');
        let row = document.getElementById("topButtonsRow");
        let button = "deleteAreaColCell"
        let colCounter;
        for(var j = 0; j < row.cells.length; j ++){
            if(row.cells[j].className === button){
                colCounter = j;
                break;
            }
        }
        changeColColor(redHighlight, table, colCounter);
    })
    $('.deleteAreaColCell').on('mouseout', function(){
        let table = document.getElementById('hec1Table');
        let row = document.getElementById("topButtonsRow");
        let button = "deleteAreaColCell"
        let colCounter;
        for(var j = 0; j < row.cells.length; j ++){
            if(row.cells[j].className === button){
                colCounter = j;
                break;
            }
        }
        changeColColorBack(table, colCounter);
    })
    //Plan Col
    $('.deletePlanColCell').on('mouseenter', function(){
        let table = document.getElementById('hec1Table');
        let row = document.getElementById("topButtonsRow");
        let button = "deletePlanColCell"
        let colCounter;
        for(var j = 0; j < row.cells.length; j ++){
            if(row.cells[j].className === button){
                colCounter = j;
                break;
            }
        }
        changeColColor(redHighlight, table, colCounter);
    })
    $('.deletePlanColCell').on('mouseout', function(){
        let table = document.getElementById('hec1Table');
        let row = document.getElementById("topButtonsRow");
        let button = "deletePlanColCell"
        let colCounter;
        for(var j = 0; j < row.cells.length; j ++){
            if(row.cells[j].className === button){
                colCounter = j;
                break;
            }
        }
        changeColColorBack(table, colCounter);
    })
    //Flow Col
    $('.deleteFlowColCell').on('mouseenter', function(){
        let table = document.getElementById('hec1Table');
        let row = document.getElementById("topButtonsRow");
        let button = "deleteFlowColCell"
        let colCounter;
        for(var j = 0; j < row.cells.length; j ++){
            if(row.cells[j].className === button){
                colCounter = j;
                break;
            }
        }
        changeColColor(redHighlight, table, colCounter);
    })
    $('.deleteFlowColCell').on('mouseout', function(){
        let table = document.getElementById('hec1Table');
        let row = document.getElementById("topButtonsRow");
        let button = "deleteFlowColCell"
        let colCounter;
        for(var j = 0; j < row.cells.length; j ++){
            if(row.cells[j].className === button){
                colCounter = j;
                break;
            }
        }
        changeColColorBack(table, colCounter);
    })
}

//MOUSEOVER AND DELETE ROWS
document.addEventListener("mouseover", someListener);
function someListener(e){
    e.preventDefault();
    checkForHighlight();
    $(document).ready(function () {
        $(".deleteTopRowCell").click(function(){
            $('.topRow').animate({
                opacity: 0.01
            }, 250, function(){
                $(this).remove();
            });
        });
        $(".deleteSecondRowCell").click(function(){
            $('.secondRow').animate({
                opacity: 0.01
            }, 250, function(){
                $(this).remove();
            });
        });
        $(".deleteOperationRowCell").click(function(){
            $('.operationRow').animate({
                opacity: 0.01
            }, 250, function(){
                $(this).remove();
            });
        });
        $(".deleteFlowRowCell").click(function(){
            $('.flowRow').animate({
                opacity: 0.01
            }, 250, function(){
                $(this).remove();
            });
        });
        $(".deleteTimeRowCell").click(function(){
            $('.timeRow').animate({
                opacity: 0.01
            }, 250, function(){
                $(this).remove();
            });
        });

        $(".deleteOperationColCell").click(function(){
            let row = document.getElementById("topButtonsRow");
            let button = "deleteOperationColCell"
            let colCounter;
            for(var j = 0; j < row.cells.length; j ++){
                if(row.cells[j].className === button){
                    colCounter = j;
                    break;
                }
            }
            $("tr").each(function(){
                $(this).find("td:eq(" + colCounter + ")").animate({
                    opacity: 0.01
                }, 250, function(){
                    $(this).remove();
                });
            })
        });
        $(".deleteStationColCell").click(function(){
            let row = document.getElementById("topButtonsRow");
            let button = "deleteStationColCell"
            let colCounter;
            for(var j = 0; j < row.cells.length; j ++){
                if(row.cells[j].className === button){
                    colCounter = j;
                    break;
                }
            }
            $("tr").each(function(){
                $(this).find("td:eq(" + colCounter + ")").animate({
                    opacity: 0.01
                }, 250, function(){
                    $(this).remove();
                });
            })
        });
        $(".deleteAreaColCell").click(function(){
            let row = document.getElementById("topButtonsRow");
            let button = "deleteAreaColCell"
            let colCounter;
            for(var j = 0; j < row.cells.length; j ++){
                if(row.cells[j].className === button){
                    colCounter = j;
                    break;
                }
            }
            $("tr").each(function(){
                $(this).find("td:eq(" + colCounter + ")").animate({
                    opacity: 0.01
                }, 250, function(){
                    $(this).remove();
                });
            })
        });
        $(".deletePlanColCell").click(function(){
            let row = document.getElementById("topButtonsRow");
            let button = "deletePlanColCell"
            let colCounter;
            for(var j = 0; j < row.cells.length; j ++){
                if(row.cells[j].className === button){
                    colCounter = j;
                    break;
                }
            }
            $("tr").each(function(){
                $(this).find("td:eq(" + colCounter + ")").animate({
                    opacity: 0.01
                }, 250, function(){
                    $(this).remove();
                });
            })
        });
        $(".deleteFlowColCell").click(function(){
            let row = document.getElementById("topButtonsRow");
            let button = "deleteFlowColCell"
            let colCounter;
            for(var j = 0; j < row.cells.length; j ++){
                if(row.cells[j].className === button){
                    colCounter = j;
                    break;
                }
            }
            $("tr").each(function(){
                $(this).find("td:eq(" + colCounter + ")").animate({
                    opacity: 0.01
                }, 250, function(){
                    $(this).remove();
                });
            })
        });
    });
}

//BUTTONS ON TOP
document.addEventListener("click", function(e){
    if(e.target.id === "downloadButton")
    {
        function downloadCSV(csv, filename) {
            var csvFile;
            csvFile = new Blob([csv], {type: "text/csv"});
            let docName = document.getElementById("currentDocName");
            let name;
            if(docName !== null){
                name = docName.innerHTML + ".csv";
            }
            else{
                name = "HEC1OUTPUT.csv";
            }
            download(csvFile, name, "text/csv");
        }
        function exportTableToCSV(filename) {
            var csv = [];
            var rows = document.querySelectorAll("table tr");
            
            for (var i = 1; i < rows.length; i++) {
                var row = [], cols = rows[i].querySelectorAll("td, th");
                
                for (var j = 1; j < cols.length; j++) 
                    row.push(cols[j].innerText);
                
                csv.push(row.join(","));        
            }
            downloadCSV(csv.join("\n"), filename);
        }
        exportTableToCSV("working.csv")
    }
    else if(e.target.id === "newButton")
    {
        this.location.reload();
    }
    else if(e.target.id === "resetButton")
    {
        reloadTable();
    }
});