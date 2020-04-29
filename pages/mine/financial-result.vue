<template>
	<view class="container">
		<view class="financial-result">
			<template v-if="employmentCertStatus=='0'">
				<view class="l-flex l-flex-direction l-flex-ai_c">
					<image src="../../static/result/cg@2x.png" mode=""></image>
					<view class="title">
						认证成功
					</view>
				</view>		
			</template>
			<template v-if="employmentCertStatus=='1'">
				<view class="l-flex l-flex-direction l-flex-ai_c">
					<image src="../../static/result/dd@2x.png" mode=""></image>
					<view class="title">
						审核中
					</view>
					<view class="reason">
						工作人员将在1-3个工作日审核通过
					</view>
				</view>		
			</template>
			<template v-if="employmentCertStatus=='2'">
				<view class="l-flex l-flex-direction l-flex-ai_c">
					<image src="../../static/result/sb@2x.png" mode=""></image>
					<view class="title">
						认证失败
					</view>
					<view class="reason">
						失败原因：{{result.authReason}}
					</view>
				</view>		
			</template>
			
			<view class="company l-view">
				<view class="item l-bb">
					<view class="">
						机构类型
					</view>
					<view class="">
						{{myresult.orgTypeName||'--'}}
					</view>
				</view>
				<view class="item">
					<view class="">
						公司名称
					</view>
					<view class="">
						{{myresult.orgName}}
					</view>
				</view>
			</view>
			
			<view class="mybtn resubmit" @tap="reSubmit">
				重新提交
			</view>
		</view>	
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				userId:'',
				myresult:{}
			}
		},
		computed:{
			...mapState({
				user:'user',
				employmentCertStatus:'employmentCertStatus'
			})
		},
		onLoad() {
			this.init()
		},
		methods: {
			init(){
				if(typeof this.$getStorage('user')==='object'){
					let user = this.$getStorage('user').userInfo;
					this.userId = user.id;
					this.employmentCertQuery();
				}else{
					this.$toast('您还未登录，即将跳转登录页',{
						fn:()=>{
							this.$nav({url:'/pages/register/register'});
						}
					});
				}
				
			},
			reSubmit(){
				this.$nav({url:'/pages/mine/financial-institution'}); 
			},
			employmentCertQuery(){
				let url = 'user/center/finance/employmentCertQuery';
				this.$post(url,{
					userId:this.userId
				}).then(res=>{
					this.myresult = res;
				}).catch(err=>{
					console.log(err);
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.container{
	min-height: 100vh;
	background-color: #F4F4F4;
}
.financial-result{
	image{
		width: 150rpx;
		height: 150rpx;
		margin-top: 40rpx;
	}
	.title{
		font-size: 18px;
		font-weight: bold;
		margin-top: 34rpx;
	}
	.reason{
		font-size: 13px;
		color: #828282;
		margin-top: 24rpx;
	}
}

.company{
	background-color: #FFFFFF;
	margin-top: 52rpx;
	.item{
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		view:nth-of-type(2){
			color: #828282;
		}
	}
}
.resubmit{
	margin: 148rpx auto 0;
}
</style>
