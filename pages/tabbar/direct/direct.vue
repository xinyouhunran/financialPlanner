<template>
	<view class="l-container" v-if="!0">
		<image class="l-img-off" src="../../../static/official.png" mode="aspectFit"></image>
		<button class="l-btn l-btn-a" @tap="navgoTo">点击跳转PC首页</button>
	</view>
	<view  v-else>
		<view class="l-list" v-for="(s, i) in router" :key="i" @tap="navgo(s)">
			{{ s.title }}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				router: [{
						url: '/pages/company-details/company-details',
						title: '公司详情'
					},
					{
						url: '/pages/people-details/people-details',
						title: '经理详情'
					},
					{
						url: '/pages/product-details/product-details',
						title: '产品详情'
					},
					{
						url: '/pages/auth-vip/gold-vip',
						title: '金V'
					},
					{
						url: '/pages/auth-vip/blue-vip',
						title: '蓝V'
					},
					{
						url: '/pages/auth-vip/gold',
						title: '申请金V'
					},
					{
						url: '/pages/auth-vip/blue',
						title: '申请蓝V'
					},
					{
						url: '/pages/index/index',
						title: '聊天首页'
					},
					{
						url: '/pages/app/index/index',
						title: 'app首页'
					},
					{
						url: '/pages/app/direct/direct',
						title: 'app直营店'
					},
					{
						url: '/pages/app/mine/mine',
						title: 'app我的'
					},
					{
						url: '/pages/search/search',
						title: '搜索'
					},
					{
						url: '/pages/auth-vip/auth-vip',
						title: '认证蓝v'
					},
					{
						url: '/pages/tally/tally',
						title: '记账'
					},
					{
						url: '/pages/pk/pk',
						title: 'PK'
					},
					{
						url: '/pages/pk/pk-add',
						title: 'PK添加'
					},
					{
						url: '/pages/pk/pk-manage',
						title: 'PK管理'
					},
					{
						url: '/pages/search/search-more',
						title: '搜索'
					},
					{
						url: '/pages/mine/mine',
						title: '我的'
					},
					{
						url: '/pages/autonym/autonym',
						title: '实名认证'
					},
					{
						url: '/pages/ranking/ranking',
						title: '排行版'
					},
					// {url:'/pages/live/live',title:'直播页'},
					{
						url: '/pages/evaluating/evaluating',
						title: '评测'
					},
					{
						url: '/pages/feedback/feedback',
						title: '反馈'
					},
					// { url: '/pages/im-chat/im-chat', title : '聊天窗口' },
					// { url: '/pages/im-chat/im-list', title : '信息' },
					{
						url: '/pages/tabbar/road/road-details',
						title: '路演直播页'
					},
					// { url: '/pages/im-chat/single', title : '创建聊天' },
					{
						url: '/pages/tabbar/index/placement-order',
						title: '私募热榜'
					},
					{
						url: '/pages/crunchies/crunchies',
						title: '榜单'
					}

				]
			}
		},
		onLoad() {

		},
		methods: {
			tap() {
				this.$store.dispatch('downloadApp')
			},
			navgo(s){
				let url = s.url;
				this.$nav({ url }, s.type)
			},
			navgoTo(){
				console.log(11)
				location.href = this.$config.$pcUrl;
			}
		}
	}
</script>

<style>
	.l-container {
		width: 100%;
		font-size: 60rpx;
		color: #E70012;
		position: relative;
	}
	
	.l-img-off{
		width: 100%;
		height: 3080rpx;
	}

	.l-list {
		width: 100%;
		height: 100rpx;
		display: flex;
		margin: 30rpx 0;
		color: #FFFFFF;
		font-size: 32rpx;
		background-color: #E70012;
		align-items: center;
		justify-content: center;
	}
	
	.l-btn-a{
		position: absolute;
		bottom: 294rpx;
		left: 50%;
		transform: translateX(-50%);
		width:425rpx;
		height:79rpx;
		border:1rpx solid rgba(255,255,255,0.4);
		display: flex;
		align-items: center;
		background-color: rgba(140, 0, 187, 0.3);
		color: #FFFFFF;
		font-size: 36rpx;
		justify-content: center;
		border-radius:20rpx;
		z-index: 99;
	}
</style>
