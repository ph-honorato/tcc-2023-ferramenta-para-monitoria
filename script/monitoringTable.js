var fullData = monitoring_sessions;
var filteredData;

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

    $("#list").html(strComponent);
}

function filterTable(text, monitoring){
    text = text.toLowerCase();
    return !!(monitoring.materia.toString().toLowerCase().includes(text) || 
            monitoring.monitor.toString().toLowerCase().includes(text) || 
            monitoring.dia.toString().toLowerCase().includes(text)
    );
}

function searchData(text){
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

function loadMonitoringTablePage(){
    searchData("");
}