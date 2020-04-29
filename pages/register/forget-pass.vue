<template>
	<view container>
		<view class="register l-flex l-flex-direction l-flex-ai_c">
			<view class="logomain">
				<image src="../../static/register-login/mainlogo.png" mode=""></image>
			</view>
			<view class="re-phone">
				<view class="">
					<image src="../../static/register-login/phone.png" mode=""></image>
				</view>
				<input type="text" v-model="userName" placeholder="请输入11位手机号" placeholder-class="placeclass" maxlength="11"/>
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
			<view class="re-phone">
				<view class="">
					<image src="../../static/register-login/pass.png" mode=""></image>
				</view>
				<template>
					<input type="text" v-model="password" placeholder="请输入6-18位英文/数字" placeholder-class="placeclass" maxlength="18" v-if="isShowPwd"/>
					<input type="password" v-model="password" placeholder="请输入6-18位英文/数字" placeholder-class="placeclass" maxlength="18" v-else/>
				</template>
				<span class="l-icon l-icon-kj" v-if="isShowPwd" @tap="isShowPwd = !isShowPwd"></span>
				<span class="l-icon l-icon-bkj" v-if="!isShowPwd" @tap="isShowPwd = !isShowPwd"></span>
			</view>
			
			<view class="next mybtn" @tap="next">
				完成
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
				isFirst:false,
				isShowPwd:false,
				password:'',
				code:'',
				serverCode:'',
				userName:'',
				phone:'',
			}
		},
		onLoad(obj) {
			this.userName = obj.userName;
		},
		mounted() {
			//this.getCodeFun();
		},
		methods: {
			getCodeFun() {
				if (this.isGetCode) {
					return
				}
				this.isGetCode = true;
				let params = {
					codeType: 1,
					contentType: 5,
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
				let password = this.password;
				let verificationCode = this.code;
				let params = null;
				let url = 'auth/resetPassword'
				//let url = 'auth/resetPassword';
				if (!verificationCode.trim()) {
					this.$toast('验证码不能为空');
					return
				}
				if(!/^\w{6,18}$/.test(password)){
					this.$toast('密码不符合要求');
					return
				}
				
				if(verificationCode!=this.serverCode){
					this.$toast('验证码输入错误');
					return
				}
				/* if (!this.password) {
					this.$toast('密码不能为空');
					return
				}
				if (this.rpassword.length < 6) {
					this.$toast('密码长度不能少于6');
					return
				} */
				/* params = {
					receiver: userName,
					password,
					verificationCode
				}; */
				
				params = {
					receiver: userName,
					password: password,
					verificationCode: verificationCode
				};
				
				this.$post(url, params, {
						isLgoin: true
					})
					.then(res => {
						if (res.code == 200) {
							this.$toast('修改密码成功',{
								fn:()=>{
									setTimeout(()=>{
										this.$back(1);
									},2000)
								}
							})		
						} else if (res.code == 404) {
							this.$toast('404')
						}
					}).catch(err => {
						this.$toast('3');
					})
			}
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
	.next{
		margin: 220rpx auto;
	}
	.codeTxt{
		color: #afafaf;
		margin-right: 52rpx;
	}
}
.l-icon-kj {
		width: 36rpx;
		min-width: 36rpx;
		height: 24rpx;
		background-image: url('~@/static/register-login/kejian@2x.png');
		margin-right: 52rpx;
	}

.l-icon-bkj {
	width: 36rpx;
	min-width: 36rpx;
	height: 16rpx;
	background-image: url('~@/static/register-login/bukejian@2x.png');
	margin-right: 52rpx;
}

</style>
