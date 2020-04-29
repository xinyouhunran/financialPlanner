import api from './http.js';
import util from './util';

export const geth5 = (flag,userId,option)=>{
	let url = 'user/openAccount/skipAllinpayH5Page';
	let params = {
		flag,
		userId
	}
	return new Promise((resolve,reject)=>{
		api.post(url,params)
		.then(data=>{
			if(data.code=='200'){
				resolve(data.content)
			}else{
				
				if(data.code=='307'){
					util.$toast('您还未开户，即将跳转到开户页',{
						fn:()=>{
							setTimeout(()=>{
								util.$nav({
									url:'/pages/open-account/open-account',
								})
							},3000)						
						}
					});		
				}
			}
		}).catch(err=>{
			util.$toast(JSON.stringify(err))
		})
	})
}
