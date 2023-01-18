// File Name: COMP-3015-M4-LAB-1-OSCAR-ROMERO
// File Date: November 3, 2022
// Programmer: Oscar A. Romero Barbosa
// Description: En esta archivo de javascript se encuentran las funciones para
//				validar las diferentes entradas, cambiar el logo del club, reiniciar el 
//				formulario, guardar informacion en el localstorage e base de datos, buscar en la base de
//				datos, eliminar un registro, editar un registro que este en la base de datos.


//                 Regular Expressions
//Nombre o Apellidos (Acepta Inicial, Acepta dos apellidos)
let regxNombreOApell = /^([a-zA-Z\ñ]){3,}\s?([a-zA-Z\ñ]+)?$/g;
//Para el telefono(solamente formato 000-000-0000)
let regxPhoneNumber = /^\d{3}[-]\d{3}[-]\d{4}$/g;
//Para el email
let regxEmail = /^\w+\@\w+[\.]\w{3,4}$/g;

//Funcion para verificar si los datos estan incorrectos
function verifyInfo() 
{	
	//Contiene los mensajes que se van a mostrar cuando una entrada es invalida
	let message = ["Nombre","Apellidos","Teléfono","Email","Fecha de Nacimiento","País",
				   "Nombre del Club","Ubicacíon del Club","Formato de Juego",
				   "Categorias","Logo del Club"];

	//Guarda los mensajes de las entradas que estan invalidas
	let listInvalidMsgs = [];

	//Verificar el nombre
	var firstName = document.getElementById('Nombre').value;
	if (!firstName.match(regxNombreOApell)) 
	{
		listInvalidMsgs.push(message[0]);
	}

	//Verificar los apellidos
	var lastNames = document.getElementById('Apellidos').value;
	if (!lastNames.match(regxNombreOApell)) 
	{
		listInvalidMsgs.push(message[1]);
	}

	//Verificar el telefono
	var phoneNum = document.getElementById('Telefono').value;	
	if (!phoneNum.match(regxPhoneNumber))
	{
		listInvalidMsgs.push(message[2]);
	}

	//Verificar el email
	var email = document.getElementById('Email').value;
	if (!email.match(regxEmail))
	{
		listInvalidMsgs.push(message[3]);
	}

	//Verificar la fecha de nacimiento
	var birthdate = document.getElementById('FechaNacimiento').value;
	if(!birthdate)
	{
		listInvalidMsgs.push(message[4]);
	}

	//Verificar el pais de residencia
	var country = document.getElementById('Pais').value;
	
	if (!country.match(regxNombreOApell)) 
	{
		listInvalidMsgs.push(message[5]);
	}

	//Verificar el nombre del club
	var clubName = document.forms["Formulario"]["NombreClub"].value;
	
	if (clubName == "" || clubName.length < 3)
	{
		listInvalidMsgs.push(message[6]);
	}

	//Verificar que la ubicacion del club seleccionada no sea Ubicacion
	var selectLocation = document.getElementById('UbicacionClub').selectedIndex;
	if(selectLocation == 0)
	{
		listInvalidMsgs.push(message[7]);
	}

	//Verificar que el valor seleccionado no sea Formatos De Juego
	var selectFormat = document.getElementById('FormatoJuego').selectedIndex;
	if(selectFormat == 0)
	{
		listInvalidMsgs.push(message[8]);
	}

	//Verificar que por lo menos haya una categoria seleccionada
	var checkMasculine = document.getElementById('checkMasculino');
	var checkFeminine = document.getElementById('checkFemenino');
	var checkParalympic = document.getElementById('checkParalimpico');
	if(checkMasculine.checked != true && checkFeminine.checked != true && checkParalympic.checked != true)
	{
		listInvalidMsgs.push(message[9]);
	}

	//Verifica que se haya seleccionado el logo del equipo
	var clubLogo = $('#LogoClub').attr('src');
	if(clubLogo == "../images/defaultLogo.png")
	{
		listInvalidMsgs.push(message[10]);
	}

	let textMessage = "";
	function showInvalidMsgs(arr)
	{
		textMessage += arr.toString() + "<br>";
	}


	//Si la lista de mensajes incorrectos es mayor a 0 se muestra el resumen
	if (listInvalidMsgs.length != 0) 
	{
		listInvalidMsgs.forEach(showInvalidMsgs);
		erroMessage("Los siguientes campos son invalidos: <br>" + textMessage);
		textMessage = "";
		return false;
	}
	else
	{
		confMessage("Los campos ingresados son validos");
		return true;
	}
}

