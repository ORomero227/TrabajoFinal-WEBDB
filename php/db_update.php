<?php 

// File Name: COMP-3015-M4-LAB-1-OSCAR-ROMERO
// File Date: November 3, 2022
// Programmer: Oscar A. Romero Barbosa
// Description: En esta archivo de php se encuentra el comando de Update

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
	$sql_stmt = "UPDATE generalmanagers,clubs
				 SET 
				 	Firstname = '$firstName',
				 	LastNames = '$lastNames',
				 	PhoneNum = '$phoneNum',
				 	Email = '$email',
				 	BirthDate = '$birthDate',
				 	Gender = '$gender',
				 	Country = '$country',
				 	ClubName = '$clubName',
				 	ClubLocation = '$clubLocation',
				 	Categories = '$categories',
				 	GameFormat = '$gameFormat',
				 	ClubLogo = '$clubLogo',
				 	Comments = '$comments'
				 	
				 WHERE  FirstName = '$firstName' && clubs.gmID = generalmanagers.gmID";

	if($db_conn->query($sql_stmt) === true)
	{
		echo(true);
	}
	else{
		echo(false);
	}

	$db_conn->close();
}
?>