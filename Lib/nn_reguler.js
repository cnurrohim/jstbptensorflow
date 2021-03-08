import Matrix from './Matrix.js';

export default class NN {
	constructor(){
		this.fn = {
			'relu':this.relu,
			'prelu':this.prelu,
			'sigmoid':this.sigmoid,
			'linear':this.linear,
			'loss':this.loss,
			'drelu':this.drelu,
			'dprelu':this.dprelu,
			'dsigmoid':this.dsigmoid,
			'dlinear':this.dlinear,
			'dloss':this.dloss
		};
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

		// convert input array into matrix
		let neurons = [];
		neurons[0] = input_array;

		for (let i=0; i < this.weights.length; i++ ){
			
			const activation = this.fn[this.activationFunctions[i]];
			
			neurons[i+1] = this.feedForward(this.weights[i],neurons[i],this.bias[i],activation);
			
		}
		
		return neurons;
	}

	feedForward(weights,inputs,bias,activationFunction){
		// multiply weights matrix with inputs matrix
		
		
		let nodes = Matrix.multiply(inputs,weights);
		nodes.add(bias);
		//console.table(nodes.matrix);
		
		// activation function
		nodes.map(activationFunction,this.learning_rate);
		//console.table(nodes.matrix);

		return nodes;
	}
	
	backwardPass(neurons,errors,targets){
		
		const delta_weight = [];
		const delta_bias = [];
		for (let current_layer = this.weights.length ; current_layer > 0 ; current_layer-- ){
			
			// error gradient neurons
			const error_gradient = this.errorGradient(neurons,errors,current_layer);
			delta_weight[current_layer-1] = this.deltaWeights(neurons,error_gradient,current_layer);
			delta_bias[current_layer-1] = this.deltaBias(error_gradient,current_layer);
			
			if(current_layer > 1){
				errors = this.total_error_neurons_in(error_gradient,current_layer);
			}

		}

		// update weight and bias
		this.updateWeight(delta_weight,delta_bias);
	}

	errorGradient(neurons,errors,current_layer){
		const DF = this.fn['d'+this.activationFunctions[current_layer-1]];
		
		const derivatif = Matrix.map(neurons[current_layer],DF,this.learning_rate);
		const error_gradient = Matrix.multiplyM(errors,derivatif);

		return error_gradient;
	}

	deltaWeights(neurons,error_gradient,current_layer){
		const T_neurons = Matrix.transpose(neurons[current_layer-1]);
		let delta_weight = Matrix.multiply(T_neurons,error_gradient);
		delta_weight = Matrix.multiplyN(delta_weight,this.learning_rate);
		
		return 	delta_weight;	
	}

	deltaBias(error_gradient,current_layer){
		const delta_bias = Matrix.multiplyN(error_gradient,this.learning_rate);
		return delta_bias;
	}

	total_error_neurons_in(error_gradient,current_layer){
		const T_weight = Matrix.transpose(this.weights[current_layer-1]);
		const t_neurons_in = Matrix.multiply(error_gradient,T_weight);

		return t_neurons_in;
	}

	updateWeight(delta_weight,delta_bias){
		for (let current_layer = this.weights.length-1 ; current_layer >= 0 ; current_layer-- ){
			this.weights[current_layer].add(delta_weight[current_layer]);
			this.bias[current_layer].add(delta_bias[current_layer]);

		}
	}


	sigmoid(x){
		return 1 / (1 + Math.exp(-x));
	}

	loss(x){
		return (1/2) * Math.pow(x,2);
	}

	dsigmoid(x){
		return x*(1-x);
	}

	relu(x){
		return Math.max(0,x);
	}

	drelu(x){
		return (x>0) ? 1 : 0 ;
	}

	prelu(x,lr){
		return (x>0) ? x : lr*x ;
	}

	dprelu(x,lr){
		return (x>0) ? 1 : lr*x ;
	}

	linear(x){
		return x;
	}

	dlinear(x){
		return 1;
	}

	dloss(x){
		return 1*2*(1/2)*(x);
	}
		
}