//Funcion para obtener y guardar las categorias seleccionadas en un array
function getCheckBoxValues()
{
	let arr = [];
	let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
	var checkboxesSelected = "";
	for (let i = 0; i < checkboxes.length; i++) 
	{
		arr.push(checkboxes[i].value)
	}

	checkboxesSelected = arr.toString();

	localStorage.setItem("Categorias",checkboxesSelected);
}


//Funcion para seleccionar el logo del club
function uploadLogo()
{
	var clubLogo = document.getElementById('fileImgLogo');

	var file = clubLogo.files[0];

	document.getElementById('LogoClub').src = "../images/" + file.name;

	return false;
}

//Funcion para reincinar el formulario
function resetFormulario() 
{
	document.getElementById("Formulario").reset();

	document.getElementById("LogoClub").src = "../images/defaultLogo.png";

	document.getElementById("buscadorRecord").value = "";

	document.getElementById("barraBusqueda").value = "";

	return false;
}

//Funcion para guardar los datos en el localstorage
function saveFormularioInfo()
{
	var checkInfo = verifyInfo();
	if (!checkInfo) 
	{
		return erroMessage("No se puede guardar el registro");
	}
	else
	{
		if (typeof(Storage) !== "undefined")
		{
				localStorage.setItem("Nombre" , document.getElementById('Nombre').value);
				localStorage.setItem("Apellidos", document.getElementById('Apellidos').value);
				localStorage.setItem("Teléfono", document.getElementById('Telefono').value);
				localStorage.setItem("Email", document.getElementById('Email').value);
				localStorage.setItem("Fecha Nacimiento",document.getElementById('FechaNacimiento').value);
				localStorage.setItem("Genero",document.forms["Formulario"]["genero"].value);
				localStorage.setItem("Pais",document.getElementById('Pais').value);
				localStorage.setItem("Nombre del club",document.getElementById('NombreClub').value); 
				localStorage.setItem("Ubicacíon del club",document.getElementById('UbicacionClub').value);
				getCheckBoxValues();
				localStorage.setItem("Formato de juego",document.getElementById('FormatoJuego').value);
				localStorage.setItem("Logo",document.getElementById('fileImgLogo').value);
				localStorage.setItem("Comentarios",document.getElementById('Comentarios').value);
		}
		confMessage("Registro guardado con exito");
	}
}

