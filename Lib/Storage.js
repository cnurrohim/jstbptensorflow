export function getStorage(Localstorage,parse = true){
	let storage = window.localStorage.getItem(Localstorage.name);
	
	if(!storage){
		return storage = Localstorage.default;
	}

	if(parse){
		return storage = JSON.parse(storage);
	}else{
		return storage;
	}

}

export function setStorage(Localstorage,data,stringify = true){
	if(stringify){
		window.localStorage.setItem(Localstorage.name, JSON.stringify(data));
	}else{
		window.localStorage.setItem(Localstorage.name, data);
	}
}

export const BASE_URL = 'http://localhost/JST/';

export const settingBobotClusteringStorage = {name:'clustering_settingBobot',default: [] };
export const hasilPemetaanStorage = {name:'clustering_hasilPemetaan',default: null };
export const settingClusteringStorage = {name:'clustering_setting',default: [] };
export const bobotClusteringStorage = {name:'clustering_bobot',default: [] };
export const dataClusteringStorage = {name:'clustering_Data',default: [] };
export const hasilClusteringStorage = {name:'clustering_hasil',default: [] };
export const tahunClusteringStorage = {name:'clustering_tahun',default: [] };
export const logClusteringStorage = {name:'clustering_log',default: null };

// Training
export const logTrainingStorage = {name:'training_log',default: null };
export const dataTrainingStorage = {name:'training_data',default: [] };
export const tahunTrainingStorage = {name:'training_tahun',default: [] };

export const settingTrainingStorage = {name:'training_setting',default: [] };
export const hasilTrainingStorage = {name:'training_hasil',default: null };
export const settingBobotTrainingStorage = {name:'training_settingBobot',default: null };
export const bobotTrainingStorage = {name:'training_bobot',default: [] };

export const usedSettingTrainingStorage = {name:'training_usedSetting',default: null };
export const trainingResultStorage = {name:'training_result',default: [] };

// PENGUJIAN
export const dataPengujianStorage = {name:'pengujian_data',default: [] };
export const tahunPengujianStorage = {name:'pengujian_tahun',default: [] };
export const usedSettingPengujianStorage = {name:'pengujian_usedSetting',default: [] };


export const dataInputPrediksiStorage = {name:'prediksi_inputdata',default: [] };
export const dataPrediksiStorage = {name:'prediksi_data',default: [] };
export const tahunPrediksiStorage = {name:'prediksi_tahun',default: [] };
export const usedSettingPrediksiStorage = {name:'prediksi_usedSetting',default: null };
export const minMaxPrediksiStorage = {name:'prediksi_minMax',default: null };
export const prediksiNormalisasiStorage = {name:'prediksi_dataNormalisasi',default: null };

export const hasilPrediksiStorage = {name:'prediksi_hasil',default: [] };