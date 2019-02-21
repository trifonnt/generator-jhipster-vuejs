const state = {
	fields: [{name:'',val: null},{name:'',val:null},{name:'',val:null},{name:'',val:null},{name:'',val:null},{name:'',val:null},{name:'',val:null}],
}

const getters = {

}

const mutations = {
	setValue(state, data) {
		state.fields[data.i].val = data.val;
	},
	setValues(state, data) {
		state.fields = data;
		state.fields[data.i].final = data.final ? true: false;
	},
	fillFields(state, fields) {
		state.fields = [...Array(fields.length)].map((el, i)=>({name:fields[i].name, val: null}))
	},
}

const actions = {

} 

export default {
	state,
	getters,
	mutations,
	actions,
}