import Matrix from './Lib/Matrix.js';
import NN from './Lib/nn.js';

const inputs = [0.254404145,0.40305712,0.496012101,0.468046805,0.418141593];


const bobot1 = [
	-1.4040548,-0.42986,0.5123453,0.7904539,0.5751429,-1.2111855,0.9111618,
	2.0255342,3.8575215,-2.9368126,-3.4159303,-2.9011233,1.3776344,-3.8832009,
	-3.4033949,-1.2104299,0.2653548,0.7450312,0.7892892,-2.3987124,0.4608931,
	-0.0970663,-0.3173516,-1.3193469,-1.3990091,-2.0219028,0.2483169,-1.7005382,
	3.5495102,3.1952782,-2.7136102,-3.0470297,-2.7294681,3.6419182,-3.0743334
];




const bobot2 = [
	1.185577,-2.904582,0.6228819,1.0497098,
	1.2001588,0.3547027,-0.6010733,2.3080101,
	-1.5927072,0.663828,-1.077903,-1.6924944,
	-1.6411086,1.9023156,-1.2701885,-2.4250104,
	-1.5699937,2.4915457,-0.8319123,-2.2867582,
	0.5960299,-1.9967656,-0.1528736,1.3135579,
	-2.2140746,1.9158958,-1.6556929,-2.8756435
];

const bobot3 = [
	0.8012836,
	-1.7249656,
	0.194618,
	2.000576,
];

const bias1 = [-1.5191615,-1.216866,0.4441164,0.6125144,0.6113034,-1.72875,0.8471132];
const bias2 = [-0.54884,1.0716671,-1.0603007,0.3617362];
const bias3 = [-0.2063064];


const mBobot1 = Matrix.fromArray(bobot1,5,7);
const mBobot2 = Matrix.fromArray(bobot2,7,4);
const mBobot3 = Matrix.fromArray(bobot3,4,1);

const mbias1 = Matrix.fromArray(bias1,1,7);
const mbias2 = Matrix.fromArray(bias2,1,4);
const mbias3 = Matrix.fromArray(bias3,1,1);

const bobot1_T = Matrix.transpose(mBobot1);
const bobot2_T = Matrix.transpose(mBobot2);
const bobot3_T = Matrix.transpose(mBobot3);
console.table(bobot1_T.matrix);
console.table(bobot2_T.matrix);
console.table(bobot3_T.matrix);

const mbias1_T = Matrix.transpose(mbias1);
const mbias2_T = Matrix.transpose(mbias2);
const mbias3_T = Matrix.transpose(mbias3);

console.table(mbias1.matrix);
console.table(mbias2.matrix);
console.table(mbias3.matrix);


const bobot = [bobot1_T,bobot2_T,bobot3_T];
const bias = [mbias1_T,mbias2_T,mbias3_T];

const nn = new NN();

nn.setWeights(bobot);
nn.setBiases(bias);
const hasil = nn.predict(inputs);
console.log(hasil);
	

