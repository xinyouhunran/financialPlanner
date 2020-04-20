<template>
	<view class="l-container">
		<view class="l-navbar">
			<view class="l-navbar-place"></view>
			<view class="l-navbar-view">
				<view class="l-navbar-nav" @tap="$back()">
					<text class="l-icon l-icon-back"></text>
				</view>
				<view class="l-navbar-tab">
					<view class="l-navbar-tab-item" @tap="tabIndex = 0" :class="{ 'l-navbar-tab-active': tabIndex == 0 }">对比产品池</view>
					<view class="l-navbar-tab-item" @tap="tabIndex = 1" :class="{ 'l-navbar-tab-active': tabIndex == 1 }">对比记录</view>
				</view>
			</view>
		</view>
		<view class="l-main">
			<swiper :style="{ height: swiperHeight + 'px' }" :current="tabIndex" @change="changSwiper">
				<swiper-item>
					<scroll-view scroll-y="true" class="l-scroll">
						<view class="l-item">
							<view v-if="storageList.length">
								<view class="l-list-item" @tap="selectHistory(s, i, 'storageList')" v-for="(s,i) in storageList" :key="i">
									<view class="l-list-check">
										<text class="l-icon l-icon-checked" v-if="s.isSelected"></text>
										<text class="l-icon l-icon-check" v-else></text>
									</view>
									<view class="l-list-content">
										<pk-list-manage :dataInfo="s"></pk-list-manage>
									</view>
								</view>
							</view>
							<view class="l-list-none" v-else>
								<view class="l-list-view">
									<image class="l-img-none" src="../../static/kong@2x.png" mode="aspectFill"></image>
									<view class="l-list-text">您尚未发起pk对比</view>
								</view>
							</view>
							<view class="l-posi-handle">
								<view class="l-posi-item" @tap="allSelect('isStorage')">
									<text class="l-icon l-icon-checked" v-if="isStorage"></text>
									<text class="l-icon l-icon-check" v-else></text>
									全选
								</view>
								<view class="l-posi-item" @tap="delSelect('storageList')">
									<text class="l-icon l-icon-del"></text>
									删除
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" class="l-scroll">
						<view class="l-item-1">
							<view v-if="historyList.length">
								<view class="l-list-item" @tap="selectHistory(s, i, 'historyList')" v-for="(s, i) in historyList" :key="i">
									<view class="l-list-check">
										<text class="l-icon l-icon-checked" v-if="s.isSelected"></text>
										<text class="l-icon l-icon-check" v-else></text>
									</view>
									<view class="l-list-content">
										<pk-record-manage :dataInfo="s"></pk-record-manage>
									</view>
								</view>
							</view>
							<view class="l-list-none" v-else>
								<view class="l-list-view">
									<image class="l-img-none" src="../../static/kong@2x.png" mode="aspectFill"></image>
									<view class="l-list-text">您尚未发起pk对比</view>
								</view>
							</view>

							<view class="l-posi-handle">
								<view class="l-posi-item" @tap="allSelect('isHistory')">
									<text class="l-icon l-icon-checked" v-if="isHistory"></text>
									<text class="l-icon l-icon-check" v-else></text>
									全选
								</view>
								<view class="l-posi-item" @tap="delSelect('historyList')">
									<text class="l-icon l-icon-del"></text>
									删除
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import pkListManage from './pk-list-manage.vue';
	import pkRecordManage from './pk-record-manage.vue';

	export default {
		components: {
			pkListManage,
			pkRecordManage
		},
		data() {
			return {
				tabIndex: 0,
				swiperHeight: 500,
				historyList: [],
				storageList: []
			}
		},

		onReady() {
			this.getSwiperHeightFn();
		},
		onLoad() {
			this.historyList = this.$getStorage('pkList') || [];
			this.storageList = this.$getStorage('storageList') || [];
		},
		computed: {
			isStorage() {
				let len = this.storageList.filter(e => !!e.isSelected).length
				let length = this.storageList.length
				return len === length
			},
			isHistory() {
				let len = this.historyList.filter(e => !!e.isSelected).length
				let length = this.historyList.length
				return len === length
			}
		},
		watch: {

		},
		onUnload() {
			
		},
		methods: {
			allSelect(key){
				let keys = 'storageList';
				if(key === 'isHistory'){
					keys = 'historyList';
				}
				let bool = !this[key];
				
				this[keys].forEach((e, i) =>{
					this.$set(this[keys][i], 'isSelected', bool)
				})
			},
			delSelect(key){
				this[key] = this[key].filter(e => !e.isSelected);
				this.$setStorage('pkList', this.historyList);
				this.$setStorage('storageList', this.storageList);
				let page = this.$pageList();
				page.manageInit()
				this.$forceUpdate();
			},
			changSwiper(e) {
				if (e.detail.source == "touch") {
					this.tabIndex = e.detail.current;
				}
			},
			selectHistory(s, i, key) {
				s.isSelected = !s.isSelected;
				this.$set(this[key], i, s)
				this.$forceUpdate()
			},
			getSwiperHeightFn() {
				let _this = this;

				let query = uni.createSelectorQuery().in(_this);
				query
					.select('.l-navbar')
					.boundingClientRect(data => {})
					.exec(data => {
						_this.swiperHeight = _this.$getSystem.windowHeight - data.map(e => e.height).reduce((a, b) => a + b)
					});
			}

		}
	}
