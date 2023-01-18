<?php 

// File Name: COMP-3015-M4-LAB-1-OSCAR-ROMERO
// File Date: November 3, 2022
// Programmer: Oscar A. Romero Barbosa
// Description: En esta archivo de php se encuentra el comando de Delete

//Declarar las variables
$firstName = $_POST['firstName'];
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
	//Primero se elimina los datos de la tabla clubs(tabla hija)
	$sql_stmt = "SELECT * FROM clubs WHERE ClubName = '$clubName'";

	$query_result = $db_conn->query($sql_stmt);

	if($query_result->num_rows > 0)
	{
		$del_stmt = "DELETE FROM clubs WHERE ClubName = '$clubName'";
		$delete_result = $db_conn->query($del_stmt);
		
		if($delete_result === true)
		{
			//Si se logra eliminar los datos de la tabla hija se eliminan los datos de la tabla padre
			$sql_stmt = "SELECT * FROM generalmanagers WHERE FirstName = '$firstName'";

			$query_result = $db_conn->query($sql_stmt);

			if($query_result->num_rows > 0)
			{
				$del_stmt = "DELETE FROM generalmanagers WHERE FirstName = '$firstName'";
				$delete_result = $db_conn->query($del_stmt);
			}
		}

		echo(true);
	}
	else{
		echo(false);
	}

	$db_conn->close();
}
?>