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

export default class LOG_NN {
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

	/**
	GL = GRADIENT LOSS
	G = GRADIENT
	D = Derivatif Function
	**/		
	backwardPass(neurons,errors,targets){
		let GL_headNode;
		let G_node;
		let GL_weight;
		let GL_bias;
		let GL_weight_LR;
		let GL_bias_LR;
		let oldWeight;
		let oldBias;

		let _n = "";
		let _x = "";
		let _y = "";
		this.log += "<b>BACKWARD PROPAGATION: </b><br/>"

		for (let num_layer = this.weights.length ; num_layer > 0 ; num_layer-- ){
			if(num_layer == 1){
				_n = "H"+(num_layer);
				_x = "X";
				this.log += "<b> proses Backward Pass dari layer H"+(num_layer)+" ke layer input </b><br/> ";
			}else if(num_layer == this.weights.length){
				_n = "Y";
				_x = "H"+(num_layer-1);
				this.log += " <b> proses Backward Pass dari layer Output ke layer H"+(num_layer-1)+""+" </b><br/> ";
			}else{
				_n = "H"+(num_layer);
				_x = "H"+(num_layer-1);
				this.log += " <b> proses Backward Pass dari layer H"+(num_layer)+" ke layer H"+(num_layer-1)+" </b><br/> ";
			}

			const is_lastLayer = (num_layer == this.weights.length);
			const num_headLayer = num_layer;
			const num_currentLayer = num_layer-1;

			GL_headNode = (is_lastLayer)
							? this.gradientLossOutput(num_headLayer,neurons,targets,_n,_x)
							: this.gradientLossHeadNode(oldWeight,GL_headNode,G_node,neurons,num_headLayer,num_currentLayer);

			G_node = this.gradientLayer(num_headLayer,num_currentLayer,neurons,_n,_x);
			GL_weight = this.gradientWeightLoss(GL_headNode,G_node,neurons,num_currentLayer,_n,_x);
			GL_bias = this.gradientBiasLoss(GL_headNode,G_node,num_currentLayer,_n,_x);


			GL_weight_LR = Matrix.multiplyN(GL_weight,this.learning_rate);
			GL_bias_LR = Matrix.multiplyN(GL_bias,this.learning_rate);

			oldWeight = this.weights[num_currentLayer];
			oldBias = this.bias[num_currentLayer];

			this.updateWeight(GL_weight_LR,GL_bias_LR,num_currentLayer,_n,_x);
		}
	}

	
	gradientLossHeadNode(oldWeight,GL_headNode,G_node,neurons,num_headLayer,num_currentLayer){
		const T_previousNeurons = Matrix.transpose(neurons[num_currentLayer+1]);

		const sum_GL_headNode = Matrix.sum(GL_headNode);
		const sum_G_node = Matrix.sum(G_node);
		const sum_G_nodeWeight = Matrix.multiplyN(T_previousNeurons,neurons[num_headLayer+1].cols);
		const sum_oldWeight = Matrix.sum(oldWeight);


		let result = new Matrix(sum_GL_headNode.rows, sum_G_node.cols);
		for (let r = 0; r < result.rows; r++) {
			let rumus = "";
			for (let c = 0; c < result.cols; c++) {
				
				let sum = 0;
				for (let cols = 0; cols < sum_GL_headNode.cols; cols++) {
					rumus += sum_GL_headNode.matrix[r][cols]+" * "+sum_G_node.matrix[cols][c]+" + ";
					sum += sum_GL_headNode.matrix[r][cols] * sum_G_node.matrix[cols][c];
				}

				rumus = rumus.substring(0, rumus.length - 3);
				rumus += " = "+sum;
				this.log += rumus+" <br/><br/> ";
				result.matrix[r][c] = sum;
			}
		}

		let new_GL_headNode = Matrix.multiply(sum_GL_headNode,sum_G_node);

		result = new Matrix(sum_G_nodeWeight.rows, new_GL_headNode.cols);
		for (let r = 0; r < result.rows; r++) {
			let rumus = "";
			for (let c = 0; c < result.cols; c++) {
				
				let sum = 0;
				for (let cols = 0; cols < sum_G_nodeWeight.cols; cols++) {
					rumus += sum_G_nodeWeight.matrix[r][cols]+" * "+new_GL_headNode.matrix[cols][c]+" + ";
					sum += sum_G_nodeWeight.matrix[r][cols] * new_GL_headNode.matrix[cols][c];
				}

				rumus = rumus.substring(0, rumus.length - 3);
				rumus += " = "+sum;
				this.log += rumus+" <br/><br/> ";
				result.matrix[r][c] = sum;
			}
		}
		new_GL_headNode = Matrix.multiply(sum_G_nodeWeight,new_GL_headNode);

		for (let r = 0; r < sum_oldWeight.rows; r++) {
			for (let c = 0; c < sum_oldWeight.cols; c++) {
				const result = sum_oldWeight.matrix[r][c] * new_GL_headNode.matrix[r][c];
				this.log += sum_oldWeight.matrix[r][c]+" * "+new_GL_headNode.matrix[r][c]+" = "+result+" <br/>";
			}
		}

		this.log += "<br/>";

		new_GL_headNode = Matrix.multiplyM(sum_oldWeight,new_GL_headNode);
		new_GL_headNode = Matrix.transpose(new_GL_headNode);
	
		return new_GL_headNode;
	}

