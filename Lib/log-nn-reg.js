import Matrix from './Matrix.js';

const fn = {
	'relu':relu,
	'sigmoid':sigmoid,
	'linear':linear,
	'loss':loss,
	'drelu':drelu,
	'dsigmoid':dsigmoid,
	'dlinear':dlinear,
	'dloss':dloss
};

export default class NN {
	constructor(){
		this.log = "";

	}
	setWeights(weights){
		this.weights = weights;
	}
	
	setBiases(biases){
		this.bias = biases;
	}

	setLearningRate(lr){
		this.learning_rate = lr;
	}

	setActivationFunctions(activationFunctions){
		this.activationFunctions = 	activationFunctions;
	}

	getWeights(){
		return this.weights;
	}

	getBiases(){
		return this.bias;
	}

	forwardPass(input_array){
		this.neurons_name = {"X":"X","H1":"H","H2":"k","H3":"l","H4":"m","H5":"n","H5":"o","H6":"p","Y":"Y","b":"b"};

		// convert input array into matrix
		let neurons = [];
		neurons[0] = input_array;

		let _n = "";
		let _x = "";
		let _y = "";

		for (let i=0; i < this.weights.length; i++ ){
			if(i == 0){
				_n = "H"+(i+1);
				_x = "X";
				this.log += "<b> proses Forward Pass dari input ke layer H"+(i+1)+" </b><br/> ";
			}else if(i == this.weights.length-1){
				_n = "Y";
				_x = "H"+(i);
				this.log += " <b> proses Forward Pass dari layer H"+(i)+" ke layer Output"+" </b><br/> ";
			}else{
				_n = "H"+(i+1);
				_x = "H"+(i);
				this.log += " <b> proses Forward Pass dari layer H"+(i)+" ke layer H"+(i+1)+" </b><br/> ";
			}

			
			neurons[i+1] = this.feedForward(this.weights[i],neurons[i],this.bias[i],this.activationFunctions[i],_n,_x);
			
		}
		
		return neurons;
	}

	feedForward(weights,inputs,bias,activationFunction,_n,_x){
		// multiply weights matrix with inputs matrix
		
		
		let nodes = Matrix.multiply(inputs,weights);
		this.logforwardPass(inputs,weights,_n,_x,bias);

		nodes.add(bias);
		//console.table(nodes.matrix);
		
		this.logActivation(nodes,activationFunction,_x,_n);

		const activation = fn[activationFunction];
			
		// activation function
		nodes.map(activation);
		//console.table(nodes.matrix);

		return nodes;
	}

	logActivation(m,activation,_x,_n,title){
		

		_n = this.neurons_name[_n];
		_x = this.neurons_name[_x];

		this.log += " <b>Fungsi Aktivasi: "+activation+"</b><br/> ";
		
		let sum = 0;
		for (let r = 0; r < m.rows; r++) {
			for (let c = 0; c < m.cols; c++) {
				const namaVar = _n+"_in"+(c+1);

				this.log += this.fungsiAktivasi(namaVar,activation,m.matrix[r][c],title)+" <br/>";
			}
		}

		// console.table(this.matrix);
	}

	logforwardPass(m1,m2,_n,_x,bias){
		let result = new Matrix(m1.rows, m2.cols);

		_n = this.neurons_name[_n];
		_x = this.neurons_name[_x];

		for (let r = 0; r < result.rows; r++) {
			for (let c = 0; c < result.cols; c++) {
				let rumus = "";
				let itungan = "";
				
				let sum = 0;
				itungan += _n+"_in"+(c+1)+" = ";
				rumus += _n+"_in"+(c+1)+" = ";
				for (let cols = 0; cols < m1.cols; cols++) {
					itungan += " ( "+m1.matrix[r][cols]+' * '+m2.matrix[cols][c]+" ) + ";
					sum += m1.matrix[r][cols] * m2.matrix[cols][c];
				}

				itungan = itungan.substring(0, itungan.length - 3);
				itungan += " + "+bias.matrix[r][c];
				itungan += " = "+(sum+bias.matrix[r][c])+" <br/> <br/>";

				this.log += itungan;
				result.matrix[r][c] = sum;
			}
		}
	}
	
	getLog(){
		return this.log;
	}

