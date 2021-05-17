<!DOCTYPE html>
<html>
	<head>
        <link rel="stylesheet" type="text/css" href="lab4.css">
	    <title>Лабораторная работа №4</title>
	</head>
	<body>
		<div class="cent">
		Введите матрицу графа.
				<br>
				Основная диагональ должна состоять из нулей.
				<br>
				Если от одной вершины к другой нет прямого пути, то поставьте "no"
				<br> 
                <br>
			<form method="post">
				<textarea id="matr" class="matrica" name = 'matrica' value = '0'><?=$_POST['matrica']?></textarea><br>
					Найти кратчайший путь из 
					<input type = 'number' class="spin"  placeholder="1" name = 'start' min = '1' value = '<?= $_POST[start]?>'>
					вершины в 
					<input type = 'number' class="spin"  placeholder="1" name = 'end' min = '1' value = '<?= $_POST[end]?>'>
				<input type = 'submit' value="Рассчитать">
			</form>

			<?php
				$start = $_POST[start] - 1;
				$end = $_POST[end] - 1;
				$OP[0] = $end; //массив оптимальных путей
				$count = 0;
				$matrica = explode("\r\n", $_POST[matrica]); // делим построчно
				for($i = 0; $i < count($matrica); $i++) {
					$matrica[$i] = explode(" ", $matrica[$i]); // делим поэлементно в строке
					if (count($matrica) != count($matrica[$i]) or count($matrica[0]) != count($matrica[$i])) { //Проверка на ввод матрицы
						die('Матрица введена неверно');
					}
				}
				for ($i = 0; $i < count($matrica); $i++) {
					for ($j = 0; $j < count($matrica[$i]); $j++) {
						if($matrica[$i][$j] === 'no') { //проверяем каждый путь
							$matrica[$i][$j] = INF; //заполняем бесконечностью если пути нет
						}
					}
				}

                for ($i = 0; $i < count($matrica); $i++) { //заполняем бесконечностью 
					$way[$i] = INF;
				}
				
                $node[0] = 0; 
                $mnode = $start;
                $node[0] = $mnode; //храинт вершины
                $way[$mnode] = 0; //массив всех путей
                while ($mnode != -1) { //Алгоритм Дейкстры
					for ($i = 0; $i < count($matrica); $i++) {
						if (array_search($i, $node) == false) { //Проверка на использование вершины
							$w = $way[$mnode] + $matrica[$mnode][$i]; //складывает кратчайшие пути
							if ($w < $way[$i]) {
								$way[$i] = $w; //записываем путь в массив путей
								$allnode[$i] = $mnode; //записываем все вершины от нач пути
							}
						}
					}
                    $mnode = -1; //хранит вершину с мин путём
					$mway = INF; //минимальный путь 
					for ($i = 0; $i < count($matrica); $i++)  {
						$bool = true;
						for ($j = 0; $j < count($node); $j++) {       
							if ($i == $node[$j]) { //если вершина уже была записана
								$bool = false;
							}
						}
						if ($bool) { //если вершина не встречалась ранее
							if ($way[$i] < $mway) {
								$mway = $way[$i]; //присваиваем минимальный путь
								$mnode = $i; //записывает текущую вершину
							}
						}
					}
					if ($mnode >= 0) {
						array_push($node, $mnode); //записываем вершины в массив вершин
					}
                }
                
				while ($end != $start) {
					$end = $allnode[$OP[$count]]; // Записываем предшействующую вершину
					$count++;
					array_push($OP, $end); // Добавляем предшействующую вершину
				} 
				
                echo('Введенная матрица: <br>');
				
                for ($i = 0; $i < count($matrica); $i++) { //вывод введенной матрицы
                    for ($j = 0; $j < count($matrica); $j++) {
                        if($matrica[$i][$j] === INF) {
                            $matrica[$i][$j] = 'no';
                        }
                      echo($matrica[$i][$j].' ');
                    }
                    echo("<br>");
                  }

				echo('<br>');
				echo('Путь из ' . ($start + 1) . ' вершины в ' . $_POST[end] . ' вершину проходит через вершины ');
				
				for ($i = count($OP)-1; $i >= 0; $i--) { //Выписываем массив оптимальных путей 
					if ($i == 0) {
						echo ($OP[$i]+1);
					}
                    else {
						echo ($OP[$i]+1) . ', ';
					}
				}
				echo(' и имеет вес ' . $way[$_POST[end]-1]);
			?>
		</div>
	</body>
</html>
