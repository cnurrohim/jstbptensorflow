export default class Matrix{
	constructor(array = []){
		this.rows = 1;
		this.cols = array.length;
		this.matrix = [array];
	}

	addRow(array){
		const newRow = this.matrix.length;
		this.matrix[newRow] = array;
		this.rows = this.matrix.length;
		this.cols = this.matrix[newRow].length;
	}

	addition(number){
		this.matrix.forEach((row,index)=>{
			this.matrix[index] = row.map( val => val += number );
		});
	}

	static multiply(matrix1,matrix2){
		const initial = new Array(matrix2.cols).fill(0);
		const result = new Matrix(initial);
		
		result.matrix.forEach((row,ri)=>{
			result.matrix[ri] = row.map((val,vi)=>{
				return matrix1.matrix[ri].reduce((sum,m_value,m_index)=>{
					sum + (m_value * matrix2.matrix[m_index][vi]);
				},0);
			});
		})

		console.log(result);
	}

}