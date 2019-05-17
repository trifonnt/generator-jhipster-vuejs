const state = {
	fields: [{name:'',val: null},{name:'',val:null},{name:'',val:null},{name:'',val:null},{name:'',val:null},{name:'',val:null},{name:'',val:null}],
}

const getters = {

}

const mutations = {
	setValue(state, data) {
		state.fields[data.i].val = data.val;
		state.fields[data.i].final = data.final ? true: false;
	},
	editField(state, data) {
		state.fields.find(o=>o.name == data.name).edit = data.edit;
	},
	setValues(state, data) {
		state.fields = data;
	},
	fillFields(state, fields) {
		state.fields = [...Array(fields.length)].map((el, i)=>({name:fields[i].name, val: null, edit: false}))
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