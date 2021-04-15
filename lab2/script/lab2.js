var firstlyMass;
var mainMass = '';
var rMass = [];
var perMass = '';
var mainflag = 0;
function number(a) {
    if ((a >= 0) && (a < 10)) {
        return true;
    }
    else {
        return false;
    }
}
function Validation(){
    firstlyMass = document.getElementById('mass').value;
    if(firstlyMass == '') alert("Введите элементы.");
    var validMass = firstlyMass.split(", ");
    let valid; 
    let valid2; 
    let valid1;
    for(let i = 0; i < validMass.length; i++){
        valid = validMass[i].split(' ');
        valid1 = valid[0].split('');
        valid2 = valid[1].split('');
        if(valid1[0] % 2 == 0 && valid1[1] % 2 == 1 && number(valid1[2]) == true && number(valid1[3]) == true 
        && valid2[0] % 2 == 0 && valid2[1] % 2 == 1 && number(valid2[2]) == true && number(valid2[3]) == true 
        && valid1.length == 4 && valid2.length == 4 && i==validMass.length-1)
        {
            perMass = perMass + valid[0] + " " + valid[1];
            rMass.push(valid[0]);
            rMass.push(valid[1]);
        } 
        else 
        if(valid1[0] % 2 == 0 && valid1[1] % 2 == 1 && number(valid1[2]) == true && number(valid1[3]) == true 
        && valid2[0] % 2 == 0 && valid2[1] % 2 == 1 && number(valid2[2]) == true && number(valid2[3]) == true 
        && valid1.length == 4 && valid2.length == 4)
        {
            perMass = perMass + valid[0] + " " + valid[1] + ", ";
            rMass.push(valid[0]);
            rMass.push(valid[1]);
        }
        else alert('Неккоректный ввод');
    document.getElementById("reflection").innerHTML = "";
    document.getElementById("symmetric").innerHTML = "";
    document.getElementById("cosymmetric").innerHTML = "";
    document.getElementById("transition").innerHTML = "";
    }
    mainMass = perMass.split(", ");
}

function Reflection(){
    let mass1;
    let flag;
    for(let i = 0; i < mainMass.length; i++){
        mass1 = mainMass[i].split(" ");
        for(let j = 0; j < mass1.length; j++){
            flag = 0;
                for(let k = 0; k < rMass.length; k++){
                    if(mass1[j] == rMass[k]) { flag ++ };
                    {
                        if(flag > 1) {
                            document.getElementById("reflection").innerHTML = "Рефлексивность";
                            mainflag = 1;
                        }
                    }
                }
        }           
    }
}

function Symmetr(){

    let mass1;
    let mass2;
    alert(mainMass);
    for(let i = 0; i < mainMass.length; i++){
        mass1 = mainMass[i].split(" ");
        for(let j = 1; j < mainMass.length; j++){
             mass2 = mainMass[j].split(" ");
            if(mass1[0] == mass2[1] && mass1[1] == mass2[0]) {
                document.getElementById("symmetric").innerHTML = "Симметричность";
                mainflag = 1;
            }
        }
    }
}

function CosSymmetr(){

    let mass1;
    let mass2;
    let flag;

    for(let i = 0; i < mainMass.length; i++){
        flag = 0;
        mass1 = mainMass[i].split(" ");
        for(let j = 1; j < mainMass.length; j++){
            mass2 = mainMass[j].split(" ");
            if(mass1[0] == mass2[1] && mass1[1] == mass2[0] && mass1[0] == mass1[1] && mass2[0] == mass2[1])
            {
                document.getElementById("cosymmetric").innerHTML = "Кососимметричность";  
                mainflag = 1;
            }
        }   
    }
}

function Transition(){

    let mass1;
    let mass2;
    let mass3;
    let flag;

    for(let i = 0; i < mainMass.length; i++){
        flag = 0;
        mass1 = mainMass[i].split(" ");
        for(let j = 1; j < mainMass.length; j++ ){
            mass2 = mainMass[j].split(" ");
            for(let k = 2; k < mainMass.length; k++){
                mass3 = mainMass[k].split(" ");
                if(mass1[1] == mass2[0] && mass1[0] == mass3[0] && mass2[1] == mass3[1])
                    flag++;
                if(flag>0)
                {
                    document.getElementById("transition").innerHTML = "Транзитивность";
                    mainflag = 1;
                }
            }
        }
    }
}
function MainFunction(){
    Validation();
    Reflection();
    Symmetr();
    CosSymmetr();
    Transition();
    if(mainflag == 0) { document.getElementById("symmetric").innerHTML = "Данные отношения не имеют свойств"; }
    rMass = [];
    firstlyMass ="";
    mainMass ="";
    perMass = '';
}