	updateWeight(GL_weight_LR,GL_bias_LR,num_currentLayer,_n,_x){
		_n = this.neurons_name[_n];
		_x = this.neurons_name[_x];
		this.log += "<b>Update Bobot </b><br/>";

		for (let r = 0; r < this.weights[num_currentLayer].rows; r++) {
			for (let c = 0; c < this.weights[num_currentLayer].cols; c++) {
				this.log += "W'"+_x+(r+1)+_n+(c+1)+" = W"+_x+_n+" - LR(GL W"+_x+_n+") </br>";
				this.log += "W'"+_x+(r+1)+_n+(c+1)+" = "+this.weights[num_currentLayer].matrix[r][c]+" - ("+GL_weight_LR.matrix[r][c]+") = ";
				this.log += this.weights[num_currentLayer].matrix[r][c] - GL_weight_LR.matrix[r][c]+" <br/> <br/>";
			}
		}

		this.weights[num_currentLayer] = Matrix.substract(this.weights[num_currentLayer],GL_weight_LR);
		
		

		for (let r = 0; r < this.bias[num_currentLayer].rows; r++) {
			for (let c = 0; c < this.bias[num_currentLayer].cols; c++) {
				this.log += "B'"+_x+(r+1)+_n+(c+1)+" = B"+_x+_n+" - LR(GL B"+_x+_n+") </br>";
				this.log += "B'"+_x+(r+1)+_n+(c+1)+" = "+this.bias[num_currentLayer].matrix[r][c]+" - ("+GL_bias_LR.matrix[r][c]+") = ";
				 this.log += this.bias[num_currentLayer].matrix[r][c] - GL_bias_LR.matrix[r][c]+" <br/> <br/>";

			}
		}
		this.bias[num_currentLayer] = Matrix.substract(this.bias[num_currentLayer],GL_bias_LR);
	}

	gradientBiasLoss(gradientLossNodeOut,gradientNodeIn,num_currentLayer,_n,_x){
		_n = this.neurons_name[_n];
		_x = this.neurons_name[_x];

		this.log += "<b>Gradient Loss terhadap Bias0 </b><br/>";

		const bias = this.bias[num_currentLayer];

		for (let r = 0; r < gradientLossNodeOut.rows; r++) {
			for (let c = 0; c < gradientLossNodeOut.cols; c++) {
				this.log += "(GL"+_n+"out * GL"+_n+"in) = (GL"+_n+"out * GL"+_n+"in) <br/>";
				const result = gradientLossNodeOut.matrix[r][c] * gradientNodeIn.matrix[r][c];
				this.log += "(GL"+_n+"out * GL"+_n+"in) = "+gradientLossNodeOut.matrix[r][c]+" * "+gradientNodeIn.matrix[r][c]+" = "+result+" <br/>";
			}
		}

		this.log += "<br/>";

		let GL_bias = Matrix.multiplyM(gradientLossNodeOut,gradientNodeIn);
		
		for (let r = 0; r < bias.rows; r++) {
			for (let c = 0; c < bias.cols; c++) {
				const result2 = bias.matrix[r][c] * GL_bias.matrix[r][c];
				this.log += "Bias"+_x+_n+" = Bias * (GL"+_n+"out * GL"+_n+"in) <br/>";
				this.log += "Bias"+_x+_n+" = "+bias.matrix[r][c]+" * "+GL_bias.matrix[r][c]+" = "+result2+" <br/>";
			}
		}

		this.log += "<br/>";
		GL_bias = Matrix.multiplyM(bias,GL_bias);


		return GL_bias;
	}

