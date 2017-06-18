function field(name, selector, example){
	this.name = name;
	this.selector = selector;
	this.example = example;
}

/*function toggleTable(table, showAll){
	for(var r=2; r<table.rows.length; r++){
		for(var c=0; c<table.rows[r].cells.length; c++){
			table.rows[r].cells[c].style.visibility = showAll ? "visible" : "collapse";
		}
	}
}*/

/*function addfield(var field, var fields){
	fields[fields.length] = field;
}*/

function createFieldDivs(fieldDivs, fields){
	for(var i=0; i<fields.length; i++){
		
		//div that displays the item field's properties
		var fieldDiv = document.createElement("div");
		fieldDiv.className = "su-field";
		
		//field that specifies the item field's name
		var fieldName = document.createElement("div");
		fieldName.className = "su-field-name-container";
		fieldName.innerHTML = fields[i].name;
		fieldDiv.appendChild(fieldName);
		
		var fieldSelector = document.createElement("div");
		fieldSelector.className = "su-field-selector";
		fieldSelector.innerHTML = fields[i].selector;
		fieldDiv.appendChild(fieldSelector);
		
		var fieldExample = document.createElement("div");
		fieldExample.className = "su-field-example";
		fieldExample.innerHTML = fields[i].example;
		fieldDiv.appendChild(fieldExample);
		
		fieldDivs[i] = fieldDiv;
	}
}

function appendFieldDivs(fieldDivs, fieldDivsContainer){
	for(var i=0; i<fieldDivs.length; i++){
		fieldDivsContainer.appendChild(fieldDivs[i]);
	}
}

function toggleFieldDivs(fieldDivs, show){
	for(var i=1; i<fieldDivs.length; i++){
		fieldDivs[i].style.display = show ? "flex" : "none";
	}
}

function updateFieldDivs(fieldDivs, fieldDivsContainer, toggleButton, editButton){
	fieldDivsContainer.innerHTML = "";
	appendFieldDivs(fieldDivs, fieldDivsContainer);
	fieldDivs[0].insertBefore(toggleButton, fieldDivs[0].childNodes[0]);
	fieldDivs[0].insertBefore(editButton, fieldDivs[0].childNodes[2]);
	fieldDivs[0].childNodes[1].style.width = "16%";
}

function selectFieldDiv(fieldDivs, selection){
	if(selection != fieldDivs[0]){
		for(var i=1; i<fieldDivs.length; i++){
			if(fieldDivs[i] == selection){
				var temp = fieldDivs[0];
				fieldDivs[0] = selection;
				fieldDivs[i] = temp;
			}
		}
	}
}

//var SUTable;
//var showTable;

var field1 = new field("product_name", "class=\"product_name\"", "Blue Jeans");
var field2 = new field("product_price", "class=\"product_price\"", "19.99");
var field3 = new field("product_rating", "class=\"product_rating\"", "4.51");
var fields = [field1, field2, field3];
var fieldDivs = new Array();
var fieldDivsToggle = document.createElement("div");
var fieldDivsEdit = document.createElement("div");
var fieldDivsContainer;
var showFieldDivs;

window.onload = function(){
	//var SUTable = document.getElementById("su-table");
	//var showTable = false;
	
	/*toggleTable(SUTable, false);
	document.getElementById("su-table-toggle").addEventListener("click", function(){
		showTable = !showTable;
		console.log(showTable);
		toggleTable(document.getElementById("su-table"), showTable)
	});*/
	fieldDivsContainer = document.getElementById("su-fields-container");
	showFieldDivs = false;
	fieldDivsToggle.id = "su-fields-toggle";
	fieldDivsEdit.id = "su-field-edit";
	fieldDivsEdit.innerHTML = "/";
	
	createFieldDivs(fieldDivs, fields);
	updateFieldDivs(fieldDivs, fieldDivsContainer, fieldDivsToggle, fieldDivsEdit);
	toggleFieldDivs(fieldDivs, showFieldDivs);
	fieldDivsToggle.innerHTML = ">";
	fieldDivsToggle.addEventListener("click", function(){
		showFieldDivs = !showFieldDivs;
		toggleFieldDivs(fieldDivs, showFieldDivs);
		fieldDivsToggle.innerHTML = showFieldDivs ? "V" : ">";
	});
	for(var i=0; i<fieldDivs.length; i++){
		fieldDivs[i].addEventListener("click", function(){
			selectFieldDiv(fieldDivs, this);
			updateFieldDivs(fieldDivs, fieldDivsContainer, fieldDivsToggle, fieldDivsEdit);
		});
	}
}