	fungsiAktivasi(namaVar,namaFungsi,nilai,title){
		const activationFunction = fn[namaFungsi];
		let log = "";
		if(namaFungsi == "relu"){
			log += namaVar+" = max(0,x) <br/>";
			log += namaVar+" = max(0,"+nilai+") <br/>";
			log += namaVar+" = "+activationFunction(nilai)+"<br/>";
		}

		if(namaFungsi == "sigmoid"){
			log += namaVar+" = 1/1+exp^-x <br/>";
			log += namaVar+" = 1/1+exp^-"+nilai+" <br/>";
			log += namaVar+" = "+activationFunction(nilai)+"<br/>";
		}

		if(namaFungsi == "linear"){
			log += namaVar+" = x <br/>";
			log += namaVar+" = "+nilai+" <br/>";
		}

		if(namaFungsi == "loss"){
			log += namaVar+" = (1/2) * (target-x)^2 <br/>";
			log += namaVar+" = (1/2) * (target-"+nilai+")^2 <br/>";
			log += namaVar+" = "+activationFunction(nilai)+" <br/>";
		}

		if(namaFungsi == "dloss"){
			log += title+" = 1 * 2 * (1/2) * (x) <br/>";
			log += title+" = 1 * 2 * (1/2) * ("+nilai+") <br/>";
			log += title+" = "+activationFunction(nilai)+" <br/>";
		}

		if(namaFungsi == "dlinear"){
			log += title+" = 1 <br/>";
		}

		if(namaFungsi == "dsigmoid"){
			log += title+" = x * (1-x) <br/>";
			log += title+" = "+nilai+" * (1-"+nilai+") <br/>";
			log += title+" = "+activationFunction(nilai)+" <br/>";
		}

		if(namaFungsi == "drelu"){
			log += title+" = 1 } X > 0 <br/>";
			log += title+" = 0 } X <= 0 <br/>";
			log += title+" = X = "+nilai+" <br/>";
			log += title+" = "+activationFunction(nilai)+" <br/>";
		}


		return log;
	}

	backwardPass(neurons,errors,targets){
		
		let _n = "";
		let _x = "";
		let _y = "";
		this.log += "<b>BACKWARD PROPAGATION: </b><br/>"

		const delta_weight = [];
		const delta_bias = [];
		for (let current_layer = this.weights.length ; current_layer > 0 ; current_layer-- ){
			
			if(current_layer == 1){
				_n = "H";
				_x = "X";
				this.log += "<b> proses Backward Pass dari layer H"+(current_layer)+" ke layer input </b><br/> ";
			}else if(current_layer == this.weights.length){
				_n = "Y";
				_x = "H";
				this.log += " <b> proses Backward Pass dari layer Output ke layer H"+(current_layer-1)+""+" </b><br/> ";
			}else{
				_n = "V";
				_x = "H";
				this.log += " <b> proses Backward Pass dari layer H"+(current_layer)+" ke layer H"+(current_layer-1)+" </b><br/> ";
			}

			// error gradient neurons
			const error_gradient = this.errorGradient(neurons,errors,current_layer,_n,_x);

			delta_weight[current_layer-1] = this.deltaWeights(neurons,error_gradient,current_layer,_n,_x);
			delta_bias[current_layer-1] = this.deltaBias(error_gradient,current_layer,_n,_x);
			
			if(current_layer > 1){
				errors = this.total_error_neurons_in(error_gradient,current_layer,_n,_x);
			}

		}

		// update weight and bias
		this.updateWeight(delta_weight,delta_bias);
	}

	errorGradient(neurons,errors,current_layer,_n,_x){
		const DF = fn['d'+this.activationFunctions[current_layer-1]];
		
		const derivatif = Matrix.map(neurons[current_layer],DF);

		for (let r = 0; r < errors.rows; r++) {
			for (let c = 0; c < errors.cols; c++) {
				this.log += "g("+_n+(c+1)+") = ";
				const result = errors.matrix[r][c] * derivatif.matrix[r][c];
				this.log += errors.matrix[r][c]+" * "+derivatif.matrix[r][c]+" = "+result+" <br/>";
			}
		}
		this.log += "<br/>";

		const error_gradient = Matrix.multiplyM(errors,derivatif);

		return error_gradient;
	}

