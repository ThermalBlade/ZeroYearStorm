function changeColor(color, elms) {
    let n = elms.length;
    for(var i = 0; i < n; i ++) {
        elms[i].style.backgroundColor = color;
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
}

//MOUSEOVER AND DELETE ROWS
document.addEventListener("mouseover", someListener);
function someListener(e){
    e.preventDefault();
    checkForHighlight();
    $(document).ready(function () {
        $(".deleteTopRowCell").click(function(){
            $('.topRow').animate({
                opacity: 0.00001
            }, 350, function(){
                $(this).remove();
            });
        });
        $(".deleteSecondRowCell").click(function(){
            $('.secondRow').animate({
                opacity: 0.00001
            }, 350, function(){
                $(this).remove();
            });
        });
        $(".deleteOperationRowCell").click(function(){
            $('.operationRow').animate({
                opacity: 0.00001
            }, 350, function(){
                $(this).remove();
            });
        });
        $(".deleteFlowRowCell").click(function(){
            $('.flowRow').animate({
                opacity: 0.00001
            }, 350, function(){
                $(this).remove();
            });
        });
        $(".deleteTimeRowCell").click(function(){
            $('.timeRow').animate({
                opacity: 0.00001
            }, 350, function(){
                $(this).remove();
            });
        });
    });
}

//DOWNLOAD CSV BUTTON
document.addEventListener("click", function(e){
    if(e.target.id === "downloadButton")
    {
        function downloadCSV(csv, filename) {
            var csvFile;
            csvFile = new Blob([csv], {type: "text/csv"});
            download(csvFile, "testing.csv", "text/csv");
        }
        function exportTableToCSV(filename) {
            var csv = [];
            var rows = document.querySelectorAll("table tr");
            
            for (var i = 0; i < rows.length; i++) {
                var row = [], cols = rows[i].querySelectorAll("td, th");
                
                for (var j = 0; j < cols.length; j++) 
                    row.push(cols[j].innerText);
                
                csv.push(row.join(","));        
            }
            downloadCSV(csv.join("\n"), filename);
        }
        exportTableToCSV("working.csv")
    }
});