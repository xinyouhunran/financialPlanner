<template>
	<view class="container">
		<view class="register l-flex l-flex-direction l-flex-ai_c">
			<view class="logomain">
				<image src="../../static/register-login/mainlogo.png" mode=""></image>
			</view>
			<view class="re-phone">
				<view class="">
					<image src="../../static/register-login/pass.png" mode=""></image>
				</view>
				<template>
					<input type="text" v-model="password" placeholder="请输入6-18位英文/数字" placeholder-class="placeclass" v-if="isShowPwd"/>
					<input type="password" v-model="password" placeholder="请输入6-18位英文/数字" placeholder-class="placeclass" v-else/>
				</template>
				<span class="l-icon l-icon-kj" v-if="isShowPwd" @tap="isShowPwd = !isShowPwd"></span>
				<span class="l-icon l-icon-bkj" v-if="!isShowPwd" @tap="isShowPwd = !isShowPwd"></span>
			</view>
			<view class="login-method">
				<view class="" @tap="$nav({url:`/pages/register/vertify-login?userName=${userName}`})">
					验证码登录
				</view>
				<view class="" @tap="$nav({url:`/pages/register/register-invite?userName=${userName}`})">
					忘记密码？
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
				isShowPwd:false,
				password:'',
				userName:''
			}
		},
		onLoad(obj) {
			this.userName = obj.userName;
		},
		/* mounted() {
			this.userName = this.$route.query.userName;
		}, */
		methods: {
			next(){
				//this.$nav({url:'/pages/open-account/open-account'});
				this.submit();
			},
			submit(key) {
				let userName = this.userName;
				let password = this.password;
				if (!password.trim()) {
						this.$toast('密码不能为空');
						return
				}
				let params = null;

				let url = 'auth/login';
				params = {
					userName,
					password: password,
					storeMinutes: 0
				};
			
				this.$post(url, params, {
						isLgoin: true
					})
					.then(res => {
						if (res.code == 200) {
								/* if(!res.content.userInfo.jgInfo){
									this.$store.dispatch('register', res.content);
								} */
							this.$store.dispatch('setToken', res.content);
							this.$nav({url:"/pages/open-account/open-account"});
							//this.$nav({url:"/pages/index/index"},"switchTab");					
						} else if (res.code == 404) {
							console.log(404)
						}else{
							console.log(2)
						}
					}).catch(res => {
			
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
