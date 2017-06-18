function field(name, selector, example){
	this.name = name;
	this.selector = selector;
	this.example = example;
	this.selectable = false; //Change 1
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

function createFieldDiv(field){ //Begin change 2
	var fieldDiv = document.createElement("div");
	fieldDiv.className = "su-field";
	
	//field that specifies the item field's name
	var fieldName = document.createElement("div");
	fieldName.className = "su-field-name";
	fieldName.innerHTML = field.name;
	fieldDiv.appendChild(fieldName);
	
	var fieldSelector = document.createElement("div");
	fieldSelector.className = "su-field-selector";
	fieldSelector.innerHTML = field.selector;
	fieldDiv.appendChild(fieldSelector);
	
	var fieldExample = document.createElement("div");
	fieldExample.className = "su-field-example";
	fieldExample.innerHTML = field.example;
	fieldDiv.appendChild(fieldExample);
	
	return fieldDiv;
}

function createFieldDivs(fieldDivs, fields){
	for(var i=0; i<fields.length; i++){
		
		/* //div that displays the item field's properties
		var fieldDiv = document.createElement("div");
		fieldDiv.className = "su-field";
		
		//field that specifies the item field's name
		var fieldName = document.createElement("div");
		fieldName.className = "su-field-name";
		fieldName.innerHTML = fields[i].name;
		fieldDiv.appendChild(fieldName);
		
		var fieldSelector = document.createElement("div");
		fieldSelector.className = "su-field-selector";
		fieldSelector.innerHTML = fields[i].selector;
		fieldDiv.appendChild(fieldSelector);
		
		var fieldExample = document.createElement("div");
		fieldExample.className = "su-field-example";
		fieldExample.innerHTML = fields[i].example;
		fieldDiv.appendChild(fieldExample); */
		
		fieldDivs[i] = createFieldDiv(fields[i]);
	}
} //End change 2

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

/*function toggleEditable(fieldDivs, editable){
	var target = fieldDivs[0];
	target.childNodes[1].contentEditable = editable;
	if(!editable){
		target.name = target.childNodes[0].innerHTML;
	}
}*/

function updateFieldDivs(fieldDivs, fieldDivsContainer, addButton, toggleButton /*editButton*/){ //Begin change 3
	fieldDivsContainer.innerHTML = "";
	appendFieldDivs(fieldDivs, fieldDivsContainer);
	fieldDivs[0].insertBefore(toggleButton, fieldDivs[0].childNodes[0]);
	fieldDivs[0].insertBefore(addButton, fieldDivs[0].childNodes[2]);
	//fieldDivs[0].insertBefore(editButton, fieldDivs[0].childNodes[2]);
	fieldDivs[0].childNodes[1].style.width = "14%";
	fieldDivs[0].childNodes[1].contentEditable = true;
	fieldDivs[0].selectable = false;
	for(var i=1; i<fieldDivs.length; i++){
		fieldDivs[i].childNodes[1].contentEditable = false;
		fieldDivs[i].selectable = true;
	}
} //End change 3

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
var fieldDivsAdd = document.createElement("div");
var fieldDivsToggle = document.createElement("div");
//var fieldDivsEdit = document.createElement("div");
var fieldDivsContainer;
var showFieldDivs;
//var editFieldDiv;

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
	//editFieldDiv = false;
	fieldDivsAdd.id = "su-field-add";
	fieldDivsAdd.innerHTML = "+";
	
	fieldDivsToggle.id = "su-fields-toggle";
	fieldDivsToggle.innerHTML = ">";
	//fieldDivsEdit.id = "su-field-edit";
	//fieldDivsEdit.innerHTML = "|";
	
	createFieldDivs(fieldDivs, fields);
	updateFieldDivs(fieldDivs, fieldDivsContainer, fieldDivsAdd, fieldDivsToggle /*fieldDivsEdit*/);
	toggleFieldDivs(fieldDivs, showFieldDivs);

	fieldDivsAdd.addEventListener("click", function(){
		var newField = new field("Name", "Selector", "Example");
		fields.push(newField);
		var newFieldDiv = createFieldDiv(newField);
		fieldDivs.push(newFieldDiv);
		selectFieldDiv(fieldDivs, newFieldDiv);
		updateFieldDivs(fieldDivs, fieldDivsContainer, fieldDivsAdd, fieldDivsToggle /*fieldDivsEdit*/);
		newFieldDiv.addEventListener("click", function(){
			if(this.selectable){
				selectFieldDiv(fieldDivs, this);
				updateFieldDivs(fieldDivs, fieldDivsContainer, fieldDivsAdd, fieldDivsToggle /*fieldDivsEdit*/);
				showFieldDivs = !showFieldDivs;
				toggleFieldDivs(fieldDivs, showFieldDivs);
				fieldDivsToggle.innerHTML = showFieldDivs ? "V" : ">";
				this.childNodes[1].focus();
			}
		});
		//selectFieldDiv(fieldDivs, newFieldDiv);
		//updateFieldDivs(fieldDivs, fieldDivsContainer, fieldDivsAdd, fieldDivsToggle /*fieldDivsEdit*/);
		/*showFieldDivs = !showFieldDivs;
		toggleFieldDivs(fieldDivs, showFieldDivs);
		fieldDivsToggle.innerHTML = showFieldDivs ? "V" : ">";
		newFieldDiv.childNodes[1].focus();*/
	});
	
	fieldDivsToggle.addEventListener("click", function(){
		showFieldDivs = !showFieldDivs;
		toggleFieldDivs(fieldDivs, showFieldDivs);
		fieldDivsToggle.innerHTML = showFieldDivs ? "V" : ">";
	});
	
	for(var i=0; i<fieldDivs.length; i++){
		fieldDivs[i].addEventListener("click", function(){
			if(this.selectable){
				selectFieldDiv(fieldDivs, this);
				updateFieldDivs(fieldDivs, fieldDivsContainer, fieldDivsAdd, fieldDivsToggle /*fieldDivsEdit*/);
				showFieldDivs = !showFieldDivs;
				toggleFieldDivs(fieldDivs, showFieldDivs);
				fieldDivsToggle.innerHTML = showFieldDivs ? "V" : ">";
				this.childNodes[1].focus();
			}
		});
		fieldDivs[i].addEventListener("keypress", function(){
			if(this == fieldDivs[0]){
				this.name = this.childNodes[1].innerHTML;
			}
		});
	}
	
	/*fieldDivsEdit.addEventListener("click", function(){
		editFieldDiv = !editFieldDiv;
		toggleEditable(fieldDivs, editFieldDiv);
		editFieldDiv.innerHTML = editFieldDiv ? "/" : "|";
	});*/
}