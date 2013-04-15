<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <title> Страница простой формы </title>
	  <title>AMS-SUPPORT</title>  
  <link rel="stylesheet" type="text/css" href="./template/css/buttons.css" />
    <style>
    /*
     * Здесь задаем стили.
     */
    h3,form div{border-top:1px solid rgb(247,247,247);border-bottom:1px solid rgb(212,212,212)}
    h3{font:18px Georgia;padding:6px 0 6px 10px}
    h3,#contact label{margin:0}
    select,textarea,input{width:70%}
    textarea{height:100px;}
    textarea{margin-top:12px}
    form{background:rgb(237,237,237);border:1px rgb(212,212,212) solid;margin:30px auto;width:370px}
    form div{padding:7px}
    #rating input{width:auto}
    #contact label{display:block;position:relative}
    form div:last-child{border-bottom:1px solid rgb(247,247,247)}
    </style>
    
</head>
<body>
   
<form action="write.php" class='puForm' method="post" id="modalform">  
  <table align="center" border="0">  
    <tbody>  
	<tr>  
	
        <td align="left">Тема заявки:</td>  
        <td align="left"><input name="namecomand"/></td>  
      </tr>  
      <tr>  
        <td align="left">От кого<font color="red">*</font>:</td>  
        <td align="left"><input name="sub_fio"/></td>  

      </tr>  
      <tr>  
        <td align="left">Исполнитель:</td>  
        <td align="left"><input name="name"/></td>  
      </tr>  
      <tr>  
        <td align="left">Описание проблемы:</td>  
        <td align="left"><textarea cols="60"  
 rows="9" name="opisanie"></textarea></td>  
      </tr>  
     
      <tr>  
        <td></td> 
        <td><input class="uibutton special" type="submit" value="Отправить заявку"></td>  
      </tr>  
    </tbody>  
  </table>  
</form>  
</body>
</html>
