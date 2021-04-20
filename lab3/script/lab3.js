var mainMass = ''; // основной массив который хранит в себе отношения множеств
let mass11 = ''; //Массив для хранения 1 множества
let mass22 = ''; //Массив для хранения 1 множества
var check2Mass = []; //Массив для проверки уникального значения элементов 1 множества
var check3Mass = []; //Массив для проверки уникального значения элементов 2 множества
var s1 = 0; // переменная которая записывает длину разделенного 1 множества
var s2 = 0; // переменная которая записывает длину разделенного 2 множества

function number(a) { //функция которая проверяет является ли значение числом
    if ((a >= 0) && (a < 10)) {
        return true;
    }
    else {
        return false;
    }
}

function Validation() { //Основная функция которая проверяет валидацию введеных данных и вызывает функцию проверки
    mass11 = document.getElementById("mass1").value; 
    mass22 = document.getElementById("mass2").value;
    mass33 = document.getElementById("mass3").value;
    let splitMass1 = mass11.split(" ");
    let splitMass2 = mass22.split(" ");
    let splitMass3 = mass33.split(",");
    s1 = splitMass1.length;
    s2 = splitMass2.length;
    let flagok = 0; // флаг для проверки отношений множеств
    check2Mass =[]; // обнуляем Массив для проверки уникального значения элементов 1 множества
    check3Mass =[]; // обнуляем Массив для проверки уникального значения элементов 2 множества
    if(mass11 == "")  //Условия на проверку введенных значений
    {
    alert("В 1 множестве не введены элементы");
    exit(-1);
    }
    if(mass22 == "")
        {
        alert("Вo 2 множестве не введены элементы");
        exit(-1);
        }
    let flag = 0;
    for(i = 0; i<splitMass1.length; i++) { //Проверка 1 массива на введенные значения
        let validMass1 = splitMass1[i];
        if(validMass1.length == 4 && validMass1[0] % 2 == 0 && validMass1[1] % 2 == 1 && number(validMass1[2]) == true && number(validMass1[3]) == true)
        {
            flag++;
        }
        else
        {
            alert("Введены неверные данныe в 1 множестве");
            exit(-1);
        }
    }
    for(i = 0; i<splitMass2.length; i++) { //Проверка 2 массива на введенные значения
        let validMass2 = splitMass2[i];
        if(validMass2.length == 4 && validMass2[0] % 2 == 0 && validMass2[1] % 2 == 1 && number(validMass2[2]) == true && number(validMass2[3]) == true)
        {
            flag++;
        }
        else
        {
            alert("Введены неверные данныe вo 2 множестве");
            exit(-1);
        }
    }
    for(i = 0; i < splitMass3.length; i++){ //Проверка отношений на введенные значения
        let validMass3 = splitMass3[i];
        let v1 = validMass3.split(" ");
        if ((mass11.indexOf(v1[0]) != -1 && mass22.indexOf(v1[1]) != -1) || (mass11.indexOf(v1[1]) != -1 && mass22.indexOf(v1[0]) != -1))
        {
            flagok++;
        }
    }
    if (flagok == splitMass3.length) //Если введенные отношения прошли проверку то запускается функция на определение, являются ли отношения функцией
    {
        mainMass = splitMass3;
        MainCheck();
    }
    else
    {
        alert("Введены неверные отношения элементов");
    }
}

function MainCheck() { //Функция на проверку являются ли отношения функцией
    let mainflag = 0; //Основной флаг, для проверки
    for(let i = 0; i < mainMass.length; i++) { //основной цикл для перебора пар элементов 
        let checkMass = mainMass[i]; //Поочередно принимает на вход пары элементов
        let a = checkMass.split(" ");//Записывает в переменную пары элементов
        if(mass11.indexOf(a[0]) != -1 && mass22.indexOf(a[1]) != -1) //проверка на принадлежность элементов множествам
        {
            if(check2Mass.indexOf(a[0]) == -1 && check3Mass.indexOf(a[1]) == - 1)//Проверка на то, встречался ли этот элемент или нет
            {
            check2Mass.push(a[0]); //Приписываем элемент в массив, если элемент не встретился ранее в нем же
            check3Mass.push(a[1]); //Приписываем элемент во 2 массив, если элемент не встретился ранее в нем же
            mainflag++;
            }
        }
    }

    if (mainflag == mainMass.length && check2Mass.length == s1) //Если выполнились все условия на то, является ли отношения функцией
    {
        document.getElementById("mainspan").innerHTML = "Данные отношения являются функцией";
    }
    else
    {
        document.getElementById("mainspan").innerHTML = "Данные отношения не являются функцией";
    }
    s1 = 0; //обнуляем переменные для повторного использования
    s2 = 0;
}