<?php 

$settings['dir'] = 'query'; //папка для сохранения, в качестве текущей - "." 
$settings['filename'] = 'query_%n.txt'; //имя файла, в качестве макроса %n (порядковый номер) 
$settings['ids'][0] = '500'; //стартовый номер 

//проверка на существование папки 
if (!is_dir($settings['dir'])) 
    if (mkdir($settings['dir'])) 
        echo '+ Папка для записи создана!'; 
    else 
        echo '- Папка для записи не создана!'; 

chdir($settings['dir']); 

//процедура получения id 
if ($dir = opendir('.')) 
    while (false !== ($file = readdir($dir))) 
        if ($file != "." && $file != "..") 
            if (preg_match('/' . str_replace('%n', '(\d+)', $settings['filename']) . '/', $file, 
                $names)) 
                $settings['ids'][] = $names[1]; 
closedir($dir); 


$settings['next_id'] = max($settings['ids']) + 1; 
$settings['next_filename'] = str_replace('%n', $settings['next_id'], $settings['filename']); 
$settings['text'] = 'Тема заявки: ' . $_POST['namecomand'] . "\r\n" . 'От пользователя: ' . $_POST['sub_fio'] . "\r\n" .
    'Исполнитель: ' . $_POST['name'] . "\r\n" . 'Описание проблемы: ' . $_POST['opisanie'] . 
    "\r\n"; 

$fp = fopen($settings['next_filename'], 'w+'); 
if (fwrite($fp, $settings['text'])) 
    echo 'Спасибо Ваша заявка принята!'; 
else 
    echo 'Извините произошел сбой в работе программы!'; 
fclose($fp); 

?>