
/*
    Const used to store all the data from monitoring session.
*/
const fullData = monitoring_sessions;


/*
    Variabel used to store the the data according to search input.
*/
var filteredData;


/*
    Function used to show the full monitoring information in a modal on mobile view.
*/
function showInfo(monitoringClass){
    const modal = $('#monitoringModal');

    strModal = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" >${monitoringClass.materia}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
            <ul>    
                <li>Monitor: ${monitoringClass.monitor}</li>
                <li>Dia: ${monitoringClass.dia}</li>
                <li>Horário: ${monitoringClass.horario}</li>
                <li>Local: ${monitoringClass.local}</li>
            </ul>    
        </div>
      </div>
    </div>`;

    modal.html(strModal);
    modal.modal('show');
}


/*
    Function used to generate the data for monitoring table.
*/
function showData(){
    let strComponent = "";
    filteredData?.map((m) => {
        strComponent += `
        <li class="list-group-item">
            <div class="row">
                <div class="col-7 col-md-4">${m.materia}</div>
                <div class="col-2 d-none d-md-inline">${m.monitor}</div>
                <div class="col-3 col-md-2">${m.dia}</div>
                <div class="col-2 d-none d-md-inline">${m.horario}</div>
                <div class="col-2 d-none d-md-inline">${m.local}</div>
                <div class="col-2 d-inline d-md-none text-center">
                    <button type="button" class="info-button" onClick="showInfo(${JSON.stringify(m).split('"').join("&quot;")})">
                        <i class="fa fa-search-plus" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </li>`;
    });

    $("#list").empty().html(strComponent);
}


/*
    Function used to check if data fits into search input.
*/
function filterTable(text, monitoring){
    text = text.toLowerCase();
    return !!(monitoring.materia.toString().toLowerCase().includes(text) || 
            monitoring.monitor.toString().toLowerCase().includes(text) || 
            monitoring.dia.toString().toLowerCase().includes(text)
    );
}


/*
    Function used to trigger search event.
    First checks if search input is empty.
    If not empty, filter the data and call showData() generate the table.
*/
function searchData(text){
    $("#list").empty().html(`
        <li class="list-group-item d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        <li class="list-group-item">`
        
    );

    if(text === ""){
        filteredData = fullData;
    } else {
        filteredData = [];
        fullData.map((m) => {
            if(filterTable(text, m)){
                filteredData.push(m);
            }
        });
    }
    
    showData();
}

/*
    Function used to trigger functions for monitoring table page on loading.
*/
function loadMonitoringTablePage(){
    searchData("");
}