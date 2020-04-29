<template>
	<view container>
		<view class="register l-flex l-flex-direction l-flex-ai_c">
			<view class="logomain">
				<image src="../../static/register-login/mainlogo.png" mode=""></image>
			</view>
			<view class="re-phone">
				<view class="">
					<image src="../../static/register-login/vertify.png" mode=""></image>
				</view>
				<input type="text" v-model="code" placeholder="请输入验证码" placeholder-class="placeclass"/>
				<view class="codeTxt" @tap="getCodeFun">
					{{codeTxt}}
				</view>
			</view>
			<view class="login-method">
				<view class="">
					
				</view>
				<view class="" @tap="$nav({url:`/pages/register/pass-login?userName=${userName}`})">
					密码登录
				</view>
			</view>
			<view class="next mybtn" @tap="next">
				登录 
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeTxt:'获取验证码',
				downTime:60,
				isGetCode:false,
				userName:'',
				code:'',
				setInfo: 'user/center/info/update',
			}
		},
		onLoad(obj) {
			this.userName = obj.userName;
		},
		mounted() {
			this.getCodeFun();
		},
		methods: {
			getCodeFun() {
				if (this.isGetCode) {
					return
				}
				this.isGetCode = true;
				let params = {
					codeType: 1,
					contentType: 3,
					receiver: this.userName
				};
				let url = 'verify/code/phone';
				this.$get(url, params)
					.then(res => {
						if (res.code == 200) {
							this.serverCode = res.content.content;
							this.downTimeFun();
						} else if (res.code == 404) {
							this.isGetCode = false;
							this.$toast(res.message);
						} else {
							this.isGetCode = false;
						}
					}).catch(res => {
						this.isGetCode = false;
					})
			},
			downTimeFun() {

				this.codeTxt = `(${ this.downTime }s)`;
				this.interval = setInterval(() => {
					if (this.downTime <= 1) {
						clearInterval(this.interval);
						this.codeTxt = '重新获取';
						this.downTime = 60;
						this.isGetCode = false;

					} else {
						--this.downTime
						this.codeTxt = `(${ this.downTime }s)`;
					}
				}, 1000)
			},
			next(){
				this.submit();
			},
			submit(){
				let userName = this.userName;
				let verificationCode = this.code;
				let params = null;
			
				if (!verificationCode.trim()) {
					this.$toast('验证码不能为空');
					return
				}
				
				if(verificationCode!=this.serverCode){
					this.$toast('验证码输入错误');
					return
				}
				let url = 'auth/register';
				/* if (!this.password) {
					this.$toast('密码不能为空');
					return
				}
				if (this.rpassword.length < 6) {
					this.$toast('密码长度不能少于6');
					return
				} */
				params = {
					phone: userName,
					verificationCode: verificationCode
				};
				
				this.$post(url, params, {
						isLgoin: true
					})
					.then(res => {
						if (res.code == 200) {
							this.$store.dispatch('setToken', res.content);
							this.$store.dispatch('setUser',res.content)
							.then(data=>{
								if(typeof this.$getStorage('user')==='object'){
									let user = this.$getStorage('user').userInfo;
									let userId = user.id;
									this.$post('user/openAccount/getUserOpenAccountInfo',{
										userId
									}).then(data=>{
										if(data.code=='200'){
											this.$nav({url:'/pages/index/index'},'switchTab');
										}else{
											this.$nav({url:"/pages/open-account/open-account"});
										}
									}).catch(err=>{
										this.$toast(JSON.stringify(err))
									})
								}else{
									this.$toast('您还未登录，即将跳转登录页',{
										fn:()=>{
											this.$nav({url:'/pages/register/register'});
										}
									});
								}
								
							}).catch(err=>{
								console.log('err');
							})
							/* if(!res.content.userInfo.jgInfo){
								this.up();
								this.$store.dispatch('register', res.content);
							} */
							//this.$nav({url:"/pages/open-account/open-account"});
						} else if (res.code == 404) {
							console.log('404')
						}
					}).catch(res => {
				
					})
			},
			/**
			 * 注册im
			 */
			up(){
				let params = { jgInfo:true };
				let url = this.setInfo;
				this.$post(url, params)
					.then(res => {
						if (res.code == 200) {}
					})
			},
		}
	}
</script>

<style scoped lang="scss">
.register{
	.re-phone{
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		width: 670rpx;
		height: 90rpx;
		border: 1px solid #EDEDED;
		border-radius: 44rpx;
		image{
			width: 28rpx;
			height: 32rpx;
			margin-left: 52rpx;
			margin-right: 30rpx;
		}
		input{
			flex: 1;
			font-size: 15px;
		}
		.placeclass{
			color: #afafaf;
			font-size: 15px;
		}
	}
	.login-method{
		display: flex;
		justify-content: space-between;
		color: #828282;
		font-size: 28rpx;
		margin-top: 40rpx;
		width: 670rpx;
	}
	.next{
		margin: 220rpx auto;
	}
	.codeTxt{
		color: #afafaf;
		margin-right: 52rpx;
	}
}

</style>