</script>

<style scoped>
	.l-navbar {
		position: relative;
		width: 750rpx;
		/* #ifdef H5 */
		height: 94rpx;
		/* #endif */
	}

	.l-item-1 {
		box-sizing: border-box;
		width: 100%;
		padding: 0 32rpx;
	}

	.l-navbar-place {
		width: 750rpx;
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height);
		/* #endif */
		height: 94rpx;
	}

	.l-navbar-view {
		height: 94rpx;
		padding: 0 34rpx;
		position: fixed;
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height);
		/* #endif */
		top: 0;
		left: 0;
		width: calc(100% - 68rpx);
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(237, 237, 237, 1);
		z-index: 11;
	}

	.l-navbar-tab {
		flex: 1;
		height: 100%;
		display: flex;
		color: #828282;
		font-size: 30rpx;
		align-items: center;
		justify-content: center;
	}

	.l-navbar-tab-item {
		padding: 0 31rpx;
	}

	.l-navbar-tab-active {
		color: #836438;
	}

	.l-icon-back {
		width: 20rpx;
		height: 35rpx;
		background-image: url('~@/static/back@2x.png');
	}

	.l-navbar-title {
		font-size: 36rpx;
	}

	.l-navbar-handle {
		font-size: 30rpx;
	}

	.l-main {
		width: 100%;
	}

	.l-scroll {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding-bottom: 100rpx;
	}

	.l-item {
		padding: 0 32rpx;
	}

	.l-list-none {
		width: 100%;
		min-height: 607rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.l-list-view {
		text-align: center;
	}

	.l-list-text {
		padding-top: 40rpx;
		font-size: 26rpx;
		color: #CCCCCC;
	}

	.l-img-none {
		width: 152rpx;
		height: 136rpx;
	}

	.l-posi-handle {
		position: fixed;
		bottom: 0;
		left: 0;
		box-sizing: border-box;
		width: 100%;
		height: 100rpx;
		display: flex;
		padding: 0 32rpx;
		align-items: center;
		justify-content: space-between;
		background-color: #e1e1e1;
	}

	.l-posi-item {
		display: flex;
		align-items: center;
	}

	.l-list-item {
		width: 100%;
		display: flex;
	}

	.l-list-check {
		padding: 20rpx 0;
	}

	.l-list-content {
		width: calc(100% - 55rpx);
	}

	.l-icon-checked {
		min-width: 36rpx;
		height: 36rpx;
		margin-right: 19rpx;
		background-image: url('~@/static/handle/xuanze@2x.png');
	}

	.l-icon-check {
		min-width: 36rpx;
		height: 36rpx;
		margin-right: 10rpx;
		background-image: url('~@/static/xuan@2x.png');
	}

	.l-icon-del {
		min-width: 36rpx;
		height: 36rpx;
		margin-right: 10rpx;
		background-image: url('~@/static/l-icon-delete.png');
	}
</style>