//Funcion para insertar los datos a la base de datos
function php_Insert()
{
	// Verififcar datos antes de ser enviados
	var checkInfo = verifyInfo();
	if (!checkInfo) 
	{ 
		return erroMessage("No hay un registro para insertar");
	}
	else
	{
		saveFormularioInfo();

		//Transformando datos

		//Valores de los generos Masculino a M, Femenino a F, Otro a O
		var genderMale = document.getElementById('generoHombre');
		var genderFemale = document.getElementById('generoMujer');
		var genderOther = document.getElementById('generoOtro');
		var genderValue = undefined;

		if(genderMale.checked)
		{
			document.getElementById('generoHombre').value = 'M';
			genderValue = genderMale.value;
		}
		else if(genderFemale.checked)
		{
			document.getElementById('generoMujer').value = "F";
			genderValue = genderFemale.value;
		}
		else if(genderOther.checked)
		{
			document.getElementById('generoOtro').value = "O";
			genderValue = genderOther.value;
		}

		//Valores de ubicacion del club a 1=NA 2=SA 3=AS 4=EU
		var locations = document.getElementById('UbicacionClub').selectedIndex;
		var clubLocation = "";
		if(locations == 1)
		{
			clubLocation = "NA";
		}
		else if (locations == 2)
		{
			clubLocation = "SA";
		}
		else if (locations == 3)
		{
			clubLocation = "EU";
		}
		else if (locations == 4)
		{
			clubLocation = "AS";
		}

		//Valores de las categorias Masculino a M, Femenino a F, Paralimpico a P
		let arr = [];
		let categories = document.querySelectorAll("input[type='checkbox']:checked");
		var clubCategories = "";
		for (let i = 0; i < categories.length; i++) 
		{	
			if(categories[i].value == "Masculino")
			{
				categories[i].value = "M";
			}
			else if(categories[i].value == "Femenino")
			{
				categories[i].value = "F";
			}
			else if(categories[i].value == "Paralímpico")
			{
				categories[i].value = "P";
			}
			
			arr.push(categories[i].value)
		}

		clubCategories = arr.toString();

		//Valores de los tipos de formatos 1=T 2=C 3=A 4=V 5=SR
		var formats = document.getElementById('FormatoJuego').selectedIndex;
		var gameFormat = "";
		if(formats == 1)
		{
			gameFormat = "T";
		}
		else if (formats == 2)
		{
			gameFormat = "C";
		}
		else if (formats == 3)
		{
			gameFormat = "A";
		}
		else if (formats == 4)
		{
			gameFormat = "V";
		}
		else if (formats == 5)
		{
			gameFormat = "SR";
		}

		//Transformando dato para la imagen
		var imageSelected = $('#LogoClub').attr('src');
		var clubLogo = imageSelected.slice(10,);

		//Objeto FormData
		var data = new FormData();
		data.append("firstName" , document.getElementById('Nombre').value);
		data.append("lastNames", document.getElementById('Apellidos').value);
		data.append("phoneNum", document.getElementById('Telefono').value);
		data.append("email", document.getElementById('Email').value);
		data.append("birthDate",document.getElementById('FechaNacimiento').value);
		data.append("gender",genderValue);
		data.append("country",document.getElementById('Pais').value);
		data.append("clubName",document.getElementById('NombreClub').value); 
		data.append("clubLocation",clubLocation);
		data.append("categories",clubCategories);
		data.append("gameFormat",gameFormat);
		data.append("clubLogo", clubLogo);
		data.append("comments",document.getElementById('Comentarios').value);

		//AJAX  

		var xhr = new XMLHttpRequest();

		xhr.open('POST','../php/db_insert.php');

		xhr.onload = function()
		{
			console.log(this.response);

			let insert_result = this.response;

			if(insert_result == true)
			{
				var textMessage = "Record insertado con exito <br>Club Creado con exito";
				confMessage(textMessage);
				resetFormulario();
			}
			else
			{
				textMessage = "No se pudo insertar el record";
				erroMessage(textMessage);
				return false;
			}
		}

		xhr.send(data);
	}
}

//Funcion para actualizar los datos
function php_Update()
{
	// Verififcar datos antes de ser enviados
	var checkInfo = verifyInfo();
	if (!checkInfo) 
	{
		return erroMessage("No hay un registro para actualizar!");
	}
	else
	{
		//Transformando datos

	//Valores de los generos a M,F,O
	var genderMale = document.getElementById('generoHombre');
	var genderFemale = document.getElementById('generoMujer');
	var genderOther = document.getElementById('generoOtro');
	var genderValue = undefined;

	if(genderMale.checked)
	{
		document.getElementById('generoHombre').value = 'M';
		genderValue = genderMale.value;
	}
	else if(genderFemale.checked)
	{
		document.getElementById('generoMujer').value = "F";
		genderValue = genderFemale.value;
	}
	else if(genderOther.checked)
	{
		document.getElementById('generoOtro').value = "O";
		genderValue = genderOther.value;
	}

	//Valores de ubicacion del club a 1=NA 2=SA 3=AS 4=EU
	var locations = document.getElementById('UbicacionClub').selectedIndex;
	var clubLocation = "";
	if(locations == 1)
	{
		clubLocation = "NA";
	}
	else if (locations == 2)
	{
		clubLocation = "SA";
	}
	else if (locations == 3)
	{
		clubLocation = "EU";
	}
	else if (locations == 4)
	{
		clubLocation = "AS";
	}

	//Valores de las categorias a M,F,P
	let arr = [];
	let categories = document.querySelectorAll("input[type='checkbox']:checked");
	var clubCategories = "";
	for (let i = 0; i < categories.length; i++) 
	{	
		if(categories[i].value == "Masculino")
		{
			categories[i].value = "M";
		}
		else if(categories[i].value == "Femenino")
		{
			categories[i].value = "F";
		}
		else if(categories[i].value == "Paralímpico")
		{
			categories[i].value = "P";
		}
		
		arr.push(categories[i].value)
	}

	clubCategories = arr.toString();

	//Valores de los tipos de formatos 1=T 2=C 3=A 4=V 5=SR
	var formats = document.getElementById('FormatoJuego').selectedIndex;
	var gameFormat = "";
	if(formats == 1)
	{
		gameFormat = "T";
	}
	else if (formats == 2)
	{
		gameFormat = "C";
	}
	else if (formats == 3)
	{
		gameFormat = "A";
	}
	else if (formats == 4)
	{
		gameFormat = "V";
	}
	else if (formats == 5)
	{
		gameFormat = "SR";
	}

	//Transformando dato para la imagen
	var imageSelected = $('#LogoClub').attr('src');
	var clubLogo = imageSelected.slice(10,);

	//Objeto FormData
	var data = new FormData();
	data.append("firstName" , document.getElementById('Nombre').value);
	data.append("lastNames", document.getElementById('Apellidos').value);
	data.append("phoneNum", document.getElementById('Telefono').value);
	data.append("email", document.getElementById('Email').value);
	data.append("birthDate",document.getElementById('FechaNacimiento').value);
	data.append("gender",genderValue);
	data.append("country",document.getElementById('Pais').value);
	data.append("clubName",document.getElementById('NombreClub').value); 
	data.append("clubLocation",clubLocation);
	data.append("categories",clubCategories);
	data.append("gameFormat",gameFormat);
	data.append("clubLogo", clubLogo);
	data.append("comments",document.getElementById('Comentarios').value);

	//AJAX  

	var xhr = new XMLHttpRequest();

	xhr.open('POST','../php/db_update.php');

	xhr.onload = function()
	{
		console.log(this.response);

		let insert_result = this.response;

		if(insert_result == true)
		{
			var textMessage = "Record actualizado con exito";
			confMessage(textMessage);
			resetFormulario();
		}
		else
		{
			textMessage = "No se pudo actualzar el record";
			erroMessage(textMessage);
		}
	}

	xhr.send(data);
	}
}

