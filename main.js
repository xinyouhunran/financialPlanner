import Vue from 'vue'
import App from './App'
import store from './store'
import util from '@/utils/util.js';
import config from '@/utils/config.js';
import $api from '@/utils/http.js';

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store;
try{
	Object.keys(util).forEach(e => {
		Vue.prototype[e] = util[e];
	})
	Object.keys($api).forEach(e => {
		Vue.prototype['$' + e] = $api[e];
	})
}catch(e){
	throw e
}

const app = new Vue({
    ...App,
	store
})
app.$mount()
