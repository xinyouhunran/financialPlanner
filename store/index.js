import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		user:{},
	},
	getters:{
		user(state){
			return state.user;
		}
	},
	mutations:{
		setUser(state,data){
			state.user = data || {};
		}
	},
	actions:{
		setUser({commit}, data){
			commit('setUser', data);
		}
	}
})

export default store
