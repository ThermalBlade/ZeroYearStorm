function changeColor(color, elms) {
    let n = elms.length;
    for(var i = 0; i < n; i ++) {
        elms[i].style.backgroundColor = color;
    }
}
function checkForHighlight(){
    $('.deleteTopRowCell').on('mouseenter', function(){
        let elms = document.getElementsByClassName('topRow');
        changeColor("rgb(100, 26, 26)", elms)
    })
    $('.deleteTopRowCell').on('mouseout', function(){
        let elms = document.getElementsByClassName('topRow');
        changeColor("rgb(72, 72, 72)", elms)
    })

    $('.deleteSecondRowCell').on('mouseenter', function(){
        let elms = document.getElementsByClassName('secondRow');
        changeColor("rgb(100, 26, 26)", elms)
    })
    $('.deleteSecondRowCell').on('mouseout', function(){
        let elms = document.getElementsByClassName('secondRow');
        changeColor("rgb(72, 72, 72)", elms)
    })

    $('.deleteOperationRowCell').on('mouseenter', function(){
        let elms = document.getElementsByClassName("operationRow");
        changeColor("rgb(100, 26, 26)", elms)
    })
    $('.deleteOperationRowCell').on('mouseout', function(){
        let elms = document.getElementsByClassName("operationRow");
        changeColor("rgb(60, 60, 60)", elms)
    })

    $('.deleteFlowRowCell').on('mouseenter', function(){
        let elms = document.getElementsByClassName("flowRow");
        changeColor("rgb(100, 26, 26)", elms)
    })
    $('.deleteFlowRowCell').on('mouseout', function(){
        let elms = document.getElementsByClassName("flowRow");
        changeColor("rgb(66, 66, 66)", elms)
    })

    $('.deleteTimeRowCell').on('mouseenter', function(){
        let elms = document.getElementsByClassName("timeRow");
        changeColor("rgb(100, 26, 26)", elms)
    })
    $('.deleteTimeRowCell').on('mouseout', function(){
        let elms = document.getElementsByClassName("timeRow");
        changeColor("rgb(72, 72, 72)", elms)
    })
}

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

document.addEventListener("click", someButtonListener);
function someButtonListener(e){
    if(e.target.id === "downloadButton")
    {
        $(document).ready(function () {
            $('#hec1Table').each(function () {
                var $table = $(this);
                var $button = $("<button type='button'>");
                $button.text("Export to spreadsheet");
                $button.insertAfter($table);
        
                $button.click(function () {
                    var csv = $table.table2CSV({
                        delivery: 'value'
                    });
                    window.location.href = 'data:text/csv;charset=UTF-8,' 
                    + encodeURIComponent(csv);
                });
            });
        })
    }

}

/*var $  = require( 'jquery' );
require( 'jszip' );
require( 'datatables.net-dt' )();
require( 'datatables.net-buttons-dt' )();
require( 'datatables.net-buttons/js/buttons.html5.js' )();

document.addEventListener("click", someButtonListener);
function someButtonListener(e){
    if(e.target.id === "downloadButton")
    {
        $(document).ready(function() {
            $('#hec1Table').DataTable( {
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5'
                ]
            } );
        } );
    }

}*/