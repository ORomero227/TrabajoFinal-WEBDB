<?php

// File Name: COMP-3015-M4-LAB-1-OSCAR-ROMERO
// File Date: November 3, 2022
// Programmer: Oscar A. Romero Barbosa
// Description: En esta archivo de php se encuentra el comando de Select

//Declarando variables
$clubName = $_POST['clubName'];


//Conexíon a la base de datos
$db_conn = new mysqli('localhost','root','','bigballersleague');

//Verifica si hay un error durante la conexion
if ($db_conn->connect_error) 
{
	die('ERROR: Database conection failed' . $db_conn->connect_error);
}
else
{
	$sql_stmt = "SELECT FirstName,LastNames,PhoneNum,Email,BirthDate,Gender,Country,ClubName,ClubLocation,
    					Categories,GameFormat,ClubLogo,Comments 
    			 FROM   generalmanagers,clubs
				 WHERE  ClubName = '$clubName' && clubs.gmID = generalmanagers.gmID";


	$query_result = $db_conn->query($sql_stmt);

	if ($query_result->num_rows > 0)
	{
		while ($row = $query_result->fetch_assoc())
		{
			$generalManagerRecord = array(
			"firstName"=>$row['FirstName'],
			"lastNames"=>$row['LastNames'],
			"phoneNum"=>$row['PhoneNum'],
			"email"=>$row['Email'],
			"birthDate"=>$row['BirthDate'],
			"gender"=>$row['Gender'],
			"country"=>$row['Country'],
			"clubName"=>$row['ClubName'],
			"clubLocation"=>$row['ClubLocation'],
			"categories"=>$row['Categories'],
			"gameFormat"=>$row['GameFormat'],
			"clubLogo"=>$row['ClubLogo'],
			"comments"=>$row['Comments'],
		);

			echo json_encode($generalManagerRecord);
		}
	}
	else
	{
		echo(false);
	}

	$db_conn->close();
}

?>