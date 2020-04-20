<template>
	<view class="l-content-2">
		<view v-for="(ssss, iiii) in labelKeyList" :key="iiii">
			<view class="l-posi-head">
				{{ ssss.title }}
			</view>
			<view class="l-posi-view">
				<view class="l-posi-left">
					<view class="l-posi-label" v-for="(sss, iii) in ssss.keyList" :key="iii">
						{{ sss.title }}
					</view>
				</view>
				<view class="l-posi-value">
					<view  class="l-scroll-module" >
						<view class="l-flex" v-for="(ss, ii) in ssss.keyList" :key="ii">
							<view class="l-view-item" v-for="(s, i) in  dataList[ssss.key]" :key="i">
								<view class="l-txt-over" v-if="ss.isNav" 
								@tap="$nav({ url: ss.isNav + s[ss.isId] })"
								:style="{ color: ss.isNavColor }">
									{{ s[ss.key] || '--' }}
								</view>
								<view class="l-txt-over" :style="{ color: ss.isColor || '#000000' }" v-else >
									{{ s[ss.key] || '--' }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataList: {
				type: [Object, Array],
				default () {
					return {}
				}
			},
			labelKeyList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		watch:{
			dataList(n){
				console.log(n)
			}
		},
		mounted(){
		}
	}
</script>

<style scoped>
	.l-content-2 {
		width: 100%;
	}

	.l-content-2 .l-posi-head {
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #EDEDED;
		border-top: 1rpx solid #EDEDED;
	}

	.l-content-2 .l-posi-view {
		width: 100%;
		display: flex;
		align-items: stretch;
		border-bottom: 1rpx solid #EDEDED;
	}

	.l-content-2 .l-posi-left {
		min-width: 136rpx;
	}

	.l-content-2 .l-posi-label {
		width: 136rpx;
		padding: 0 10rpx;
		line-height: 1.3;
		box-sizing: border-box;
		height: 120rpx;
		display: flex;
		align-items: center;
		color: #828282;
		font-size: 26rpx;
		border-right: 1rpx solid #EDEDED;
		border-bottom: 1rpx solid #EDEDED;
		justify-content: center;
		background-color: #F6F6F6;
	}

	.l-content-2 .l-posi-value {
		width: calc(100% - 136rpx);
	}

	.l-content-2 .l-scroll-module {
		width: 100%;
		height: 100%;
		overflow-x: auto;
		white-space: nowrap;
	}

	.l-content-2 .l-view-item {
		padding: 0 10rpx;
		display: flex;
		line-height: 1.3;
		align-items: center;
		white-space: normal;
		box-sizing: border-box;
		min-width: 200rpx;
		font-size: 24rpx;
		height: 120rpx;
		color: #89622F;
		border-right: 1rpx solid #EDEDED;
		border-bottom: 1rpx solid #EDEDED;
	}

	.l-content-2 .l-txt-over {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
</style>
