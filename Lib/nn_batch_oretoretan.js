import Matrix from './Matrix.js';

const fn = {
	'relu':relu,
	'sigmoid':sigmoid,
	'liniear':linear,
	'loss':loss,
	'drelu':drelu,
	'dsigmoid':dsigmoid,
	'dliniear':dlinear,
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
		neurons[0] = Matrix.fromArray(input_array,input_array.length,1);

		for (let i=0; i < this.weights.length; i++ ){
			const activation = fn[this.activationFunctions[i]];
			
			neurons[i+1] = this.feedForward(this.weights[i],neurons[i],this.bias[i],activation);
			console.table(neurons[i+1].matrix);
		}
		
		return neurons;
	}


	backwardPass(neurons,errors,targets){
		console.log(neurons);
		let i = this.weights.length;
		//for (let i = this.weights.length ; i > 0 ; i-- ){

			const derivatifnodeOut = fn['d'+this.activationFunctions[i]];
			const loss = Matrix.substract(neurons[i],targets[0]);
			const gradientLossNodeOut = Matrix.map(loss,derivatifnodeOut);
			

			const derivatifNodeIn = fn['d'+this.activationFunctions[i-1]];
			let gradientNodeIn = Matrix.map(neurons[i],derivatifNodeIn);

			const gradientNodeToWeigth_T = Matrix.transpose(neurons[i-1]);
			let gradientLossWeight = Matrix.multiplyM(gradientLossNodeOut,gradientNodeIn);
			gradientLossWeight = Matrix.multiply(gradientNodeToWeigth_T,gradientLossWeight);


			const gradientNodeToBias = this.bias[i-1];
			let gradientLossBias = Matrix.multiplyM(gradientLossNodeOut,gradientNodeIn);
			gradientLossBias = Matrix.multiplyM(gradientNodeToBias,gradientLossBias);


			let gradientLossWeightL = Matrix.multiplyN(gradientLossWeight,this.learning_rate);
			let gradientLossBiasL = Matrix.multiplyN(gradientLossBias,this.learning_rate);
			

			// update weight
			const oldWeight = this.weights[i-1];
			const oldBias = this.bias[i-1];
			this.weights[i-1] = Matrix.substract(this.weights[i-1],gradientLossWeightL);
			this.bias[i-1] = Matrix.substract(this.bias[i-1],gradientLossBiasL);
			

			
			const sum_gradientLossNodeOut = Matrix.sum(gradientLossNodeOut);
			const sum_gradientNodeIn = Matrix.sum(gradientNodeIn);
			const sum_gradientNodeToWeigth_T = Matrix.multiplyN(gradientNodeToWeigth_T,neurons[i].cols);
			const sum_oldWeight = Matrix.sum(oldWeight);

			console.log('======>');
			console.table(sum_gradientLossNodeOut.matrix);
			console.table(sum_gradientNodeIn.matrix);
			console.table(sum_gradientNodeToWeigth_T.matrix);
			console.table(sum_oldWeight.matrix);
			console.log('======>');
			
			let gradientLossNodeOut2 = Matrix.multiply(sum_gradientLossNodeOut,sum_gradientNodeIn);
			console.table(gradientLossNodeOut2.matrix);
			gradientLossNodeOut2 = Matrix.multiply(sum_gradientNodeToWeigth_T,gradientLossNodeOut2);
			console.table(gradientLossNodeOut2.matrix);
			gradientLossNodeOut2 = Matrix.multiplyM(sum_oldWeight,gradientLossNodeOut2);
			gradientLossNodeOut2 = Matrix.transpose(gradientLossNodeOut2);
			dasda
			
			const derivatifNodeIn2 = fn['d'+this.activationFunctions[i-2]];
			let gradientNodeIn2 = Matrix.map(neurons[i-1],derivatifNodeIn2);
			const gradientNodeToWeigth2_T = Matrix.transpose(neurons[i-2]);
			const gradientNodeToBias2 = this.bias[i-2];
			let gradientLossWeight2 = Matrix.multiplyM(gradientNodeIn2,gradientLossNodeOut2);
			gradientLossWeight2 = Matrix.multiply(gradientNodeToWeigth2_T,gradientLossWeight2);
			let gradientLossBias2 = Matrix.multiplyM(gradientLossNodeOut2,gradientNodeIn2);
			gradientLossBias2 = Matrix.multiplyM(gradientNodeToBias2,gradientLossBias2);
			let gradientLossWeightL2 = Matrix.multiplyN(gradientLossWeight2,this.learning_rate);
			let gradientLossBiasL2 = Matrix.multiplyN(gradientLossBias2,this.learning_rate);
			

			// update weight 2
			const oldWeight2 = this.weights[i-2];
			const oldBias2 = this.bias[i-2];
			this.weights[i-2] = Matrix.substract(this.weights[i-2],gradientLossWeightL2);
			this.bias[i-2] = Matrix.substract(this.bias[i-2],gradientLossBiasL2);
			


			const sum_gradientLossNodeOut2 = Matrix.sum(gradientLossNodeOut2);
			const sum_gradientNodeIn2 = Matrix.sum(gradientNodeIn2);
			const sum_gradientNodeToWeigth2_T = Matrix.multiplyN(gradientNodeToWeigth2_T,neurons[i-1].cols);
			const sum_oldWeight2 = Matrix.sum(oldWeight2);
			let gradientLossNodeOut3 = Matrix.multiply(sum_gradientLossNodeOut2,sum_gradientNodeIn2);
			gradientLossNodeOut3 = Matrix.multiply(sum_gradientNodeToWeigth2_T,gradientLossNodeOut3);
			console.table(sum_oldWeight2.matrix);
			console.table(gradientLossNodeOut3.matrix);
			gradientLossNodeOut3 = Matrix.multiplyM(sum_oldWeight2,gradientLossNodeOut3);
			gradientLossNodeOut3 = Matrix.transpose(gradientLossNodeOut3);
			const derivatifNodeIn3 = fn['d'+this.activationFunctions[i-3]];
			let gradientNodeIn3 = Matrix.map(neurons[i-2],derivatifNodeIn3);
			const gradientNodeToWeigth3_T = Matrix.transpose(neurons[i-3]);
			const gradientNodeToBias3 = this.bias[i-3];
			let gradientLossWeight3 = Matrix.multiplyM(gradientNodeIn3,gradientLossNodeOut3);
			gradientLossWeight3 = Matrix.multiply(gradientNodeToWeigth3_T,gradientLossWeight3);
			let gradientLossBias3 = Matrix.multiplyM(gradientLossNodeOut3,gradientNodeIn3);
			gradientLossBias3 = Matrix.multiplyM(gradientNodeToBias3,gradientLossBias3);
			let gradientLossWeightL3 = Matrix.multiplyN(gradientLossWeight3,this.learning_rate);
			let gradientLossBiasL3 = Matrix.multiplyN(gradientLossBias3,this.learning_rate);

			
			const oldWeight3 = this.weights[i-3];
			const oldBias3 = this.bias[i-3];
			this.weights[i-3] = Matrix.substract(this.weights[i-3],gradientLossWeightL3);
			this.bias[i-3] = Matrix.substract(this.bias[i-3],gradientLossBiasL3);
			console.table(this.weights[i-3].matrix);
			console.table(this.bias[i-3].matrix);
			dasda
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