var firstlyMass; //Первичный массив который хранит пары элементов
var mainMass = ''; // Главный массив который после проверки записывает в себя пары элементов 
var rMass = []; // Массив для записывания элементов, прошедших проверку, необходим для определения рефлексии
var secondMass = ''; // Массив для записывания элементов, прошедших проверку(в дальнейшем копируется и составляет Главный массив)
var mainflag = 0; // Остается нулем если отношения не имеют никаких свойств, используется для вывода сообщения на экран

function number(a) { //Функция на определение является ли значение числом или нет
    if ((a >= 0) && (a < 10)) {
        return true;
    }
    else {
        return false;
    }
}

function MainFunction(){ //Основная функция для проверки на свойства 
    document.getElementById("reflection").innerHTML = "";  //
    document.getElementById("symmetric").innerHTML = "";   //
    document.getElementById("cosymmetric").innerHTML = ""; // Обнуляем строки в случае повторного использования
    document.getElementById("transition").innerHTML = "";  //
    Validation(); //Функция проверки правильности введеных данных
    Reflection(); //Функция проверки рефлексивности
    Symmetr(); //функция проверки симметричности
    CosSymmetr(); //Функция проверки Кососимметричности
    Transition(); //Функция проверки на транзитивность
    //Случай когда отношения не имеют свойств
    if(mainflag == 0) { document.getElementById("symmetric").innerHTML = "Данные отношения не имеют свойств"; } 
    rMass = [];         //
    firstlyMass ="";    //
    mainMass = '';       // Обнуляем все массивы для повторной работы
    secondMass = '';    //
    mainflag = 0;       //
}

function Validation(){ //Функция валидации данных
    firstlyMass = document.getElementById('mass').value; //Запись введеных пар
    if(firstlyMass == '') alert("Введите элементы.");
    var validMass = firstlyMass.split(", ");
    let valid;  //
    let valid1; // Переменные для валидации данных
    let valid2; //
    for(let i = 0; i < validMass.length; i++){ // основной цикл для перебора пар и валидации
        valid = validMass[i].split(' ');
        valid1 = valid[0].split('');
        valid2 = valid[1].split('');
        //Условия для проверки Ввода данных
        if(valid1[0] % 2 == 0 && valid1[1] % 2 == 1 && number(valid1[2]) == true && number(valid1[3]) == true && valid2[0] % 2 == 0 && valid2[1] % 2 == 1 && number(valid2[2]) == true && number(valid2[3]) == true && valid1.length == 4 && valid2.length == 4 && i==validMass.length-1)
        {
            secondMass = secondMass + valid[0] + " " + valid[1]; //Если элемент последний
            rMass.push(valid[0]); //
            rMass.push(valid[1]); // Заполняем массив для рефлексивности
        } 
        else 
        if(valid1[0] % 2 == 0 && valid1[1] % 2 == 1 && number(valid1[2]) == true && number(valid1[3]) == true && valid2[0] % 2 == 0 && valid2[1] % 2 == 1 && number(valid2[2]) == true && number(valid2[3]) == true && valid1.length == 4 && valid2.length == 4)
        {
            secondMass = secondMass + valid[0] + " " + valid[1] + ", "; //Если элемент не последний, то ставим запятую
            rMass.push(valid[0]); // заполняем массив для рефлексивности
            rMass.push(valid[1]); //
        }
        else 
        {
            alert('Неккоректный ввод');
            exit(-1);
        }
    }
    mainMass = secondMass.split(", "); // Получаем основной массив для работы
}

function Reflection(){ //Функция для определения свойства Рефлексивность
    let mass1; //Массив для попарной записи элементов
    let flag;
    if(mainMass.length == 1) {
        mass1 = mainMass[0].split(" ");
        if(mass1[0] == mass1[1] && mass1[1] == mass1[0]) { //Сравнивает элементы между парами
            document.getElementById("reflection").innerHTML = "Рефлексивность";
            mainflag = 1;
        }
    }
    else {
        for(let i = 0; i < mainMass.length - 1; i++){ // цикл по всей строке пар элементов
            mass1 = mainMass[i].split(" "); // запись Попарно
            flag = 0; //Обнуление флага при переходе к следующей паре элементов
            for(let k = 0; k < rMass.length; k+=2){ //Проверка элементов из пар между массивами
                if(mass1[0] == rMass[k]) 
                {
                    flag ++;
                }
                if(flag == mainMass.length) {
                    document.getElementById("reflection").innerHTML = "Рефлексивность";
                    mainflag = 1;
                }
            }   
        }
    }
}

function Symmetr(){ //функция на определение симметричности

    let mass1; //записывает первую пару элементов
    let mass2; //записывает вторую пару элементов
    if(mainMass.length == 1) {
        mass1 = mainMass[0].split(" ");
        if(mass1[0] == mass1[1] && mass1[1] == mass1[0]) { //Сравнивает элементы между парами
            document.getElementById("symmetric").innerHTML = "Симметричность";
            mainflag = 1;
        }
    }
    else {
        for(let i = 0; i < mainMass.length - 1; i++){
            mass1 = mainMass[i].split(" ");
            for(let j = 1; j < mainMass.length; j++){
                mass2 = mainMass[j].split(" ");
                if(mass1[0] == mass2[1] && mass1[1] == mass2[0]) { //Сравнивает элементы между парами
                    document.getElementById("symmetric").innerHTML = "Симметричность";
                    mainflag = 1;
                }
            }
        }
    }
}

function CosSymmetr(){ //функция на определение кососимметричности

    let mass1; // хранит первую пару элементов
    let mass2; // хранит вторую пару элементов
    let flag;
    if (mainMass.length == 1) {
        mass1 = mainMass[0].split(" ");
        if(mass1[0] == mass1[1] && mass1[1] == mass1[0]) { //Сравнивает элементы между парами
            document.getElementById("cosymmetric").innerHTML = "Кососимметричность";  
            mainflag = 1;
        }
    }
    else {
        for(let i = 0; i < mainMass.length - 1; i++){
            flag = 0;
            mass1 = mainMass[i].split(" ");
            for(let j = 1; j < mainMass.length; j++){
                mass2 = mainMass[j].split(" ");
                if(mass1[0] == mass2[1] && mass1[1] == mass2[0] && mass1[0] == mass1[1] && mass2[0] == mass2[1]) // Сравнивает нахождение и равность элементов между парами и в паре
                {
                    document.getElementById("cosymmetric").innerHTML = "Кососимметричность";  
                    mainflag = 1;
                }
            }   
        }
    }
}

function Transition(){ //функция на определение транзитивности
    let mass1lvl;
    let mass2lvl;
    let mass3lvl;
    let count;

    for(let i = 0; i < mainMass.length; i++){
        count = 0;
        mass1lvl = mainMass[i].split(" ");
        for(let j = 1; j < mainMass.length; j++ ){
            mass2lvl = mainMass[j].split(" ");
            for(let k = 2; k < mainMass.length; k++){
                mass3lvl = mainMass[k].split(" ");
            }
        }
        if(mass2lvl == undefined) {  
            if(mass1lvl[0] == mass1lvl[1]) {
                count++;
            }
        }
        else {
            if(mass1lvl[0] == mass1lvl[1] && mass2lvl[0] == mass2lvl[1]) {
                count++;
            }
        }
        if(count>0) {
            mainflag = 1;
            document.getElementById("transition").innerHTML = "Транзитивность";
        }
    }
}
