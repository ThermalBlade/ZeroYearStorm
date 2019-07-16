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