import base from './config';
import util from './util';

const $api = {
	// 正常请求
	get: function(url, data, option = {}) {
		let param = data ? data : {};
		/* if (util.$getStorage('token')) {
			param.userAuthToken = util.$getStorage('token');
		}
		param.frequentNo = +new Date(); */
		return new Promise((resolve, reject) => {
			uni.request({
				url: (option.baseUrl ? option.baseUrl : base.$baseUrl) + url,
				data: param,
				header: {
					'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				method: 'GET',
				success(res) {
					resolve(res.data);
					/* if (res.data && res.data.code == '200') {
						resolve(res.data)
					} else {
						if (res.data && res.data.code == '404' && option.isLogin) {
							resolve(res.data);
						} else {
							if (res.data.code == '401') {
								util.$setStorage('token', '');
								util.$toast('您还未登录');
								return
							}
							if (res.data.code == '408') {
								util.$toast('您还未登录');
								reject(res, 408);
								return
							}
							util.$toast(res.data.message);
							resolve(res.data);
						}
					} */
				},
				fail(err) {
					util.$toast('请求失败');
					reject(err, -1);
				},
				complete(res) {
					reject(res, 0);
				}
			})
		})
	},
	// 正常请求
	post: function(url, data, option = {}) {
		let param = data ? data : {};
		if (util.$getStorage('token')) {
			param.userAuthToken = util.$getStorage('token');
		}
		param.frequentNo = +new Date();
		return new Promise((resolve, reject) => {
			uni.request({
				url: (option.baseUrl ? option.baseUrl : base.$baseUrl) + url,
				data: param,
				header: {
					'content-type': 'application/json;charset=UTF-8'
				},
				method: 'POST',
				success(res) {
					if (res.data && res.data.code == '200') {
						resolve(res.data)
					} else {
						if (res.data && res.data.code == '404') {
							resolve(res.data);
						} else {
							if (res.data.code == '401') {
								util.$setStorage('token', '');
								util.$toast('您还未登录');
								return
							}
							util.$toast(res.data.message);
							resolve(res.data);
						}
					}
				},
				fail(err) {
					util.$toast('请求失败');
					reject(err, -1);
				},
				complete(res) {
					reject(res, 0);
				}
			})
		})
	},
	// 上传文件
	upload: function(url, filePaths, option = {}) {
		option.formData = option.formData ? option.formData : {};
		if (util.$getStorage('token')) {
			option.formData.userAuthToken = util.$getStorage('token');
		}
		option.formData.frequentNo = +new Date();
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: (option.baseUrl ? option.baseUrl : base.$baseUrl) + url,
				filePath: filePaths,
				fileType: option.fileType ? option.fileType : 'image',
				name: option.name ? option.name : 'img',
				formData: option.formData,
				success(res) {
					console.log(res)
					let data = {};
					if (res.data) {
						if (typeof res.data === 'string') {
							try {
								data = JSON.parse(res.data);
							} catch (e) {
								//TODO handle the exception
							}
						} else {
							data = res.data;
						}
					}
					if (data.code == '200') {
						// option.success(data)
						resolve(data)
					} else {
						util.$toast(data.message);
						resolve(data);
						// option.error && option.error(1,data);
					}
				},
				fail(err) {
					console.log(err)
					util.$toast('上传失败');
					reject(err, -1);
				},
				complete(res) {
					reject(res, 0);
				}
			})
		})
	}
}

export default $api
