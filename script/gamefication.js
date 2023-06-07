
var points = 0;

var addedStudents = [
    {
        matricula: "567890",
        nome: "Luiz Souza",
        notaPrimeiraProva: 16,
        notaSegundaProva: 23,
        materias: [
            "Arquitetura de Computadores I",
            "Arquitetura de Computadores II",
            "Cálculo I",
            "Desenvolvimento de Interfaces WEB",
            "Laboratório de Introdução á Engenharia de Computação",
            "Linguagem de Programação"
        ]
    },
    {
        matricula: "678901",
        nome: "Carla Ferreira",
        notaPrimeiraProva: 27,
        notaSegundaProva: 27,
        materias: [
            "Algoritmos e Estrutura de Dados I - AEDs I",
            "Algoritmos e Estrutura de Dados II - AEDs II",
            "Arquitetura de Computadores I",
            "Banco de Dados"
        ]
    },
    {
        matricula: "789012",
        nome: "Gabriel Ribeiro",
        notaPrimeiraProva: 14,
        notaSegundaProva: 13,
        materias: [
            "Algoritmos e Estrutura de Dados II - AEDs II",
            "Arquitetura de Computadores I",
            "Arquitetura de Computadores II",
            "Cálculo I",
            "Desenvolvimento de Interfaces WEB"
        ]
    },
];

function updatePoints(newPoints){
    points = newPoints;
    $('#points').empty().html(`<p class="m-0"><span>${points}</span> pts</p>`);
}

function showPrizes(){
    var list = $('#prizes-list');
    var str = "";
    prizes.map(p => {
        str += `<li class="list-group-item ${points<p.pontos && " not-earned"}">${p.pontos}pts - ${p.premio}</li>`;
    });
    list.html(str);
}

function calculateSituation(student){
    var msg = "";    
    var newPoints = points;
    if(!student.notaPrimeiraProva || !student.notaSegundaProva){
        msg = "Aguardando nota";
    } else if(student.notaSegundaProva == student.notaPrimeiraProva) {
        msg = "Neutro";
        newPoints += 50;
    } else if(student.notaSegundaProva > student.notaPrimeiraProva){
        msg = "Positivo";
        newPoints += 100;
    } else {
        msg = "Negativo";
    }
    updatePoints(newPoints);
    return msg;
}

function showStudents(){
    points = 0;
    var list = $('#students-list');
    var str = "";
    addedStudents.map(s => {
        str += `<li class="list-group-item">
            <div class="row">
                <div class="col-4 col-md-2">${s.matricula}</div>
                <div class="col-4 col-md-5">${s.nome}</div>
                <div class="col-4 col-md-5">${calculateSituation(s)}</div>
            </div>    
        </li>`;
    });
    list.html(str);
    showPrizes();
}

function checkIfStudentIsAdded(matricula){
    for(let i = 0; i < addedStudents.length; i++){
        if (addedStudents[i].matricula === matricula) {
            return true;
        }
    }
    return false;
}

function addStudent(){
    let searchStudentField = $('#search-student');
    let matricula = searchStudentField.val();
    if(matricula.length == 6){
        let studentToAdd = undefined;
        students.map((s) => { if(s.matricula === matricula) studentToAdd = s; });

        if(studentToAdd){
            if(studentToAdd.materias.includes(login.materia) ){
                if(!checkIfStudentIsAdded(studentToAdd.matricula)){
                    addedStudents.push(studentToAdd);
                    showStudents();
                } else {
                    alert("Aluno já cadastrado.");
                }
            } else {
                alert("Aluno não está cursando essa matéria.");
            }
            searchStudentField.val("");
        } else {
            alert("Aluno não encontrado.");
        }
        
    } else {
        alert("Número de matrícula inválido!");
    }
}

function getRandomMatricula(){
    $('#search-student').val(students[Math.floor(Math.random() * students.length-1)].matricula);
}


function loadGameficationPage(){
    showStudents();
}


