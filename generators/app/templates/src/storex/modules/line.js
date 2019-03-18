const state = {
	lines: [{name: '', name1: '',  name2: '',},{name: '', name1: '',  name2: '',}],
}

const getters = {

}

const mutations = {
	setLineValue(state, data) {
		let line = state.lines[data.i].map({[data.name]: data.value});
		if(line === undefined) state.lines.push(line);
		line = data.obj; 
	},
	setNullLine(state, i) {
		state[i].splice(i, 1)
	},
	fillLines(state, lines) {
		state.lines = [...Array(lines.length)].map((el, i)=>({[lines[i].name]: ''}))
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