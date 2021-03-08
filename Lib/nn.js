import Matrix from './Matrix.js';

export default class NN {
	setWeights(weights){this.weights = weights;}
	setBiases(biases){this.bias = biases;}
	setLearningRate(lr){this.learning_rate = lr;}
	getWeights(){return this.weights;}
	getBiases(){return this.bias;}

	predict(input_array){

		// convert input array into matrix
		let neurons = [];
		neurons[0] = Matrix.fromArray(input_array,input_array.length,1);
		

		for (let i=0; i < this.weights.length; i++ ){
			neurons[i+1] = this.feedForward(this.weights[i],neurons[i],this.bias[i]);
		}
		
		return neurons[this.weights.length].toArray();
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