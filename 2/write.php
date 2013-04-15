<?php 

$settings['dir'] = 'query'; //����� ��� ����������, � �������� ������� - "." 
$settings['filename'] = 'query_%n.txt'; //��� �����, � �������� ������� %n (���������� �����) 
$settings['ids'][0] = '500'; //��������� ����� 

//�������� �� ������������� ����� 
if (!is_dir($settings['dir'])) 
    if (mkdir($settings['dir'])) 
        echo '+ ����� ��� ������ �������!'; 
    else 
        echo '- ����� ��� ������ �� �������!'; 

chdir($settings['dir']); 

//��������� ��������� id 
if ($dir = opendir('.')) 
    while (false !== ($file = readdir($dir))) 
        if ($file != "." && $file != "..") 
            if (preg_match('/' . str_replace('%n', '(\d+)', $settings['filename']) . '/', $file, 
                $names)) 
                $settings['ids'][] = $names[1]; 
closedir($dir); 


$settings['next_id'] = max($settings['ids']) + 1; 
$settings['next_filename'] = str_replace('%n', $settings['next_id'], $settings['filename']); 
$settings['text'] = '���� ������: ' . $_POST['namecomand'] . "\r\n" . '�� ������������: ' . $_POST['sub_fio'] . "\r\n" .
    '�����������: ' . $_POST['name'] . "\r\n" . '�������� ��������: ' . $_POST['opisanie'] . 
    "\r\n"; 

$fp = fopen($settings['next_filename'], 'w+'); 
if (fwrite($fp, $settings['text'])) 
    echo '������� ���� ������ �������!'; 
else 
    echo '�������� ��������� ���� � ������ ���������!'; 
fclose($fp); 

?>