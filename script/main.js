function loadPage(page){

    if(page == 0){
        $(function(){
            $("#content").empty().load("../src/pages/monitoringTable.html"); 
            $("#loadMonitoringTable").css("border", "none").css("border-bottom", "solid 3px #12495b");
            $("#loadGamefication").css("border", "none");
        });
        window.setTimeout(loadMonitoringTablePage, 1000);
        
    } else if(page == 1){
        $(function(){
            $("#content").empty().load("../src/pages/gamefication.html");
            $("#loadGamefication").css("border", "none").css("border-bottom", "solid 3px #12495b");
            $("#loadMonitoringTable").css("border", "none");
        });
        window.setTimeout(loadGameficationPage, 1000);
    }

}


