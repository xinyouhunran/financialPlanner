<template>
	<view class="container">
		<view class="mine">
			<view class="l-status"></view>
	
			<span class="l-icon l-icon-message">
				<!-- <view class="ubt" @tap="$nav({url:'/pages/notification/notification'})">7</view> -->
			</span>
			<view class="l-flex mine-head l-flex-ai_c">
				<image :src="user.headPortrait ? user.headPortrait :'../../static/finance/tx@3x.png'" mode="aspectFill" @tap="getImage"></image>
				<view class="l-flex l-flex-direction l-flex-1" v-if="hasLogin">
					<view class="l-flex">
						<view class="l-p">
							{{ user.fullName || user.userName }}
						</view>
						<view class="l-span" v-if="user.invite">
							邀请码:23ue6
						</view>
					</view>
					<view class="l-flex l-flex-jc_sb l-phone">
						<view class="">
							{{user.orgName || '--'}}
						</view>
						<view class="l-flex l-flex-ai_c" @tap="$nav({url:'/pages/mine/person-main'})">
							<view>
								个人主页
							</view>
							<view>
								<image src="../../static/mine/rightwhite.png" mode=""></image>
							</view>
						</view>
					</view>				
				</view>
				
				<view class="gologin" v-else @tap="$nav({url:'/pages/register/register'})">
					登录/注册
				</view>
			</view>
		</view>
		
		<view class="one-line" @tap="goAssetOverview">
			<view class="line-operation">
				<view class="l-flex l-flex-ai_c left">
					<image src="../../static/mine/zc@2x.png" mode="aspectFill"></image>
					<view class="">
						资产总览 
					</view>
				</view>
				<view class="l-flex l-flex-ai_c right">
					<!-- <view class="">
						{{hasLogin?'0.16':''}}
					</view> -->
					<image src="../../static/right@2x.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		
		<view class="four-line">
			<view class="line-operation l-bb" @tap="goAttention">
				<view class="l-flex l-flex-ai_c left">
					<image src="../../static/mine/gz@2x.png" mode="aspectFill"></image>
					<view class="">
						我的关注
					</view>
				</view>
				<view class="l-flex l-flex-ai_c right">
					<view class="">
						
					</view>
					<image src="../../static/right@2x.png" mode="aspectFill"></image>
				</view>
			</view>
			<!-- <view class="line-operation">
				<view class="l-flex l-flex-ai_c left">
					<image src="../../static/mine/ht@2x.png" mode="aspectFill"></image>
					<view class="">
						电子合同
					</view>
				</view>
				<view class="l-flex l-flex-ai_c right">
					<image src="../../static/right@2x.png" mode="aspectFill"></image>
				</view>
			</view> -->
		</view>
		
		<view class="three-line">
			<view class="l-bb title">
				金融从业者
			</view>
			<view class="line-operation" @tap="goFinancialInstitution">
				<view class="l-flex l-flex-ai_c left">
					<image src="../../static/mine/r@2x.png" mode="aspectFill"></image>
					<view class="">
						金融从业者
					</view>
				</view>
				<view class="l-flex l-flex-ai_c right">
					<view class="">
						{{hasLogin?employmentCertStatus=='0'?'':'未认证':'未认证'}}
					</view>
					<image src="../../static/right@2x.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="three-line">
			<view class="l-bb title">
				合格投资者
			</view>
			<view class="line-operation l-bb"  @tap="goApprove">
				<view class="l-flex l-flex-ai_c left">
					<image src="../../static/mine/dd@2x.png" mode="aspectFill"></image>
					<view class="">
						合格投资者承诺
					</view>
				</view>
				<view class="l-flex l-flex-ai_c right">
					<view class="">
						{{hasLogin?qualified?'':'未认证':'未认证'}}
					</view>
					<image src="../../static/right@2x.png" mode="aspectFill"></image>
				</view>
			</view>
			<!-- <view class="line-operation">
				<view class="l-flex l-flex-ai_c left">
					<image src="../../static/mine/lc@2x.png" mode="aspectFill"></image>
					<view class="">
						理财标签
					</view>
				</view>
				<view class="l-flex l-flex-ai_c right">
					<view class="">
						
					</view>
					<image src="../../static/right@2x.png" mode="aspectFill"></image>
				</view>
			</view> -->
		</view>
		
		
		<view class="three-line">
			<view class="line-operation l-bb" @tap="$nav({url:'/pages/feedback/feedback'})">
				<view class="l-flex l-flex-ai_c left">
					<image src="../../static/mine/fk@2x.png" mode="aspectFill"></image>
					<view class="">
						意见反馈
					</view>
				</view>
				<view class="l-flex l-flex-ai_c right">
					<view class="">
						
					</view>
					<image src="../../static/right@2x.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="line-operation" @tap="goSetting" id="set">
				<view class="l-flex l-flex-ai_c left">
					<image src="../../static/mine/sz@2x.png" mode="aspectFill"></image>
					<view class="">
						设置
					</view>
				</view>
				<view class="l-flex l-flex-ai_c right">
					<view class="">
						
					</view>
					<image src="../../static/right@2x.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		
		<!-- <view class="l-flex customer-service l-flex-jc_c">
			融融客服热线：&nbsp;&nbsp;400-xxx-xxxx
		</view> -->
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import {geth5} from '@/utils/geth5.js'	
	export default {
		data() {
			return {
				headPortrait:'',
				tempFilePaths:[],
				userId:''
			}
		},
		computed:{
			...mapState({
				hasLogin:'hasLogin',
				qualified:'qualified',
				user:'user',
				employmentCertStatus:'employmentCertStatus',
				userCardInfo:'userCardInfo'
			})
			/* isLogin(){
				return this.$store.state.hasLogin
			},
			isqualified(){
				return this.$store.state.qualified
			} */
		},
		onLoad() {
			if(typeof this.$getStorage('user')==='object'){
				let user = this.$getStorage('user').userInfo;
				this.userId = user.id;				
			}else{
				this.userId = ''
			}
			console.log(this.userId);
		},
		methods: {
			getImage(){
				uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'],
					sourceType:['album'],
					success: (res) => {
						console.log(res);
						let tempFilePaths = this.tempFilePaths = res.tempFilePaths;
						console.log(tempFilePaths);
						this.uploadAjax(tempFilePaths);
					}
				})
			},
			uploadAjax(filePaths){
				let url = 'user/center/img/upload';
				let params = {
					formData:{
						type: 0
					}
				}
				console.log(filePaths[0]);
				this.$upload(url, filePaths[0], params)
				.then(res => {
					if(res.code == 200){
						this.headPortrait = res.content && res.content.lmtSrc || '';
						this.submit();
					}else{
						this.$toast(res.message);
					}
				});
			},
			submit(){
				let params = { headPortrait: this.headPortrait };
				let url = 'user/center/info/update';
				this.$post(url, params)
				.then(res => {
					if(res.code == 200){
						this.$store.dispatch('getUserFn');
						this.$toast('修改头像成功');
						// #ifdef APP-PLUS
						/* let imgPath = {
							"imgPath":this.tempFilePaths[0]
						};
						this.$store.dispatch("updateMyAvatar", imgPath).then() */
						// #endif
					}else{
						this.$toast(res.message)
					}
				})
			},
			autonym() {
				this.$nav({
					url: '/pages/autonym/autonym'
				})
			},
			goH5(flag,gourl){
				if(typeof this.$getStorage('user')==='object'){
					let user = this.$getStorage('user').userInfo;
					this.userId = user.id;				
				}else{
					this.userId = ''
				}
				if(this.userId){
					geth5(flag,this.userId
					).then(data=>{
						this.$nav({url:`${gourl}?webSrc=${data}`})
					}).catch(err=>{
						/* if(err=='307'){
							this.$nav({url:'/pages/register/register'})
						} */
					})
				}else{				
					this.$toast('您还未登录，即将跳转登录页',{
						fn:()=>{
							setTimeout(()=>{
								this.$nav({url:'/pages/register/register'})
							},3000)
						}
					});
				}	
			},
			goMinePage(gourl){
				if(typeof this.$getStorage('user')==='object'){
					let user = this.$getStorage('user').userInfo;
					this.userId = user.id;				
				}else{
					this.userId = ''
				}
				if(this.userId){
					geth5('5',this.userId
					).then(data=>{
						this.$nav({url:`${gourl}`})
					}).catch(err=>{
						/* if(err=='307'){
							this.$nav({url:'/pages/register/register'})
						} */
					})
				}else{				
					this.$toast('您还未登录，即将跳转登录页',{
						fn:()=>{
							setTimeout(()=>{
								this.$nav({url:'/pages/register/register'})
							},3000)
						}
					});
				}	
			},
			goAssetOverview(){
				this.goH5('8','/pages/mine/asset-overview')		
			},
			goAttention(){
				if(typeof this.$getStorage('user')==='object'){
					let user = this.$getStorage('user').userInfo;
					this.userId = user.id;				
				}else{
					this.userId = ''
				}
				if(this.userId){
					this.$nav({url:`/pages/attention/attention`})
				}else{				
					this.$toast('您还未登录，即将跳转登录页',{
						fn:()=>{
							setTimeout(()=>{
								this.$nav({url:'/pages/register/register'})
							},3000)
						}
					});
				}	
				//this.goMinePage('/pages/attention/attention')
			},
			goFinancialInstitution(){
				if(!this.employmentCertStatus){
					this.goMinePage('/pages/mine/financial-institution')
				}else{
					this.goMinePage('/pages/mine/financial-result')
				}	
			},
			goApprove(){
				if(this.qualified){
					this.goMinePage('/pages/evaluating/evaluating')
				}else{
					this.goMinePage('/pages/approve/approve')
				}
			},
			goSetting(){
				if(typeof this.$getStorage('user')==='object'){
					let user = this.$getStorage('user').userInfo;
					this.userId = user.id;				
				}else{
					this.userId = ''
				}
				if(this.userId){
					this.$nav({url:`/pages/mine/setting`})
				}else{				
					this.$toast('您还未登录，即将跳转登录页',{
						fn:()=>{
							setTimeout(()=>{
								this.$nav({url:'/pages/register/register'})
							},3000)
						}
					});
				}	
				//this.goMinePage('/pages/mine/setting')
			}
		}
	}