	gradientWeightLoss(gradientLossNodeOut,gradientNodeIn,neurons,num_currentLayer,_n,_x){
		_n = this.neurons_name[_n];
		_x = this.neurons_name[_x];

		this.log += "<b>Gradient Loss terhadap bobot "+_x+" </b><br/>";
		const T_neurons = Matrix.transpose(neurons[num_currentLayer]);
		
		for (let r = 0; r < gradientLossNodeOut.rows; r++) {
			for (let c = 0; c < gradientLossNodeOut.cols; c++) {
				const result2 = gradientLossNodeOut.matrix[r][c] * gradientNodeIn.matrix[r][c];
				this.log += "(GL"+_n+(r+1)+"out * GL"+_n+(c+1)+"in) = (GL"+_n+(r+1)+"out * GL"+_n+(c+1)+"in) <br/>";
				this.log += "(GL"+_n+(r+1)+"out * GL"+_n+(c+1)+"in) = "+gradientLossNodeOut.matrix[r][c]+" * "+gradientNodeIn.matrix[r][c]+" = "+result2+" <br/>";
			}
		}

		this.log += "<br/>";
		let GL_weight = Matrix.multiplyM(gradientLossNodeOut,gradientNodeIn);

		let result = new Matrix(T_neurons.rows, GL_weight.cols);
		for (let r = 0; r < result.rows; r++) {
			let rumus = "";
			for (let c = 0; c < result.cols; c++) {
				
				let sum = 0;
				for (let cols = 0; cols < T_neurons.cols; cols++) {

					rumus += "W"+_x+(r+1)+_n+(c+1)+" = "+_x+"in * (GL"+_n+"out * GL"+_n+"in) <br/>";
					rumus += T_neurons.matrix[r][cols]+" * "+GL_weight.matrix[cols][c];
					sum += T_neurons.matrix[r][cols] * GL_weight.matrix[cols][c];
				}

				rumus += " = "+sum+"<br/>";
				result.matrix[r][c] = sum;
			}
			
			this.log += rumus+" <br/> ";
		}

		GL_weight = Matrix.multiply(T_neurons,GL_weight);

		return GL_weight;
	}

	gradientLayer(num_headLayer,num_currentLayer,neurons,_n,_x){
		this.log += "<b>Gradient "+_n+"out terhadap "+_n+"in </b><br/>";

		const DF = fn['d'+this.activationFunctions[num_currentLayer]];
		this.logActivation(neurons[num_headLayer],'d'+this.activationFunctions[num_currentLayer],_x,_n,"Gradient "+_n+"out terhadap "+_n+"in")
		let G_node = Matrix.map(neurons[num_headLayer],DF);

		return G_node;
	}

	gradientLossOutput(num_outputLayer,neurons,targets,_n,_x){
		this.log += "<b>Gradient Loss terhadap "+_n+"out = </b> ";

		const DF = fn['d'+this.activationFunctions[num_outputLayer]];

		for (let r = 0; r < neurons[num_outputLayer].rows; r++) {
			for (let c = 0; c < neurons[num_outputLayer].cols; c++) {
				this.log += neurons[num_outputLayer].matrix[r][c]+" - "+targets.matrix[r][c]+" = ";
				 this.log += neurons[num_outputLayer].matrix[r][c] - targets.matrix[r][c]+" <br/> <br/>";

			}
		}

		const loss = Matrix.substract(neurons[num_outputLayer],targets);
		
		this.logActivation(loss,'d'+this.activationFunctions[num_outputLayer],_x,_n,'gradient loss terhadap '+_n+"out");

		const GL = Matrix.map(loss,DF);

		return 	GL;
	}


	feedForward(weights,inputs,bias,activation,_n,_x){
		// multiply weights matrix with inputs matrix
		let nodes = Matrix.multiply(inputs,weights);
		this.logforwardPass(inputs,weights,_n,_x,bias);


		
		nodes.add(bias);
		
		
		// activation function
		this.logActivation(nodes,activation,_x,_n);

		const activationFunction = fn[activation];
		nodes.map(activationFunction);

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
					rumus += "("+_x+"_in"+(r+1)+" * W"+_x.toLowerCase()+(cols+1)+_n.toLowerCase()+(c+1)+") + ";
					itungan += " ( "+m1.matrix[r][cols]+' * '+m2.matrix[cols][c]+" ) + ";
					sum += m1.matrix[r][cols] * m2.matrix[cols][c];
				}

				rumus = rumus.substring(0, rumus.length - 3);
				rumus += " + b"+_x.toLowerCase()+_n.toLowerCase()+(c+1);
				itungan = itungan.substring(0, itungan.length - 3);
				itungan += " + "+bias.matrix[r][c];
				itungan += " = "+(sum+bias.matrix[r][c])+" <br/> <br/>";

				this.log += rumus+" <br/> "+itungan;
				result.matrix[r][c] = sum;
			}
		}
	}

	getLog(){
		return this.log;
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

function dlinear(){
	return 1;
}

function dloss(x){
	return 1*2*(1/2)*(x);
}