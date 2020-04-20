<template>
	<view class="container">
		<account-tip :tip1="true" :tip2="true" :tip3="true"></account-tip>
		
		<view class="shiming">
			<view class="noicon l-bb">
				<view class="">
					交易密码
				</view>
				<input type="password" v-model="tradPwd" placeholder="请输入交易密码" placeholder-class="placeclass" disabled @tap="open"/>
			</view>
		</view>
		
		<view class="next mybtn">提交</view>
		
		<uni-popup ref="popup" type="top" :top="top" :animation="false">
			<view class="popupbox">
				<view class="title l-flex l-flex-jc_sb l-view">
					<view>
						 
					</view>
					<view class="">
						{{popuptxt}}
					</view>
					<view class="" @tap="close">
						<image src="../../static/handle/guanbi@2x.png" mode=""></image>
					</view>			
				</view>
				<template v-if="isFirst">
					<myp-one ref="one" type="bottom" @finish="finishedone" :maxlength="6" :isPwd="true" :autoFocus="true" id="one"></myp-one>				
				</template>
				<template v-else>
					<myp-one ref="two" type="bottom" @finish="finishedtwo" :maxlength="6" :isPwd="true" :autoFocus="true" id="two"></myp-one>
				</template>
			</view>	
		</uni-popup>
	</view>
</template>

<script>
	import accountTip from './account-tip.vue'
	export default {
		components:{
			accountTip
		},
		data() {
			return {
				top:100,
				popuptxt:'请输入交易密码',
				firstval:'',
				secondval:'',
				isFirst:true,
				tradPwd:''
			}
		},
		mounted() {
			
		},
		methods: {
			open(){
				 this.reset()	
				 this.$refs.popup.open()
			},
			reset(){
				this.firstval = '';
				this.secondval = '';
				this.tradPwd = '';
				this.popuptxt = '请输入交易密码';
				this.isFirst = true;
			},
			close(){
				 this.$refs.popup.close(); 
			},
			finishedone(val) {
				this.firstval = val;
				this.popuptxt = '请再次输入交易密码';
				this.$refs.one.clear();
				this.isFirst = false;
			},
			finishedtwo(val) {
				this.secondval = val;
				if(this.firstval==this.secondval){
					this.tradPwd = val;
					console.log(this.tradPwd);
				}else{
					this.tradPwd = ''; 
					this.$toast("两次密码输入不一致");
				}
				this.isFirst = true;
				this.close()	
			},
		}
	}
</script>

<style lang="scss" scoped>
.container{
	background-color: #F2F2F2;
	min-height: 100vh;
}
.popupbox{
		width: 700rpx;
		height: 500rpx;
		background-color: #FFFFFF;
		border-radius: 80rpx;
		overflow: hidden;
		margin: 0 auto; 
		.title{
			display: flex;
			font-size: 18px;
			color: #afafaf;
			margin: 40rpx 0 160rpx;
			image{
				width: 36rpx;
				height: 36rpx;
			}
		}
	}
.shiming{
	margin-top: 40rpx;
}
.noicon{
	height: 52px;
	background-color: #FFFFFF;
	padding: 0 24rpx;
	display: flex;
	width: calc(100% - 48rpx);
	align-items: center;
	view:nth-of-type(1){
		font-size: 16px;
		margin-right: 20rpx;
		width: 148rpx;
	}
	.placeclass{
		color: #afafaf;
		font-size: 15px;
	}
	input{
		flex: 1;
		font-size: 15px;
	}
	image{
		width: 18rpx;
		height: 28rpx;
	}
}
.next{
	margin: 140rpx auto 0; 
}
</style>
