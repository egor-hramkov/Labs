<!DOCTYPE html>
<html>
	<head>
        <link rel="stylesheet" type="text/css" href="lab5.css">
	    <title>Лабораторная работа №5</title>
	</head>
	<body>
		<div class="cent">
		Введите матрицу графа.
				<br>
				Если путь из одной вершины в другую есть - поставьте 1, иначе поставьте 0.
				<br> 
                На главной диагонали соотвественно нули.
                <br>
			<form method="post">
				<textarea id="matr" class="matrica" name = 'matrica' value = '0'></textarea><br>
				<input type = 'submit' value="Рассчитать">
			</form>

            <?php
            $matrica = explode("\r\n", $_POST[matrica]); // делим построчно
            $W; //Основной массив матрицы достижимости
            $W2; //Доп матрица для сохранения значений

            for($i = 0; $i < count($matrica); $i++) {
                $matrica[$i] = explode(" ", $matrica[$i]); // делим поэлементно в строке
                if (count($matrica) != count($matrica[$i]) or count($matrica[0]) != count($matrica[$i])) { //Проверка на ввод матрицы
                    die('Матрица введена неверно');
                }
            }

            for($i = 0; $i < count($matrica); $i++) { //Записываем в массивы все значения с матрицы
                for($j = 0; $j < count($matrica); $j++) {
                    $W[$i][$j] = $matrica[$i][$j];
                    $W2[$i][$j] = $matrica[$i][$j];
                }
            }
            
            for($j = 0; $j < count($matrica); $j++) { // Алгоритм Уоршелла 
                for($i = 0; $i < count($matrica); $i++) {
                    if($W[$i][$j] == 1) { //операция дизъюнкции если встречена 1
                        for($k = 0; $k < count($matrica); $k++) {
                            $W2[$i][$k] = ($W[$i][$k] + $W[$j][$k]);
                            if($W2[$i][$k] > 1) {
                                $W2[$i][$k] = 1;
                            }
                        }
                    }
                    else { //если путь 0 то просто переписываем в новую матрицу строку из прошлой матрицы
                        for($k = 0; $k < count($matrica); $k++) {
                            $W2[$i][$k] = $W[$i][$k];
                        }
                    }
                }

                for($i = 0; $i < count($matrica); $i++) { //В самом конце цикла записываем собранную матрицу в предыдущую чтобы формировать снова новую
                    for($k = 0; $k < count($matrica); $k++) {
                        $W[$i][$k] = $W2[$i][$k];
                    }
                }

            }
            echo('Матрица достижимости данного графа: ');
            for($i = 0; $i < count($matrica); $i++) { //Вывод матрицы достижимости
                echo('<br>');
                for($j = 0; $j < count($matrica); $j++) {
                    echo($W2[$i][$j]. ' ');
                }
            }
            ?>
            </div>
        </body>
    </html>