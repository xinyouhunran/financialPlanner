<template>
	<view class="container">
		<view class="person-share l-view l-flex l-flex-jc_sb l-flex-ai_c">
			<view class="l-flex l-flex-jc_sb l-flex-ai_c">
				<view class="">
					<image src="../../static/finance/tx@3x.png" mode=""></image>
				</view>
				<view class="">
					<view class="colorff">
						李丽华
					</view>
					<view class="coloraf">
						投资顾问
					</view>
				</view>
			</view>
			<view class="phone-call l-flex-ai_c-jc_c">
				电话联系
			</view>
		</view>
		
		<view class="l-view">
			<view class="share-content" v-html="content">
				
			</view>
		</view>
			
		<view class="interest">
			感兴趣
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:''
			}
		},
		beforeMount() {
			this.content = `<h4>你好</h4>`;
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.container{
	background:url(../../static/zbyw_back.png) no-repeat;
	background-size: 750rpx calc(100vh - var(--window-top));
	overflow: hidden;
	min-height: calc(100vh - var(--window-top));
}
.person-share{
	background-color: #2D3270;
	height: 108rpx;
	image{
		width: 80rpx;
		height: 80rpx;
		margin-right: 22rpx;
	}
	.colorff{
		color: #FFFFFF;
		font-size: 16px;
	}
	.coloraf{
		color: #afafaf;
		margin-top: 14rpx;
		font-size: 12px;
	}
}
.phone-call{
	height: 80rpx;
	width: 280rpx;
	background-color: #D3A35C;
	color: #FFFFFF;
	border-radius: 40rpx;
	display: flex;
}
.share-content{
	padding: 40rpx;
	background-color: #FFFFFF;
	border-radius: 8rpx;
	margin-top: 20rpx;
}
.interest{
	position: fixed;
	width: 96rpx;
	height: 48px;
	border-radius: 96rpx;
	color: #FFFFFF;
	display: flex;
	justify-content: center;
	align-items: center;
	bottom: 40%;
	background-color: #000000;
	font-size: 24rpx;
	right: 24rpx; 
}
</style>
