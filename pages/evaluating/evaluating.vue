<template>
	<view class="l-container">
		<view v-if="investorQualified.id">
			<view class="l-div l-div-1">您的投资风格为</view>
			<view class="l-div l-div-2">
				<image class="l-img-evaluating" :src="img" mode="aspectFill"></image>
			</view>
			<view class="l-div l-div-3">您的风险等级为{{ investorQualified.qualifiedResult }}({{ txt }}风险)</view>
			<view class="l-div l-div-4">适合{{ txt }}风险的基金产品</view>
			<view class="l-div l-div-5">
				<button class="l-btn l-evaluating-btn" @tap="clickOpen">开启财富大门</button>
			</view>
			<view class="l-div l-div-6" @tap="$nav({ url: '/pages/approve/approve' })">再次测评</view>
		</view>
		<view class="l-txt-center" v-else>
			<view class="l-div-txt l-div-txt-1">
				您当前尚未拥有风险评测数据
			</view>
			<view class="l-div-img l-div-txt-2">
				<image class="l-img-kong" src="../../static/kong@2x.png" mode="aspectFill"></image>
			</view>
			<view class="l-div-txt l-div-txt-3">
				请返回<span class="l-color-E70012">【个人中心】</span>完成<span class="l-color-E70012">【实名信息】</span>认证与
			</view>
			<view class="l-div-txt l-div-txt-4">
				<span class="l-color-E70012">【合格投资者】</span>认证后，查看您的评测数据！
			</view>
			<view class="l-div l-div-txt-5">
				<button class="l-btn l-evaluating-btn" @tap="$back()">返回上一页</button>
			</view>
		</view>
	</view>
</template>

<script>
	let list = [
		{ type: 'C1', img: '../../static/evaluating/l-type-5.png', txt: '低' },
		{ type: 'C2', img: '../../static/evaluating/l-type-4.png', txt: '中低' },
		{ type: 'C3', img: '../../static/evaluating/l-type-3.png', txt: '中等' },
		{ type: 'C4', img: '../../static/evaluating/l-type-2.png', txt: '高' },
		{ type: 'C5', img: '../../static/evaluating/l-type-1.png', txt: '高等' },
	]
	export default {
		data(){
			return {
				investorQualified: {},
				txt: '低等',
				img: '../../static/evaluating/l-type-5.png'
			}
		},
		onShow(){
			setTimeout(() => {
				let _this = this;
				let investorQualified = _this.investorQualified = _this.user.investorQualified || {};
				list.forEach(e => {
					if(e.type === investorQualified.qualifiedResult){
						_this.img = e.img;
						_this.txt = e.txt;
					}
				})
			}, 100)
		},
		watch:{
			user(){
				
			}
		},
		computed:{
			user(){
				return this.$store.getters.user
			}
		},
		methods:{
			clickOpen(){
				this.$nav({ url: '/pages/index/index' }, 'switchTab')
			}
		}
	}
</script>

<style scoped>
	.l-container{
		text-align: center;
		font-size: 30rpx;
		padding: 90rpx 35rpx 32rpx;
	}
	
	.l-div-1{
		width: 100%;
	}
	
	.l-div-2{
		padding: 60rpx 0 83rpx;
	}
	
	.l-div-3{
		font-size: 36rpx;
	}
	
	.l-div-4{
		color: #828282;
		padding: 14rpx 0 111rpx;
	}
	
	.l-div-6{
		padding-top: 31rpx;
		color: #1C46DB;
	}
	
	.l-evaluating-btn{
		height: 94rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-size: 36rpx;
		border-radius: 47rpx;
		background-color: #AC9472;
	}
	
	.l-img-evaluating{
		width: 314rpx;
		height: 314rpx;
		margin: 0 auto;
	}
	
	.l-txt-center{
		text-align: center;
	}
	
	.l-div-txt-1{
		font-size: 30rpx;
		color: #000000;
		padding: 89rpx 0 125rpx;
	}
	
	.l-div-txt-2{
		margin-bottom: 160rpx;
	}
	
	.l-div-txt-4,
	.l-div-txt-3{
		font-size: 24rpx;
		color: #828282;
	}
	
	.l-div-txt-3{
		margin-bottom: 17rpx;
	}
	
	.l-div-txt-5{
		margin-top: 160rpx;
	}
	
	.l-color-E70012{
		color: #E70012;
	}
	
	.l-img-kong{
		width: 152rpx;
		height: 136rpx;
	}
</style>