//Funcion para buscar los datos del usuario
function php_Select()
{
	//Objeto FormData
	var data = new FormData();

	var searchBar = document.getElementById('barraBusqueda').value;
	var btnBuscar = document.getElementById('buscadorRecord').value;

	if(searchBar == "" && btnBuscar != "")
	{
		data.append("clubName", document.getElementById('buscadorRecord').value);
	}
	else
	{
		data.append("clubName",document.getElementById('barraBusqueda').value);
	}
	

	//AJAX
	var xhr = new XMLHttpRequest();

	xhr.open('POST','../php/db_select.php');

	xhr.onload = function()
	{
		console.log(this.response);

		let select_result = this.response;

		if(select_result != false)
		{
			const arrayInputsValues = JSON.parse(select_result);

			//Asignando los valores que llegan desde la base de datos a las respectivas entradas
			//Nombre
			document.getElementById('Nombre').value = arrayInputsValues['firstName'];
			//Apellidos
			document.getElementById('Apellidos').value = arrayInputsValues['lastNames'];
			//Numero de Telefono
			document.getElementById('Telefono').value = arrayInputsValues['phoneNum'];
			//Email
			document.getElementById('Email').value = arrayInputsValues['email'];
			//Fecha de nacimiento

			function convertDate(date)
			{
				var day = date.slice(8);
				var month = date.slice(5,7);
				var year = date.slice(0,4);

				return `${year}-${month}-${day}`;
			}
			
			document.getElementById('FechaNacimiento').value = convertDate(arrayInputsValues['birthDate']);
			
			//Genero
			switch(arrayInputsValues['gender'])
			{
				case "M":
					document.getElementById('generoHombre').checked = true;
					document.getElementById('generoHombre').value = arrayInputsValues['gender'];
					break;
				case "F":
					document.getElementById('generoMujer').checked = true;
					document.getElementById('generoMujer').value = arrayInputsValues['gender'];
					break;
				case "O":
					document.getElementById('generoOtro').checked = true;
					document.getElementById('generoOtro').value = arrayInputsValues['gender'];
					break;
			}
			
			//Pais
			document.getElementById("Pais").value = arrayInputsValues['country'];
			//Nombre del club
			document.getElementById("NombreClub").value = arrayInputsValues['clubName'];

			//Ubicacion del club
			var location = arrayInputsValues['clubLocation'];
			if(location == "NA")
			{
				document.getElementById('UbicacionClub').value = "America del Norte";
			}
			else if(location == "SA")
			{
				document.getElementById('UbicacionClub').value = "America del Sur";
			}
			else if(location == "EU")
			{
				document.getElementById('UbicacionClub').value = "Europa";
			}
			else if(location == "AS")
			{
				document.getElementById('UbicacionClub').value = "Asia";
			}

			//Categorias
			var selectedCategories = arrayInputsValues['categories'];
			var cMasculino = document.getElementById('checkMasculino');
			var cFemenino = document.getElementById('checkFemenino');
			var cParalimpico = document.getElementById('checkParalimpico');
			if(selectedCategories.includes("M") && selectedCategories.includes("F") && selectedCategories.includes("P"))
			{
				cMasculino.checked = true;
				cFemenino.checked = true;
				cParalimpico.checked = true;
			}
			else if(selectedCategories.includes("M") && selectedCategories.includes("F")){
				cMasculino.checked = true;
				cFemenino.checked = true;
				cParalimpico.checked = false;
			}
			else if(selectedCategories.includes("M") && selectedCategories.includes("P")){
				cMasculino.checked = true;
				cFemenino.checked = false;
				cParalimpico.checked = true;
			}
			else if(selectedCategories.includes("F") && selectedCategories.includes("P")){
				cMasculino.checked = false;
				cFemenino.checked = true;
				cParalimpico.checked = true;
			}
			else if(selectedCategories.includes("M")){
				cMasculino.checked = true;
				cFemenino.checked = false;
				cParalimpico.checked = false;
			}
			else if(selectedCategories.includes("F")){
				cMasculino.checked = false;
				cFemenino.checked = true;
				cParalimpico.checked = false;
			}
			else if(selectedCategories.includes("P")){
				cMasculino.checked = false;
				cFemenino.checked = false;
				cParalimpico.checked = true;
			}

			//Formato de juego
			var gameFormat = arrayInputsValues['gameFormat'];
			if(gameFormat == "T")
			{
				document.getElementById('FormatoJuego').value = "Tradicional";
			}
			else if(gameFormat == "C")
			{
				document.getElementById('FormatoJuego').value = "Callejero";
			}
			else if(gameFormat == "A")
			{
				document.getElementById('FormatoJuego').value = "Acuatico";
			}
			else if(gameFormat == "V")
			{
				document.getElementById('FormatoJuego').value = "Videojuego";
			}
			else if(gameFormat == "SR")
			{
				document.getElementById('FormatoJuego').value = "SillaRuedas";
			}

			//Logo del club
			document.getElementById('LogoClub').src = "../images/" + arrayInputsValues['clubLogo'];
			

			//Comentario
			document.getElementById('Comentarios').value = arrayInputsValues['comments'];

			//Vaciando la barra de buscar el record o la barra de busqueda en el menu
			document.getElementById('buscadorRecord').value = "";
			document.getElementById('barraBusqueda').value = "";

			var textMessage = "Registro encontrado";
			confMessage(textMessage);
			return true;
		}
		else
		{
			textMessage = ("Registro no encontrado");
			erroMessage(textMessage);
			return false;
		}
	}

	xhr.send(data);
}

