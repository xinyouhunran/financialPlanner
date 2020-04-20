import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils/http.js'
import util from '../utils/util.js'

import jpushIM from "../common/im.js"
Vue.use(Vuex)

let getters = {
	token(state) {
		return state.token;
	},
	level(state) {
		return state.user.level || 0;
	},
	user(state) {
		return state.user;
	},
	navLoginBottom(state){
		return state.navLoginBottom;
	},
	hasLogin(state){
		return state.hasLogin;
	},
	qualified(state){
		return state.qualified;
	},
	service(state){
		return state.service;
	},
	msgNum(state){
		return state.msgNum;
	},
	conversations(state){
		return state.conversations;
	},
	fundAccount0(state){
		return state.fundAccount0
	}
}
const store = new Vuex.Store({
	state: {
		user:{},
		token:'',
		msgNum: 0,
		service: [],
		qualified: false,
		hasLogin: false,
		conversations:[],
		loginProvider: "",	// 用户名或其他唯一值
		nickname:"",// 昵称
		signature:"",// 签名
		avatar:"/static/img/face.jpg",	// 头像
		gender:"",	// 性别，0未知，1男，2女
		openid: null,
		fundAccount0: {},
		testvuex:false,
		graceIMMsgs   : {},
		graceIMScTop  : 0,
		navLoginBottom: 100,
		receiveMessage:{},	// 接收新消息
		loginStateChanged:{},	// 登录状态变更
		sendMessageResponse:{},	// 消息发送结果回执
	},
	getters,
	mutations:{
		register(state, data){
			state.hasLogin = true;
			state.user = data.userInfo || {};
			var params = {
				"username": data.userId,
				"password": data.userId,
				"nickname": data.realName ||  data.userName,
			}
			/* jpushIM.userRegister(params, (res) => {
				if(res.errorCode == 0){
					loginIm();
				}else{}
			})	 */
		},
		setUser(state, data){
			state.user = data.userInfo || {};
			state.fundAccount0 = data.fundAccount0 || {};
			state.hasLogin = true;
			state.loginProvider = data.userInfo && data.userInfo.id || ''; // 用户名
			//loginIm();
			util.$setStorage('user', data);
		},
		setToken(state, data){
			state.token = data.token || '';
			state.hasLogin = true;
			state.fundAccount0 = data.fundAccount0 || {};
			state.user = data.userInfo || {};
			state.loginProvider = data.userInfo && data.userInfo.id; // 用户名
			state.qualified = data.qualified;
			util.$setStorage('token', state.token);
			//loginIm();
		},
		login(state){
			let params = {
				username: state.user.id,
				password: state.user.id
			};
			jpushIM.userLogin(params, (res) => {
				if(res.errorCode == 0){
					checkCurrentIMUser();
					getConversations();
				}else{}
			})
		},
		setConversations(state, data){
			state.conversations = data || [];
		},
		logout(state) {
			util.$setStorage('token','');
			util.$setStorage('user','');
			state.token = ''
			state.user = {};
			state.conversations = [];
			state.qualified = false;
			state.hasLogin = false;
			/* jpushIM.logout((res) => {
				state.loginProvider = "";
				state.openid = null;
				state.avatar = "";
			}) */
		},
		setMsgNum(state, data) {
			let res =  parseFloat(data || 0)
			state.msgNum = res > 0 ? res : 0 ;
			if(state.msgNum < 1 || !state.hasLogin){
				uni.removeTabBarBadge({
					index:1
				})
			}else{
				uni.setTabBarBadge({
					index:1,
					text:res.toString()
				})
			}
			jpushIM.setBadge(res);
		},
	},
	actions:{
		downloadApp(){
			// #ifdef H5
			util.$showModal('该功能正在开发中,欲使用该功能请去下载App体验',{
				confirmText:'前往下载',
				success(){
					util.$nav({ url: '/pages/download/download' })
				}
			})
			// #endif
		},
		setUser({commit}, data){
			commit('setUser', data);
		},
		setToken({commit}, data){
			commit('setToken', data);
		},
		register({commit}, data){
			commit('register', data);
		},
		logout({commit}, data){
			commit('logout', data);
		},
		getUserFn(){
			getUser();
		},
		
	}
})

function getUser(){
	let params = {}
	let url = 'user/center/getUserInfoByAuthToken';
	
	http.get(url, params)
	.then(res => {
		if(res.code == 200){
			let data = res.content || {};
			if(data.userInfo){
				store.state.qualified = data.qualified;
				store.dispatch('setUser', data);
			}
		}
	})
}

export default store
