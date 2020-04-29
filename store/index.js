import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils/http.js'
import util from '../utils/util.js'

// #ifdef APP-PLUS
import jpushIM from "../common/im.js"
// #endif
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
	employmentCertStatus(state){
		return state.employmentCertStatus;
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
		employmentCertStatus:null,
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
			// #ifdef APP-PLUS
			/* jpushIM.userRegister(params, (res) => {
				if(res.errorCode == 0){
					loginIm();
				}else{}
			}) */
			// #endif
		},
		setUser(state, data){
			state.user = data.userInfo || {};
			state.fundAccount0 = data.fundAccount0 || {};
			state.hasLogin = true;
			state.loginProvider = data.userInfo && data.userInfo.id || ''; // 用户名
			state.qualified = data.qualified || false;
			state.employmentCertStatus = data.employmentCertStatus || null;
			loginIm();
			util.$setStorage('user', data);
		},
		setToken(state, data){
			state.token = data.token || '';
			state.hasLogin = true;
			state.fundAccount0 = data.fundAccount0 || {};
			state.user = data.userInfo || {};
			state.loginProvider = data.userInfo && data.userInfo.id; // 用户名
			state.qualified = data.qualified || false;
			state.employmentCertStatus = data.employmentCertStatus || null;
			util.$setStorage('token', state.token);
			loginIm();
		},
		login(state){
			// #ifdef H5
			return
			// #endif
			let params = {
				username: state.user.id,
				password: state.user.id
			};
			/* jpushIM.userLogin(params, (res) => {
				if(res.errorCode == 0){
					checkCurrentIMUser();
					getConversations();
				}else{}
			}) */
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
			// #ifdef APP-PLUS
			/* jpushIM.logout((res) => {
				state.loginProvider = "";
				state.openid = null;
				state.avatar = "";
			}) */
			// #endif
		},
		setNavLoginBottom(state, height){
			state.navLoginBottom = height;
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		setMsgNum(state, data) {
			let res =  parseFloat(data || 0)
			state.msgNum = res > 0 ? res : 0 ;
			/* if(state.msgNum < 1 || !state.hasLogin){
				uni.removeTabBarBadge({
					index:1
				})
			}else{
				uni.setTabBarBadge({
					index:1,
					text:res.toString()
				})
			} */
			// #ifdef APP-PLUS
			//jpushIM.setBadge(res);
			// #endif
		},
		// 赋值登录名或唯一登录值
		setLoginProvider(state,val){
			state.loginProvider = val || state.user.id;
		},
		// 赋值昵称
		setNickname(state,val){
			// console.log("setNickname：" + val);
			state.nickname = val || state.user.realName || state.user.userName
		},
		// 赋值性别
		setGender(state,val){
			state.gender = val
		},
		// 赋值个人签名
		setSignature(state,val){
			state.signature = val
		},
		// 赋值头像
		setAvatar(state,val){
			state.avatar = val
		},
		// 赋值接收到的消息
		setReceiveMessage(state,param){
			state.receiveMessage = param;
		},
		// 用户登录状态
		setLoginStateChanged(state,param){
			state.loginStateChanged = param;
		},
		// 消息发送结果回执
		setSendMessageResponse(state,param){
			state.sendMessageResponse = param;
		},
		setService(state, data){
			state.service = data || [];
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
		setMsgNum({commit}, data){
			commit('setMsgNum', data);
		},
		logout({commit}, data){
			commit('logout', data);
		},
		setService({commit}, data){
			commit('setService', data);
		},
		login({commit}, data){
			commit('login');
		},
		register({commit}, data){
			commit('register', data);
		},
		setUser({commit}, data){
			commit('setUser', data);
		},
		setToken({commit}, data){
			commit('setToken', data);
		},
		setConversations({commit}, data){
			commit('setConversations', data);
		},
		getUserFn(){
			getUser();
		},
		getService(){
			getService()
		},
		getAllUnreadCount(){
			getAllUnreadCount()
		},
		getConversations(){
			getConversations()
		},
		onChat({commit}, data){
			onChat(data)
		},
		// 提交聊天文字信息
		submitChatMsg: async function({
			commit,
			state,
			rootState
		}, params) {
			return await new Promise((resolve, reject) => {
				if (!state.hasLogin) {
					reject("请先登录")
				} else {
					switch (params.msgType) {
						case "text":
							// 文本消息
							delete(params["msgType"]);
							jpushIM.sendTextMessage(params, (res) => {
								if (res.errorCode == 0) {
									uni.showModal({
										title: '发送消息返回',
										content: '',
										showCancel: false,
										cancelText: '',
										confirmText: '',
										success: res => {},
										fail: () => {},
										complete: () => {}
									});
									resolve(res.data);
								} else {
									reject(res.errorMsg);
								}
							})
							break;
						case "image":
							// 图片消息
							// 将本地URL路径转换成绝对路径
							params.path = plus.io.convertLocalFileSystemURL(params.path);
							delete(params["msgType"]);
							jpushIM.sendImageMessage(params, (res) => {
								if (res.errorCode == 0) {
									resolve(res.data);
								} else {
									reject(res.errorMsg);
								}
							});
							break;
						case "voice":
							// 语音消息
							params.path = plus.io.convertLocalFileSystemURL(params.path);
							delete(params["msgType"]);
							// console.log("JMessagePlugin 发送语音消息:" + JSON.stringify(params));
							jpushIM.sendVoiceMessage(params, (res) => {
								if (res.errorCode == 0) {
									resolve(res.data);
								} else {
									reject(res.errorMsg);
								}
							});
							break;
						default:
							break;
					}
		
				}
			})
		},
		// 获取当前IM用户信息是否存在，存在则登录commit, state,rootState
		// 不用传参
		checkCurrentIMUser: async function({
			dispatch,
			commit
		}, params) {
			return await new Promise((resolve, reject) => {
				jpushIM.getMyInfo((res) => {
					if (res.errorCode == 0) {
						var data = res.data;
						commit('setLoginProvider', data.username);
						commit('setNickname', data.nickname);
						commit('setGender', data.gender);
						commit('setSignature', data.signature);
						commit('setAvatar', data.avatar);
						resolve(data);
					} else {
						reject(res.errorMsg);
					}
				})
			})
		},
		/**
		 * 更新我的头像
		 * @param {object} params = {
		 *  imgPath: string // 相册/拍照后的图片路径。
		 * }
		 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',data:null}) {}
		 */
		updateMyAvatar: async function({
			commit,
			state,
			rootState
		}, params) {
			return await new Promise((resolve, reject) => {
				var origin = params.imgPath;
				if (origin) {
					// 将本地URL路径转换成平台绝对路径
					params.imgPath = plus.io.convertLocalFileSystemURL(params.imgPath);
				}
				jpushIM.updateMyAvatar(params, (res) => {
					if (res.errorCode == 0) {
						// var path = plus.io.convertAbsoluteFileSystem(params.imgPath);
						commit('setAvatar', origin);
						resolve(res);
					} else {
						reject(res.errorMsg);
					}
				})
			})
		},
		onService({ commit, state,rootState }, label){
			let service =  state.service;
			let list = service.filter(e => e.labelName == label);
			if(list.length){
				let bool = true;
				for (var i = 0; i < list.length; i++) {
					let e = list[i]
					if(e.onlineState && e.onlineState > 0){
						onChat(e);
						bool = false
						break
					}
				}
				if(bool){
					onChat(list[0]);
				}
			}else{
				util.$toast('暂无客服')
			}
		}
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

function getService(){
	let params = {};
	let url = 'customer/official/service/users';
	http.get(url, params)
	.then(res => {
		if(res.code == 200){
			let data = res.content || [];
			store.dispatch('setService', data);
		}
	})
}

function getAllUnreadCount(){
	// #ifdef APP-PLUS
		/* jpushIM.getAllUnreadCount(function(res) {
			store.dispatch("setMsgNum", res);
		}) */
	// #endif
}

function getConversations(){
	// #ifdef APP-PLUS
	/* 	jpushIM.getConversations((callback) => {
				store.dispatch('setConversations', callback)
			}) */
	// #endif
}

function onChat(s){
	// #ifdef H5
	store.dispatch('downloadApp')
	return
	// #endif
	if(!store.getters.hasLogin) {
		util.$toast('您还未登录');
		return
	}
	if(!store.getters.user.idNo) {
		util.$toast('您还未进行实名认证');
		return
	}
	var chatUser = s ? s.userId : store.getters.service[0].userId;
	if(store.getters.user.id === s.userId){
		util.$toast('不能跟自己聊天');
		return
	}
	/* jpushIM.skipToSingleChat(chatUser, (res) => {
		// console.log(JSON.stringify(res));
		var data = res.data;
		let fromUser = data.fromUser
		util.$nav({
			url: '/pages/im-chat/im-chat?title=' + (fromUser.nickname || data.title) + '&fromUser=' + fromUser.username
		})
	}, (err) => {
		if(err.errorMsg){
			util.$toast(err.errorMsg)
		}
		
	}) */
}

function checkCurrentIMUser(){
	store.dispatch("checkCurrentIMUser").then(response => {})
}

function loginIm(){
	store.dispatch('login');
}

export default store
