export default class Matrix{
	constructor(rows,cols,matrix = false){
		this.rows = rows;
		this.cols = cols;
		this.setMatrix(matrix)
		//// console.table(this.matrix);
	}

	setMatrix(matrix){
		if(matrix){
			this.matrix = matrix;
		}else{
			this.matrix = [];
			for (let r = 0; r < this.rows; r++) {
				this.matrix[r]=[];
				for (let c = 0; c < this.cols; c++) {
					this.matrix[r][c] = 0;
				}
			}
		}
	}

	map(fn,param = null){
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.cols; c++) {
				this.matrix[r][c] = fn(this.matrix[r][c],param);
			}
		}

		// console.table(this.matrix);
	}

	static map(m,fn,param = null){
		let result = new Matrix(m.rows,m.cols);
		for (let r = 0; r < result.rows; r++) {
			for (let c = 0; c < result.cols; c++) {
				result.matrix[r][c] = fn(m.matrix[r][c],param);
			}
		}

		// console.table(m.matrix);
		return result;
	}

	static power(nMatrix,power){
		let result = new Matrix(nMatrix.rows,nMatrix.cols);

		for (let r = 0; r < nMatrix.rows; r++) {
			for (let c = 0; c < nMatrix.cols; c++) {
				result.matrix[r][c] = parseFloat((Math.pow(nMatrix.matrix[r][c],power)));
			}
		}

		// console.table(result.matrix);
		return result;
	}

	static divisionByCols(m1,divider){
		let result = new Matrix(m1.rows,m1.cols);
		
		for (let r = 0; r < m1.rows; r++) {
			for (let c = 0; c < m1.cols; c++) {
				
				result.matrix[r][c] = parseFloat((m1.matrix[r][c] / divider.matrix[0][c]));
			}
		}

		// console.table(result.matrix);
		return result;
	}

	static divisionByRows(m1,divider){
		let result = new Matrix(m1.rows,m1.cols);
		
		for (let r = 0; r < m1.rows; r++) {
			for (let c = 0; c < m1.cols; c++) {
								
				result.matrix[r][c] = parseFloat((m1.matrix[r][c] / divider.matrix[r]));

			}
		}

		return result;
	}

	static transpose(nMatrix){
		let result = new Matrix(nMatrix.cols,nMatrix.rows);
         
		for (let r = 0; r < nMatrix.rows; r++) {
			for (let c = 0; c < nMatrix.cols; c++) {
				result.matrix[c][r] = nMatrix.matrix[r][c];
			}
		}

		// console.table(result.matrix);
		return result;
	}

	toArray() {
    	let arr = [];
		for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
		    arr.push(this.matrix[i][j]);
		  }
		}
		return arr;
	}

	/*
	* return new matrix m1 - m2
	* @var m1,m2 matrix with the same size
	* return matrix
	*/
	static substract(m1,m2){
		let result = new Matrix(m1.rows,m1.cols);
		

		for (let r = 0; r < m1.rows; r++) {
			for (let c = 0; c < m1.cols; c++) {
				result.matrix[r][c] = m1.matrix[r][c] - m2.matrix[r][c];
			}
		}

		// console.table(result.matrix);
		return result;
	}

	/*
	* matrix multiplication with matrix with diffent size resulting different size matrix
	* matrix product
	* @m1,@m2 matrix
	* return matrix
	*/
	static multiply(m1,m2){
		if(m2 instanceof Matrix){
			
			if(m1.cols !== m2.rows){
				console.log('matrix size mismatch !');
				
				return undefined;
			}

		}

		let result = new Matrix(m1.rows, m2.cols);

		for (let r = 0; r < result.rows; r++) {
			for (let c = 0; c < result.cols; c++) {
				
				let sum = 0;
				for (let cols = 0; cols < m1.cols; cols++) {
					sum += m1.matrix[r][cols] * m2.matrix[cols][c];
				}

				result.matrix[r][c] = sum;
			}
		}

		
		return result;
	}


	static sum(nMatrix){
		let result = new Matrix(nMatrix.rows,1);

		for (let r = 0; r < nMatrix.rows; r++) {
			let total = 0;
			for (let c = 0; c < nMatrix.cols; c++) {
				total += nMatrix.matrix[r][c];
			}
			result.matrix[r][0] = total;
		}

		return result;
	}

	/*
	* matrix multiplication with matrix by the same element index
	* element wise
	* @nMatrix matrix
	*/
	multiplyM(nMatrix){
		if(!nMatrix instanceof Matrix){
			return 'wrong data type';
		}

		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.cols; c++) {
				this.matrix[r][c] *= nMatrix.matrix[r][c];
			}
		}

		// console.table(this.matrix);
	}


	/*
	* matrix multiplication with matrix by the same element index
	* element wise
	* @nMatrix matrix
	*/
	static multiplyM(m1,m2){
		let result = new Matrix(m1.rows,m1.cols);

		if(!m1 instanceof Matrix || !m2 instanceof Matrix){
			return 'wrong data type';
		}

		for (let r = 0; r < m1.rows; r++) {
			for (let c = 0; c < m1.cols; c++) {
				result.matrix[r][c] = m1.matrix[r][c] * m2.matrix[r][c];
			}
		}

		// console.table(result.matrix);
		return result;
	}

	/*
	* matrix multiplication with single value
	* scalar product
	* @n number
	*/
	static multiplyN(m,n){
		let result = new Matrix(m.rows,m.cols);
		for (let r = 0; r < m.rows; r++) {
			for (let c = 0; c < m.cols; c++) {
				result.matrix[r][c] = m.matrix[r][c] * n;
			}
		}

		// console.table(m.matrix);
		return result;
	}

	/*
	* matrix multiplication with single value
	* scalar product
	* @n number
	*/
	multiplyN(n){
		
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.cols; c++) {
				this.matrix[r][c] *= n;
			}
		}

		// console.table(this.matrix);
	}

	/*
	* matrix addition with matrix
	* element wise
	* @nMatrix matrix
	*/
	add(nMatrix){
		if(!nMatrix instanceof Matrix){
			return 'wrong data type';
		}
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.cols; c++) {
				this.matrix[r][c] += nMatrix.matrix[r][c];
			}
		}

		// console.table(this.matrix);
	}

	/*
	* matrix addition with single value
	* scalar product
	* @n number
	*/
	addN(n){
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.cols; c++) {
				this.matrix[r][c] += n;
			}
		}

		// console.table(this.matrix);
	}

	static fromArray(array,rows = 1,cols = 1){
		let n = 0;
		let result = new Matrix(rows,cols);
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				result.matrix[r][c] = array[n++];
			}
		}

		// console.table(result.matrix);
		return result;
	}

	randomize(min = 0,max = 1){
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.cols; c++) {
				this.matrix[r][c] = (Math.random() * (max - min) + min);;
			}
		}

		// console.table(this.matrix);
	}

	print(){
		// console.table(this.matrix);
	}

	static acak(rows,cols,min,max){
		let matrix = [];
		for(let r = 0; r < rows; r++){
			matrix[r] = [];
			for(let c = 0; c < cols; c++){
				let value = (Math.random() * (max - min) + min);
				matrix[r][c] = value;
			}
		}

		return matrix;
	}

	static fixedTwo(matrix){
		for(let r = 0; r < matrix.length; r++){
			for(let c = 0; c < matrix[r].length; c++){
				let val = matrix[r][c];
				matrix[r][c] = parseFloat(val);
			}
		}

		return matrix;	
	}
}