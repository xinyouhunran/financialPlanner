<template>
	<view class="l-footer">
		<view class="l-icon-c l-flex l-flex-ai_c l-flex-jc_sb">
			<view class="l-icon-view" @tap="$nav({ url: '/pages/download/download' })">
				<view class="l-icon-app"></view>
				<view class="l-icon-hint">APP下载</view>
			</view>
			<view class="l-icon-view" @tap="$nav({ url: '/pages/officer/officer' })">
				<view class="l-icon-gw"></view>
				<view class="l-icon-hint">iFund官微</view>
			</view>
			<view class="l-icon-view" @tap="$nav({ url: '/pages/officer/wb' })">
				<view class="l-icon-wb"></view>
				<view class="l-icon-hint">iFund微博</view>
			</view>
			<view class="l-icon-view" @tap="callPhone">
				<view class="l-icon-kf"></view>
				<view class="l-icon-hint">{{ phone }}</view>
			</view>
		</view>
		<view class="l-list l-flex l-flex-ai_c l-flex-jc_sb">
			<text @tap="$nav({ url: '/pages/deal/contact' })">关于我们</text>
			<text>|</text>
			<text @tap="$nav({ url: '/pages/deal/mine' })">联系我们</text>
			<text>|</text>
			<text @tap="$nav({ url: '/pages/deal/exemption' })">免责声明</text>
			<text>|</text>
			<text @tap="$nav({ url: '/pages/feedback/feedback' })">意见反馈</text>
		</view>
		<view class="l-text">
			<view>版权所有©深圳市云台壹号科技有限公司</view>
			<view class="l-text-1">ICP证粤B2-20110208 粤ICP备09068203号</view>
			<view>粤公安备 44030402000814号</view>
			<view class="l-text-2">投资有风险，选择需谨慎</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				phone: '400-680-3928'
			}
		},
		methods:{
			callPhone(){
				uni.makePhoneCall({
					phoneNumber:this.phone
				})
			},
			downLoad(){
				window.location.href = 
				window.open('http://112.74.30.157:7788/#/download/download.html', 'app', 'width:100px,height:100')
			}
		}
	}
</script>

<style scoped>
	
	.l-list{
		font-size: 30rpx;
		color: #828282;
		vertical-align: text-top;
		padding: 34rpx 40rpx;
	}
	
	.l-text{
		font-size: 24rpx;
		text-align: center;
	}
	
	.l-text-2,
	.l-text-1{
		padding: 17rpx 0 37rpx;
	}
	
	.l-icon-c{
		padding: 26rpx 20rpx 39rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx;
	}
	
	.l-icon-view{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.l-icon-hint{
		font-size: 24rpx;
		padding-top: 28rpx;
	}
	
	.l-icon-app{
		width: 84rpx;
		height: 84rpx;
		background: url('~@/static/project-footer/app@2x.png')center/cover no-repeat;
	}
	
	.l-icon-gw{
		width: 84rpx;
		height: 84rpx;
		background: url('~@/static/project-footer/wechat@2x.png')center/cover no-repeat;
	}
	
	.l-icon-wb{
		width: 84rpx;
		height: 84rpx;
		background: url('~@/static/project-footer/weibo@2x.png')center/cover no-repeat;
	}
	
	.l-icon-kf{
		width: 84rpx;
		height: 84rpx;
		background: url('~@/static/project-footer/phone@2x.png')center/cover no-repeat;
	}
	
</style>
