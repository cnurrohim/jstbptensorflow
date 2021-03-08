import Matrix from './Matrix.js';

export default class NN {
	setWeights(weights){
		this.weights = weights;
	}
	
	setBiases(biases){
		this.bias = biases;
	}

	setLearningRate(lr){
		this.learning_rate = lr;
	}

	getWeights(){
		return this.weights;
	}

	getBiases(){
		return this.bias;
	}

	predict(input_array){

		// convert input array into matrix
		let neurons = [];
		neurons[0] = Matrix.fromArray(input_array,input_array.length,1);
		

		for (let i=0; i < this.weights.length; i++ ){
			neurons[i+1] = this.feedForward(this.weights[i],neurons[i],this.bias[i]);
		}
		
		return neurons[this.weights.length].toArray();
	}

	train(input_array,target_array){
		let neurons = [];
		let errors = [];
		let targets = Matrix.fromArray(target_array,target_array.length,1);
		neurons[0] = Matrix.fromArray(input_array,input_array.length,1);
		

		for (let i=0; i < this.weights.length; i++ ){
			neurons[i+1] = this.feedForward(this.weights[i],neurons[i],this.bias[i]);
		}
		let outputs = neurons[this.weights.length];

		/*      BACK-PROPAGATION         */			
		//calculate errors
		errors[this.weights.length] = Matrix.substract(targets,outputs);
		// 2
		for (let i = this.weights.length ; i > 0 ; i-- ){
			
			let outputHidden = this.backward(neurons[i],errors[i],neurons[i-1]);
			this.weights[i-1].add(outputHidden.delta_w);
			this.bias[i-1].add(outputHidden.gradient);

			let who_t = Matrix.transpose(this.weights[i-1]);
			errors[i-1] = Matrix.multiply(who_t,errors[i]);

		}

		return errors[this.weights.length].toArray();
	}


	backward(front_nodes,errors,back_nodes){
		let gradient = Matrix.map(front_nodes,dsigmoid);
		gradient.multiplyM(errors);
		gradient.multiplyN(this.learning_rate);

		
		let nodes_t = Matrix.transpose(back_nodes);
		let delta_w = Matrix.multiply(gradient,nodes_t);
		
		return {delta_w,gradient}	
	}

	feedForward(weights,inputs,bias){
		// multiply weights matrix with inputs matrix
		
		let nodes = Matrix.multiply(weights,inputs);
		
		// adding bias into every element hidden matrix
		
		nodes.add(bias);
		// activation function
		nodes.map(sigmoid);

		return nodes;
	}

		
}

function sigmoid(x){
	return 1 / (1 + Math.pow(Math.E,-x));
}

function dsigmoid(x){
	return x*(1-x);
}