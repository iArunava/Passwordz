var symbols = ["!", "@", "#", "$", "%", "^", "&", "*", ":", "/", ",", ".", "?"];

var salpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var calpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var ABTPASSWORDZ = "Passwordz is a random password generator.<br/>The list of characters used by default to generate a password are: <br/> All numbers and All alphabets (Small and Capital) <br/> Symbols: ! @ # $ % ^ & * : / , . ?";

function triggerInfoModal(title, body) {
	$("#id--info-modal-head").text(title);
	$("#id--info-modal-body").text(body);
	$("#id--info-modal").modal("show");
}

function copyToClipboard(text) {
	var ele = document.createElement("input");
	ele.setAttribute("value", text);
	document.body.appendChild(ele);
	ele.select();
	document.execCommand("copy");
	document.body.removeChild(ele);
}

$(document).ready(function() {
	$("#id--the-password").val("");
	$("#id--random-length-text").val("6-40");
	$("#id--about-modal-body").html(ABTPASSWORDZ);
});

$("#button--the-copy-btn").click(function() {
	copyToClipboard($("#id--the-password").val());
});

$("#button--the-passwd-gen").click(function () {
	var passwd = "", crange = "", temp = "";
	var randnum = 0;
	var currpos = 0;
	var length = 0;
	var srange = 0, erange = 0, flag = 0, i = 0;

	/* Setting the length */
	if ($("#id--random-length").is(":checked")) {
		length = parseInt((Math.random() * (40-6+1)) + 6);
	} else if ($("#id--fixed-length").is(":checked")) {
		length = parseInt($("#id--fixed-length-text").val());
		if (length <= 0) {
			triggerInfoModal("Error", "Length is 0 or less");
			return;
		}
	} else if ($("#id--range-length").is(":checked")) {
		crange = $("#id--range-length-text").val();
		temp = "";
		for (i = 0; i < crange.length; ++i) {
			if (crange[i] === '-') {
				if (temp === "") {
					triggerInfoModal("Error", "Invalid Input");
					return;
				}
				srange = parseInt(temp);
				temp = "";
				continue;
			}
			temp += crange[i];
		}
		if (temp === "") {
			triggerInfoModal("Error", "Invalid Input");
			return;
		}
		erange = parseInt(temp);
		length = parseInt((Math.random() * (erange-srange+1)) + srange);
	}
	
	//length = 15;
	
	$("#id--the-password").val(passwd);
	
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
