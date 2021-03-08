export class Table{
	constructor(properties = {}){
		this.table = document.createElement('table');
		this.setTableProperty(properties);
	}

	setTableProperty(properties = {cellpadding:0,cellspacing:0,border:0,class:''}){
		this.table = this.setAttributes(this.table,properties);
	}

	createElement(element){
		if(typeof element == 'string'){
			return document.createElement(element);
		}else{
			return this.createElementWithAttributes(element,element.tag);
		}

		return false;
	}

	addNewRow(rowData,rowContainer,cellType = 'td',rowProperties = {}){
		const rowAttributes = {attributes:rowProperties};
		let tr = this.appendColumsData(rowData,cellType,rowAttributes);

		if(rowContainer == false){
			this.table.appendChild(tr);
		}else{
			rowContainer.appendChild(tr);
			this.table.appendChild(rowContainer);
		}
	}


	appendColumsData(rowData,cellType,rowAttributes){
		let tr = this.createElementWithAttributes(rowAttributes,'tr');
		
		let cell = {};
		rowData.forEach((data)=>{
			
			if(typeof data === 'object'){
				cell = this.createElementWithAttributes(data,cellType);
				cell = this.insertToCell(data,cell);
			}else{
				cell = document.createElement('td');
				cell.innerHTML = data;
			}

			tr.appendChild(cell);
		});

		return tr;	
	}

	createElementWithAttributes(object,tag){
		let tagElement = document.createElement(tag);
		
		if(typeof object.attributes === 'undefined'){
			
			return tagElement;			
		}

		if(typeof object.text !== 'undefined'){
			tagElement.innerHTML = object.text;
		}


		Object.keys(object.attributes).forEach((key,index)=>{
			tagElement = this.setAttribute(tagElement,key,object.attributes[key]);
		});

		return tagElement;
	}

	createNestedElements(elements,parentElement){
		let nestedElement;
		
		elements.forEach((element)=>{
			nestedElement = this.createElementWithAttributes(element,element.tag)
			parentElement.appendChild(nestedElement);
		});

		return parentElement;
	}

	insertToCell(element,cell){
		let objectElement;

		if(typeof element.content == 'object'){
			
			objectElement = this.createElementWithAttributes(element.content,element.content.tag);
		}

		if(typeof element.content == 'object' && typeof element.content.nestedElement != 'undefined'){
			objectElement = this.createNestedElements(element.content.nestedElement,objectElement);
		}


		if(typeof element.content != 'object'){
			cell.innerHTML = element.content;
		}else{
			cell.appendChild(objectElement);
		}

		return cell;
	}

	getTable(){
		return this.table;
	}

	displayTable(pageElement){
		let table_container = document.querySelector(pageElement);
		table_container.innerHTML = '';
		table_container.appendChild(this.table);
	}


	setAttribute(element,attribute,value){
		if(typeof value !== 'undefined'){
			element.setAttribute(attribute, value);
		}
		
		return element;
	}

	setAttributes(target,properties){
		let tagElement = target;

		Object.keys(properties).forEach((key,index)=>{
			tagElement = this.setAttribute(tagElement,key,properties[key]);
		});
		
		return tagElement;
	}

	setEmptyData(data,message = 'no data found'){
		if(data.length == 0){
			const colspan = this.table.querySelectorAll('tr:first-child  td').length;
			this.addNewRow([{content:message,attributes:{colspan:colspan,align:'center'}}],false);
		}
	}
}