</script>

<style scoped lang="scss">
.container{
	background-color: #F4F4F4;
	min-height: 100vh;
}
.mine{
	height: 380rpx;
	background: url(../../static/mine/mineback.png) no-repeat;
	background-size: cover;
	padding: 0 24rpx;
}
.l-icon-message{
	width: 40rpx;
	height: 36rpx;
	/* background-image: url('~@/static/xx@2x.png'); */
	margin-top: 44rpx;
	margin-left: 632rpx;
	display: inline-block;
	position: relative;
}
.ubt{
	min-width: 30rpx;
	min-height: 30rpx;
	border-radius: 30rpx;
	color: #FFFFFF;
	text-align: center;
	line-height: 30rpx;
	background-color: #E70012;
	position: absolute;
	right: -28rpx;
	top: -20rpx;
	font-size: 22rpx;
}

.mine-head{
	margin-top: 66rpx;
	color: #FFFFFF;
	image{
		width: 144rpx;
		height: 144rpx;
		border-radius: 144rpx;
	}
	.l-p{
		margin-left: 28rpx;
		font-size: 18px;
	}
	.l-span{
		margin-left: 28rpx;
		position: relative;
		font-size: 10px;
		color: #242424;
		width: 166rpx;
		height: 36rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		border-radius: 18rpx;
	}
/* 	.l-span::before{
		content: '';
		position: absolute;
		left: -12rpx;
		top: 0;
		width: 14rpx;
		height: 7px;
		background: url('../../static/right@2x.png') no-repeat;
		background-size: cover;
	} */
	.l-phone{
		margin-left: 28rpx;
		margin-top: 18rpx;
		image{
			width: 12rpx;
			height: 18rpx;
			margin-left: 8px;
		}
	}
	.gologin{
		width:348rpx;
		height:47px;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #242424;
		border-radius: 46rpx;
		margin-left: 28rpx;
		font-size: 18px;
		font-weight: bold; 
	}
}
.mbb{
	border-bottom: 1px solid #BBBBBB;
}
.mbt{
	border-top: 1px solid #BBBBBB;;
}
.mine-tab{
	padding: 24rpx 24rpx 34rpx 24rpx;
	.mine-tab-t{
		font-size: 20rpx;
		color: #2B2A2A;
		padding-bottom: 24rpx;
		view{
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 20rpx;
			color: #101010;
		}
		image{
			width: 40rpx;
			height: 40rpx;
			margin-bottom: 18rpx;
		}
	}
	.account{
		height: 80rpx;
		font-size: 22rpx;
		font-weight: bold;
		image{
			width: 48rpx;
			height: 48rpx;
		}
		.account-cash{
			color: #D3A10C;
			margin: 0 8rpx;
			font-size: 28rpx;
		}
	}
	.mine-private{
		background-color: #979393;
		padding: 24rpx;
		color: #FFFFFF;
		font-size: 22rpx;
		.private-img{
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
			background-color: #080808;
		}
	}
}
.one-line,.four-line,.three-line{
	padding: 0 24rpx;
	background-color: #FFFFFF;
	.title{
		color: #828282;
		font-size: 13px;
		height: 60rpx;
		display: flex;
		align-items: center;
	}
}

.four-line,.three-line{
	margin-top: 22rpx;	
}
.line-operation{
	display: flex;
	justify-content: space-between;
	height: 100rpx;
	align-items: center;
	background-color: #FFFFFF;
	image{
		width: 32rpx;
		height: 32rpx;
	}
	.left{
		image{
			margin-right: 36rpx;
		}
		view{
			font-size: 16px;
			color: #101010;
		}
	}
	.right{
		view{
			color: #E5403E;
			font-size: 16px;
		}
		image{
			margin-left: 20rpx;
			width: 16rpx;
			height: 26rpx;
		}
	}
}
.customer-service{
	margin-top: 62rpx;
	color: #979393;
	font-size: 28rpx;
}
</style>
