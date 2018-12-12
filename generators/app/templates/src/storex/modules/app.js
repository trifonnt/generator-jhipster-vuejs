const state = {
	snackText: '',
	snackShow: false,
	snackColor: 'success',
	leftDrawer: false,
}

const getters = {}

const mutations = {
	snackShow(state, data) {
		state.snackText = data.text || '';
		state.snackShow = data.val;
		state.snackColor = data.color || "success";
	},
	setLeftDrawer(state, data) {
		state.leftDrawer = data;
	},
	changeLeftDrawer(state, data) {
		state.leftDrawer = !state.leftDrawer;
	}
}

const actions = {
	snackShowAction({state, commit}, data) {
		commit('snackShow', data);
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}