import Matrix from './Matrix.js';

export default class NeuralNetwork {
	setWeights(weights){
		this.weights = weights;
	}
	
	setBiases(biases){
		this.bias = biases;
	}

	setLearningRate(lr){	
		this.learning_rate = lr;
	}

	forward(input_array){
		this.neuron = [];
		// convert input array into matrix
		let nodes = Matrix.fromArray(input_array,input_array.length,1);
		
		this.neuron.push(nodes);
		
		for (let i=0; i < this.weights.length; i++ ){
			nodes = this.feedForward(this.weights[i],nodes,this.bias[i]);
			this.neuron.push(nodes);
			
		}

		return nodes;
	}

	predict(input_array){
		let nodes = Matrix.fromArray(input_array,input_array.length,1);
		
		for (let i=0; i < this.weights.length; i++ ){
			nodes = this.feedForward(this.weights[i],nodes,this.bias[i]);
		}

		return nodes.toArray();
	}

	train(input_array,target_array){
		
		let targets = Matrix.fromArray(target_array,target_array.length,1);
		let inputs = Matrix.fromArray(input_array,input_array.length,1);
		

		
		let outputs = this.forward(input_array);
		

		// squared errors
		let errors = Matrix.substract(targets,outputs);
		
		
		let gradient_errors = Matrix.substract(targets,outputs);

		let ouputHidden = {};
		let who_t = {};
		for (let i=this.neuron.length - 1; i >= 0; i-- ){
			
			if(this.neuron[i-1]){


				ouputHidden = this.backward(this.neuron[i],gradient_errors,this.neuron[i-1],this.bias[i-1]);
				
				this.weights[i-1].add(ouputHidden.delta_w);
				this.bias[i-1].add(ouputHidden.gradient);
				who_t = Matrix.transpose(this.weights[i-1]);
				gradient_errors = Matrix.multiply(who_t,gradient_errors);

			}
			
		}

		return errors.toArray();
	}

	getWeights(){
		return this.weights;
	}

	getBiases(){
		return this.bias;
	}

	backward(current_nodes,errors,prev_nodes,prev_bias){
		let gradient = Matrix.map(current_nodes,dsigmoid);
		gradient.multiplyM(errors);
	
		let nodes_t = Matrix.transpose(prev_nodes);

		let delta_w = Matrix.multiply(gradient,nodes_t);
		delta_w.multiplyN(this.learning_rate);
		return {delta_w,gradient}	
	}

	feedForward(weights,prevNodes,bias){
		let nextNodes = Matrix.multiply(weights,prevNodes);
		
		nextNodes.add(bias);
		nextNodes.map(sigmoid);

		return nextNodes;
	}

}

function sigmoid(x){
	return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x){
	return x*(1-x);
}

function relu(x){
	return Math.max(0,x);
}

function drelu(x){
	return (x > 0) ? 1 : 0;
}

function power(x){
	return Math.pow(x,2);
}