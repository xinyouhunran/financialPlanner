<template>
	<view class="l-t">
		<view class="l-titleNView">
			<!-- #ifdef APP-PLUS -->
			<view class="l-status"></view>
			<!-- #endif -->
			<view class="l-titleNView-content">
				<text class="l-icon-gth"  @tap="$nav({ url: '/pages/regards/regards' })"></text>
				<view class="l-t-form" @tap="$nav({url:'/pages/search/search'})">
					<text class="l-icon-search"></text>
					<input class="l-input" 
					type="text" 
					disabled
					v-model="keyword" 
					placeholder="请输入基金名称搜索" />
					<!-- @focus="isBtn = true"
					@blur="isBtn = false" -->
					<!-- <span class="l-btn-search" :class="{ 'l-block': !0 }" @tap="onKeyword">搜索</span> -->
				</view>
				<!-- #ifdef H5 -->
				<text class="l-icon-mine" @tap="$nav({url:'/pages/mine/mine'})"></text>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<text class="l-icon-mine" @tap="$nav({url:'/pages/app/mine/mine'})"></text>
				<!-- #endif -->
			</view>
		</view>
		<view class="l-titleNView-place"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isBtn: false,
				keyword: ''
			}
		},
		methods:{
			onKeyword(){
				console.log(1)
				this.$emit('keyword', this.keyword);
			}
		}
	}
</script>

<style scoped>
	.l-titleNView {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 800;
		background: url('~@/static/index/20200113101811.png') center/cover no-repeat;
	}
	
	.l-input{
		flex: 1;
		font-size: 12px;
	}
	
	.l-btn-search{
		display: none;
		width: 100rpx;
		height: 100%;
		align-items: center;
		justify-content: center;
	}
	
	.l-block{
		display: flex;
	}

	.l-titleNView-place {
		width: 100%;
		height: calc(var(--status-bar-height) + 140rpx);
	}

	.l-status {
		width: 100%;
		height: var(--status-bar-height);
	}

	.l-titleNView-content {
		display: flex;
		align-items: center;
		height: 60rpx;
		padding: 60rpx 24rpx 20rpx;
	}

	.l-t-form {
		flex: 1;
		margin: 0 24rpx;
		height: 60rpx;
		color: #AFAFAF;
		font-size: 24rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		background: rgba(255, 255, 255, 1);
		border-radius: 30rpx;
	}

	.l-icon-mine,
	.l-icon-search,
	.l-icon-gth {
		display: inline-block;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.l-icon-mine {
		width: 54rpx;
		height: 54rpx;
		background-image: url('~@/static/index/ren@2x.png');
	}

	.l-icon-gth {
		width: 54rpx;
		height: 54rpx;
		background-image: url('~@/static/index/gantanhao@2x.png');
	}

	.l-icon-search {
		width: 30rpx;
		height: 30rpx;
		margin-right: 12rpx;
		background-image: url('~@/static/windzxsh/sousuo@2x.png');
	}
</style>
