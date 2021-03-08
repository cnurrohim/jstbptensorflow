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
			const activation = fn[this.activationFunctions[i]];
			
			neurons[i+1] = this.feedForward(this.weights[i],neurons[i],this.bias[i],activation);
			
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

		for (let num_layer = this.weights.length ; num_layer > 0 ; num_layer-- ){

			const is_lastLayer = (num_layer == this.weights.length);
			const num_headLayer = num_layer;
			const num_currentLayer = num_layer-1;

			GL_headNode = (is_lastLayer)
							? this.gradientLossOutput(num_headLayer,neurons,targets)
							: this.gradientLossHeadNode(oldWeight,GL_headNode,G_node,neurons,num_headLayer,num_currentLayer);

			G_node = this.gradientLayer(num_headLayer,num_currentLayer,neurons);
			GL_weight = this.gradientWeightLoss(GL_headNode,G_node,neurons,num_currentLayer);
			GL_bias = this.gradientBiasLoss(GL_headNode,G_node,num_currentLayer);

			GL_weight_LR = Matrix.multiplyN(GL_weight,this.learning_rate);
			GL_bias_LR = Matrix.multiplyN(GL_bias,this.learning_rate);

			oldWeight = this.weights[num_currentLayer];
			oldBias = this.bias[num_currentLayer];

			this.updateWeight(GL_weight_LR,GL_bias_LR,num_currentLayer);
		}
	}

	
	gradientLossHeadNode(oldWeight,GL_headNode,G_node,neurons,num_headLayer,num_currentLayer){
		const T_previousNeurons = Matrix.transpose(neurons[num_currentLayer+1]);

		const sum_GL_headNode = Matrix.sum(GL_headNode);
		const sum_G_node = Matrix.sum(G_node);
		const sum_G_nodeWeight = Matrix.multiplyN(T_previousNeurons,neurons[num_headLayer+1].cols);
		const sum_oldWeight = Matrix.sum(oldWeight);

		let new_GL_headNode = Matrix.multiply(sum_GL_headNode,sum_G_node);
		new_GL_headNode = Matrix.multiply(sum_G_nodeWeight,new_GL_headNode);
		new_GL_headNode = Matrix.multiplyM(sum_oldWeight,new_GL_headNode);
		new_GL_headNode = Matrix.transpose(new_GL_headNode);
	
		return new_GL_headNode;
	}

	updateWeight(GL_weight_LR,GL_bias_LR,num_currentLayer){
		this.weights[num_currentLayer] = Matrix.substract(this.weights[num_currentLayer],GL_weight_LR);
		this.bias[num_currentLayer] = Matrix.substract(this.bias[num_currentLayer],GL_bias_LR);
	}

	gradientBiasLoss(gradientLossNodeOut,gradientNodeIn,num_currentLayer){
		const bias = this.bias[num_currentLayer];

		let GL_bias = Matrix.multiplyM(gradientLossNodeOut,gradientNodeIn);
		GL_bias = Matrix.multiplyM(bias,GL_bias);

		return GL_bias;
	}

	gradientWeightLoss(gradientLossNodeOut,gradientNodeIn,neurons,num_currentLayer){
		const T_neurons = Matrix.transpose(neurons[num_currentLayer]);
		
		let GL_weight = Matrix.multiplyM(gradientLossNodeOut,gradientNodeIn);
		GL_weight = Matrix.multiply(T_neurons,GL_weight);

		return GL_weight;
	}

	gradientLayer(num_headLayer,num_currentLayer,neurons){
		const DF = fn['d'+this.activationFunctions[num_currentLayer]];
		let G_node = Matrix.map(neurons[num_headLayer],DF);

		return G_node;
	}

	gradientLossOutput(num_outputLayer,neurons,targets){
		const DF = fn['d'+this.activationFunctions[num_outputLayer]];
		
		const loss = Matrix.substract(neurons[num_outputLayer],targets);
		const GL = Matrix.map(loss,DF);

		return 	GL;
	}


	feedForward(weights,inputs,bias,activationFunction){
		// multiply weights matrix with inputs matrix
		
		let nodes = Matrix.multiply(inputs,weights);
		nodes.add(bias);
		
		
		// activation function
		nodes.map(activationFunction);

		return nodes;
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