var symbols = ["!", "@", "#", "$", "%", "^", "&", "*", ":", "/", ",", ".", "?"];

var salpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var calpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

$(document).ready(function() {
	$("#id--the-password").val("");
});

$("#button--the-passwd-gen").click(function () {
	var passwd = "";
	var randnum = 0;
	var currpos = 0;
	var length = 0;
	length = parseInt((Math.random() * 30) + 12);
	//length = 15;
		
	currpos = 0;
	while (currpos != length) {
		randnum = parseInt((Math.random() * 4)) + 1;
		//randnum = 3;

		if (randnum === 1) { // Number
			randnum = parseInt(Math.random() * 10);
			passwd += randnum.toString();
		} else if (randnum === 2) { // Small Alphabets
			randnum = parseInt(Math.random() * salpha.length);
			passwd += salpha[randnum];
		} else if (randnum === 3) { // Symbols
			randnum = parseInt(Math.random() * symbols.length);
			passwd += symbols[randnum];
		} else if (randnum === 4) { // Capitals
			randnum = parseInt(Math.random() * calpha.length);
			passwd += calpha[randnum];
		}
		
		++currpos;
	}
	
	$("#id--the-password").val(passwd);
});
