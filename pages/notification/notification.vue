<template>
	<view class="notice">
		<top-notice :texts='noticeStr'></top-notice>
		<view class="publicmes">
			<view class="noticemsg l-flex">
				<view class="noticeimg">
					<image src="../../static/gx@2x.png" mode=""></image>
				</view>
				<view class="l-flex l-flex-direction l-flex-jc_sb l-flex-1" @tap="$nav({url:'/pages/road/road-details'})">
					<view class="l-flex l-flex-jc_sb">
						<view class="name">
							净值更新
						</view>
						<view class="time">
							<template v-if="beforetwelve">
								<view>12小时以前</view>
							</template>
							<template v-else>
								<view>03-24&nbsp;&nbsp;12:00</view>
							</template>
						</view>
					</view>
					<view class="l-flex l-flex-jc_sb">
						<view class="news">
							<view>尊敬的投资者，您订阅的产品净值有更新</view>
						</view>
						<view class="ubt" v-if="newsnum>0">
							{{newsnum}}
						</view>
					</view>
				</view>
			</view>
			
			<view class="noticemsg l-flex" @tap="$nav({url:'/pages/information/information'})">
				<view class="noticeimg">
					<image src="../../static/zx@2x.png" mode=""></image>
				</view>
				<view class="l-flex l-flex-direction l-flex-jc_sb l-flex-1">
					<view class="l-flex l-flex-jc_sb">
						<view class="name">
							路演资讯
						</view>
						<view class="time">
							<template v-if="beforetwelve">
								<view>12小时以前</view>
							</template>
							<template v-else>
								<view>03-24&nbsp;&nbsp;12:00</view>
							</template>
						</view>
					</view>
					<view class="l-flex l-flex-jc_sb">
						<view class="news">
							<view>尊敬的投资者，您订阅的产品净值有更新</view>
						</view>
						<view class="ubt" v-if="newsnum>0">
							{{newsnum}}
						</view>
					</view>
				</view>
			</view>
			
			<view class="noticemsg l-flex" @tap="$nav({url:'/pages/notification/system-infor'})">
				<view class="noticeimg">
					<image src="../../static/gx@2x.png" mode=""></image>
				</view>
				<view class="l-flex l-flex-direction l-flex-jc_sb l-flex-1">
					<view class="l-flex l-flex-jc_sb">
						<view class="name">
							系统通知
						</view>
						<view class="time">
							<template v-if="beforetwelve">
								<view>12小时以前</view>
							</template>
							<template v-else>
								<view>03-24&nbsp;&nbsp;12:00</view>
							</template>
						</view>
					</view>
					<view class="l-flex l-flex-jc_sb">
						<view class="news">
							<view>尊敬的投资者，您订阅的产品净值有更新</view>
						</view>
						<view class="ubt" v-if="newsnum>0">
							{{newsnum}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="privatemes">
			<view class="noticemsg l-flex">
				<view class="noticeimg">
					<image src="../../static/picture.png" mode=""></image>
				</view>
				<view class="l-flex l-flex-direction l-flex-jc_sb l-flex-1">
					<view class="l-flex l-flex-jc_sb">
						<view class="name">
							用户名
						</view>
						<view class="time">
							<template v-if="beforetwelve">
								<view>12小时以前</view>
							</template>
							<template v-else>
								<view>03-24&nbsp;&nbsp;12:00</view>
							</template>
						</view>
					</view>
					<view class="l-flex l-flex-jc_sb">
						<view class="news">
							<view>尊敬的投资者，您订阅的产品净值有更新fdhsakjhfaskjfhkj</view>
						</view>
						<view class="ubt">
							99+
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeStr:'最新净值、最新热点资讯、业务进度不容错过！去开启',
				beforetwelve:false,
				newsnum:1
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.notice{
	background-color: #F6F6F6;
	min-height: calc(100vh - var(--window-top));
}
.publicmes{
	margin-bottom: 20rpx;
}
.noticemsg{
	padding: 24rpx;
	background-color: #FFFFFF;
	image{
		width: 94rpx;
		height: 94rpx;
	}
	.name{
		font-size: 17px;
	}
	.time{
		color: #828282;
		font-size: 12px;
	}
	.news{
		font-size: 14px;
		color: #828282; 
		align-items: flex-start;
		view{
			width: 502rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: pre; 
		}
	}
}
.noticeimg{
	margin-right: 25rpx;
}
.ubt{
	padding: 1px 4px;
	border-radius: 16px;
	color: #FFFFFF;
	text-align: center;
	background-color: #fd4857;
	font-size: 11px;
}
</style>
