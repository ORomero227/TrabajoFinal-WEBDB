<?php 

// File Name: COMP-3015-M4-LAB-1-OSCAR-ROMERO
// File Date: November 3, 2022
// Programmer: Oscar A. Romero Barbosa
// Description: En esta archivo de php se encuentra el comando de Insert



//Declarar las variables
$firstName = $_POST['firstName'];
$lastNames = $_POST['lastNames'];
$phoneNum = $_POST['phoneNum'];
$email = $_POST['email'];
$birthDate = $_POST['birthDate'];
$gender = $_POST['gender'];
$country = $_POST['country'];
$clubName = $_POST['clubName'];
$clubLocation = $_POST['clubLocation'];
$categories = $_POST['categories'];
$gameFormat = $_POST['gameFormat'];
$clubLogo = $_POST['clubLogo'];
$comments = $_POST['comments'];


//Conexíon a la base de datos
$db_conn = new mysqli('localhost','root','','bigballersleague');

//Verifica si hay un error durante la conexion
if ($db_conn->connect_error) 
{
	die('ERROR: Database conection failed' . $db_conn->connect_error);
}
else
{
	//insertando en la tabla de generalManagers(principal)
	$sql_stmt = $db_conn->prepare('insert into generalmanagers(FirstName, LastNames, PhoneNum, Email, BirthDate, Gender, Country) values(?,?,?,?,?,?,?)');

	$sql_stmt->bind_param('sssssss',$firstName, $lastNames, $phoneNum, $email, $birthDate, $gender, $country);
}

//Insertando en la segunda tabla
if ($db_conn->connect_error) 
{
	die('ERROR: Database conection failed' . $db_conn->connect_error);
}
else
{
	//insertando en la tabla de clubs(secundaria)
	$sql_stmt02 = $db_conn->prepare('insert into clubs(ClubName, ClubLocation, Categories, GameFormat, ClubLogo, Comments) values(?,?,?,?,?,?)');
	
	$sql_stmt02->bind_param('ssssss',$clubName, $clubLocation, $categories, $gameFormat, $clubLogo, $comments);
}


//Verificar que se haya ejecutado
if ($sql_stmt->execute() === true && $sql_stmt02->execute() === true) 
{
	echo(true);
}
else
{
	echo(false);
}

$sql_stmt->close();
$sql_stmt02->close();
$db_conn->close();

?>