	deltaWeights(neurons,error_gradient,current_layer,_n,_x){
		const T_neurons = Matrix.transpose(neurons[current_layer-1]);

		let result = new Matrix(T_neurons.rows, error_gradient.cols);
		for (let r = 0; r < result.rows; r++) {
			let rumus = "";
			for (let c = 0; c < result.cols; c++) {
			rumus += " delta"+_x+" "+(r+1)+""+(c+1)+" = ";
				
				let sum = 0;
				for (let cols = 0; cols < T_neurons.cols; cols++) {
					rumus += T_neurons.matrix[r][cols]+" * "+error_gradient.matrix[cols][c]+" + ";
					sum += T_neurons.matrix[r][cols] * error_gradient.matrix[cols][c];
				}

				rumus = rumus.substring(0, rumus.length - 3);
				rumus += " = "+sum+" <br/> ";
				result.matrix[r][c] = sum;
				
			}
			this.log += rumus+" <br/>";
		}

		let delta_weight = Matrix.multiply(T_neurons,error_gradient);

		
		for (let r = 0; r < delta_weight.rows; r++) {
			for (let c = 0; c < delta_weight.cols; c++) {
				this.log += " delta"+_x+" "+(r+1)+""+(c+1)+" = ";
				const result = delta_weight.matrix[r][c] * this.learning_rate;
				this.log += delta_weight.matrix[r][c]+" * "+this.learning_rate+" = "+result+" <br/>";
			}
		}

		delta_weight = Matrix.multiplyN(delta_weight,this.learning_rate);
		
		return 	delta_weight;	
	}

	deltaBias(error_gradient,current_layer,_n,_x){
		for (let r = 0; r < error_gradient.rows; r++) {
			for (let c = 0; c < error_gradient.cols; c++) {
				this.log += " delta"+_x+"0"+(c+1)+" = ";
				const result = error_gradient.matrix[r][c] * this.learning_rate;
				this.log += error_gradient.matrix[r][c]+" * "+this.learning_rate+" = "+result+" <br/>";
			}
		}
		const delta_bias = Matrix.multiplyN(error_gradient,this.learning_rate);
		return delta_bias;
	}

	total_error_neurons_in(error_gradient,current_layer,_n,_x){
		const T_weight = Matrix.transpose(this.weights[current_layer-1]);
		
		let result = new Matrix(error_gradient.rows, T_weight.cols);
		for (let r = 0; r < result.rows; r++) {
			let rumus = "";
			for (let c = 0; c < result.cols; c++) {
			rumus += " g_In "+(c+1)+" = ";
				
				let sum = 0;
				for (let cols = 0; cols < error_gradient.cols; cols++) {
					rumus += error_gradient.matrix[r][cols]+" * "+T_weight.matrix[cols][c]+" + ";
					sum += error_gradient.matrix[r][cols] * T_weight.matrix[cols][c];
				}

				rumus = rumus.substring(0, rumus.length - 3);
				rumus += " = "+sum+"<br/>";
				result.matrix[r][c] = sum;
			}
			this.log += rumus+" <br/>";
		}

		const t_neurons_in = Matrix.multiply(error_gradient,T_weight);



		return t_neurons_in;
	}

	updateWeight(delta_weight,delta_bias){
		let _n = "";
		let _x = "";
		let _y = "";
		this.log += "<b>Update Bobot </b><br/>";

		for (let current_layer = this.weights.length-1 ; current_layer >= 0 ; current_layer-- ){
			if(current_layer == 1){
				_n = "W";
				_x = "X";
				
			}else if(current_layer == this.weights.length){
				_n = "Y";
				_x = "W";
				
			}else{
				_n = "V";
				_x = "W";
			}

			
			for (let r = 0; r < this.weights[current_layer].rows; r++) {
				for (let c = 0; c < this.weights[current_layer].cols; c++) {
					this.log += _n+(r+1)+""+(c+1)+" = "+this.weights[current_layer].matrix[r][c]+" + ("+delta_weight[current_layer].matrix[r][c]+") = ";
					this.log += this.weights[current_layer].matrix[r][c] + delta_weight[current_layer].matrix[r][c]+" <br/> <br/>";
				}
			}

			this.weights[current_layer].add(delta_weight[current_layer]);

			for (let r = 0; r < this.bias[current_layer].rows; r++) {
				for (let c = 0; c < this.bias[current_layer].cols; c++) {
					this.log += _n+"0"+(c+1)+" = "+this.bias[current_layer].matrix[r][c]+" + ("+delta_bias[current_layer].matrix[r][c]+") = ";
					this.log += this.bias[current_layer].matrix[r][c] + delta_bias[current_layer].matrix[r][c]+" <br/> <br/>";
				}
			}

			this.bias[current_layer].add(delta_bias[current_layer]);
		}
	}
		
}



function sigmoid(x){
	return 1 / (1 + Math.exp(-x));
}

function loss(x){
	return (1/2) * Math.pow(x,2);
}

function dsigmoid(x){
	return x*(1-x);
}

function relu(x){
	return Math.max(0,x);
}

function drelu(x){
	return (x>0) ? 1 : 0 ;
}

function linear(x){
	return x;
}

function dlinear(x){
	return x*(1-x);
	//return 1;
}

function dloss(x){
	return 1*2*(1/2)*(x);
}