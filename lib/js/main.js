var symbols = ["!", "@", "#", "$", "%", "^", "&", "*", ":", "/", ",", ".", "?"];

var numArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

var salpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var calpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const INVALIDINPUT = "Invalid Input!";
const INVRANGE = "Invalid Range!";
const ERROR = "Error!";
const ZORLESS = "Length is 0 or less";
const INCONLYCODE = 130;
const JUSTINCCODE = 150;

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
	if ($("#id--default-inc-exc").is(":checked")) {
		$("#id--the-custom-selector :input").attr("disabled", true);
	} else if (!$("#id--cus-justinc").is(":checked")) {
		$("#id--jusinc-div :input").attr("disabled", true);
	}
});

$("#id--cus-includeonly").click(function() {
	$("#id--jusinc-div :input").attr("disabled", true);
});

$("#id--cus-incbut").click(function() {
	$("#id--jusinc-div :input").attr("disabled", true);
});

$("#id--cus-justinc").click(function() {
	$("#id--jusinc-div :input").attr("disabled", false);
});

$("#id--default-inc-exc").click(function() {
	$("#id--the-custom-selector :input").attr("disabled", true);
});

$("#id--custom-inc-exc").click(function() {
	$("#id--the-custom-selector :input").attr("disabled", false);
	if (!($("#id--cus-justinc").is(":checked"))) {
		$("#id--jusinc-div :input").attr("disabled", true);
	} else {
		$("#id--jusinc-div :input").attr("disabled", false);
	}
});

$("#button--the-copy-btn").click(function() {
	copyToClipboard($("#id--the-password").val());
});

$("#button--the-passwd-gen").click(function () {
	var passwd = "", crange = "", temp = "";
	var randnum = 0, currpos = 0, length = 0, flag = 0, srange = 0, erange = 0, i = 0, index = 0;
	var incButFlag = 0, tempAscii = 0;
	var customarr = [];
	var customdict = {};

	/* Setting the length */
	if ($("#id--random-length").is(":checked")) {
		length = parseInt((Math.random() * (40-6+1)) + 6);
	} else if ($("#id--fixed-length").is(":checked")) {
		length = parseInt($("#id--fixed-length-text").val());
		if (length <= 0) {
			triggerInfoModal(ERROR, ZORLESS);
			return;
		}
	} else if ($("#id--range-length").is(":checked")) {
		crange = $("#id--range-length-text").val();
		temp = "";
		for (i = 0; i < crange.length; ++i) {
			if (crange[i] === '-') {
				if (temp === "") {
					triggerInfoModal(ERROR, INVALIDINPUT);
					return;
				}
				srange = parseInt(temp);
				temp = "";
				flag = 1;
				continue;
			}
			temp += crange[i];
		}
		if (temp === "" || flag === 0) {
			triggerInfoModal(ERROR, INVRANGE);
			return;
		}
		erange = parseInt(temp);
		length = parseInt((Math.random() * (erange-srange+1)) + srange);
	}
	
	if (isNaN(length)) {
		triggerInfoModal(ERROR, INVALIDINPUT);
		return;
	}

	$("#id--the-password").val(passwd);
	
	if ($("#id--custom-inc-exc").is(":checked")) {
		if ($("#id--cus-includeonly").is(":checked")) {
			randnum = INCONLYCODE;
			temp = $("#id--include-only-text").val();
			for (i = 0; i < temp.length; ++i) {
				customarr.push(temp[i]);
			}
		} else if ($("#id--cus-justinc").is(":checked")) {
			randnum = JUSTINCCODE;
			
			if ($("#id--all-numbers").is(":checked")) {
				for (i = 0; i <= 9; ++i) {
					customarr.push(i.toString());
				}
			}

			if ($("#id--all-uppercase").is(":checked")) {
				for (i = 0; i < calpha.length; ++i) {
					customarr.push(calpha[i]);
				}
			}

			if ($("#id--all-lowercase").is(":checked")) {
				for (i = 0; i < salpha.length; ++i) {
					customarr.push(salpha[i]);
				}
			}

			if ($("#id--all-symbols").is(":checked")) {
				temp = $("#id--all-symbols-text").val();
				for (i = 0; i < temp.length; ++i) {
					customarr.push(temp[i]);
				}
			}

			if ($("#id--and-exclude").is(":checked")) {
				temp = $("#id--and-exclude-text").val();
				alert(temp);
				for (i = 0; i < temp.length; ++i) {
					index = customarr.indexOf(temp[i]);
					if (index > -1) {
						customarr.splice(index, 1);
					}
				}
			}
			
		} else if ($("#id--cus-incbut").is(":checked")) {
			incButFlag = 1;
			temp = $("#id--cus-incbut-text").val();
			for (i = 0; i < temp.length; ++i) {
				tempAscii = temp[i].charCodeAt(0);
				if (tempAscii >= 48 && tempAscii <= 57) {
					index = numArr.indexOf(temp[i]);
					if (index > -1) {
						numArr.splice(index, 1);
						customdict[temp[i]] = index;
					}
				} else if (tempAscii >= 65 && tempAscii <= 90) {
					index = calpha.indexOf(temp[i]);
					if (index > -1) {
						calpha.splice(index, 1);
						customdict[temp[i]] = index;
					}
				} else if (tempAscii >= 97 && tempAscii <= 122) {
					index = salpha.indexOf(temp[i]);
					if (index > -1) {
						salpha.splice(index, 1);
						customdict[temp[i]] = index;
					}
				} else {
					index = symbols.indexOf(temp[i]);
					if (index > -1) {
						symbols.splice(index, 1);
						customdict[temp[i]] = index;
					}
				}
			}
		}
	}
	
	currpos = 0;
	while (currpos != length) {
		
		if (randnum !== INCONLYCODE && randnum !== JUSTINCCODE) {
			randnum = parseInt((Math.random() * 4)) + 1;
		}
		
		if (randnum === 1) { // Number
			randnum = parseInt(Math.random() * numArr.length);
			passwd += numArr[randnum];
		} else if (randnum === 2) { // Small Alphabets
			randnum = parseInt(Math.random() * salpha.length);
			passwd += salpha[randnum];
		} else if (randnum === 3) { // Symbols
			randnum = parseInt(Math.random() * symbols.length);
			passwd += symbols[randnum];
		} else if (randnum === 4) { // Capitals
			randnum = parseInt(Math.random() * calpha.length);
			passwd += calpha[randnum];
		} else if (randnum === INCONLYCODE) {
			randnum = parseInt(Math.random() * customarr.length);
			passwd += customarr[randnum];
			randnum = INCONLYCODE;
		} else if (randnum === JUSTINCCODE) {
			randnum = parseInt(Math.random() * customarr.length);
			passwd += customarr[randnum];
			randnum = JUSTINCCODE;
		}
		
		++currpos;
	}
	
	$("#id--the-password").val(passwd);

	if (incButFlag === 1) {
		for (key in customdict) {
			tempAscii = key.charCodeAt(0);
			if (tempAscii >= 48 && tempAscii <= 57) {
				numArr.splice(customdict[key], 0, key);
			} else if (tempAscii >= 65 && tempAscii <= 90) {
				calpha.splice(customdict[key], 0, key);
			} else if (tempAscii >= 97 && tempAscii <= 122) {
				salpha.splice(customdict[key], 0, key);
			} else {
				symbols.splice(customdict[key], 0, key);
			}
		}
	}
});