//Funcion para eliminar los datos del usuario
function php_Delete()
{
	// Verififcar datos antes de ser enviados
	var checkInfo = verifyInfo();
	if(!checkInfo)
	{
		return erroMessage("No hay registro para eliminar");
	}
	else
	{

	//Objeto FormData
		var data = new FormData();
		data.append("firstName" , document.getElementById('Nombre').value);
		data.append("clubName",document.getElementById('NombreClub').value); 

		//AJAX
		var xhr = new XMLHttpRequest();

		xhr.open('POST','../php/db_delete.php');

		xhr.onload = function()
		{
			console.log(this.response);

			let delete_result = this.response;

			if(delete_result == true)
			{
				var textMessage = "Record eliminado con exito";
				confMessage(textMessage);
				resetFormulario();
			}
			else
			{
				textMessage = "No se pudo elminiar el record";
				erroMessage(textMessage);
			}
		}

		xhr.send(data);

	}	
}

//Funcion para levantar el modal de mensaje de confirmacion
function confMessage(textMessage)
{
	document.getElementById('confiMessage').innerHTML = textMessage;
	$('#successAlert').modal('show');
}

//Funcion para levantar el modal de mensaje de error
function erroMessage(textMessage)
{
	document.getElementById('errorMessage').innerHTML = textMessage;
	$('#errorAlert').modal('show');
}