<template>
	<view class="uni-steps">
		<view :class="[direction==='column'?'uni-steps__column':'uni-steps__row']">
			<view :class="[direction==='column'?'uni-steps__column-text-container':'uni-steps__row-text-container']">
				<view v-for="(item,index) in options" :key="index" :class="[direction==='column'?'uni-steps__column-text':'uni-steps__row-text']">
					<!-- <text :style="{color:index<=active?activeColor:deactiveColor}" :class="[direction==='column'?'uni-steps__column-title':'uni-steps__row-title']">{{item.title}}</text>
					<text :style="{color:index<=active?activeColor:deactiveColor}" :class="[direction==='column'?'uni-steps__column-desc':'uni-steps__row-desc']">{{item.desc}}</text> -->
					<view :style="{color:index<=active?'#242424':'#afafaf','font-size':index<=active?'15px':'13px'}" :class="[direction==='column'?'uni-steps__column-title':'uni-steps__row-title']">{{item.title}}</view>
					<view :style="{color:index<=active?'#242424':'#afafaf','font-size':index<=active?'15px':'13px'}" :class="[direction==='column'?'uni-steps__column-desc':'uni-steps__row-desc']">{{item.desc}} <span :style="{color:index<=active?'#e70012':'#afafaf'}">{{item.time}}</span> </view>
				</view>
			</view>
			<view :class="[direction==='column'?'uni-steps__column-container':'uni-steps__row-container']">
				<view :class="[direction==='column'?'uni-steps__column-line-item':'uni-steps__row-line-item']" v-for="(item,index) in options"
				 :key="index">
					<view :class="[direction==='column'?'uni-steps__column-line':'uni-steps__row-line',direction==='column'?'uni-steps__column-line--before':'uni-steps__row-line--before']"
					 :style="{backgroundColor:index<=active&&index!==0?activeColor:index===0?'transparent':'#3481F2'}"></view>
					<view :class="[direction==='column'?'uni-steps__column-check':'uni-steps__row-check']" v-if="index === active">
						<!-- <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons> -->
					</view>
					<view :class="[direction==='column'?'uni-steps__column-circle':'uni-steps__row-circle']" v-else :style="{backgroundColor:index<active?activeColor:deactiveColor}"></view>
					<view :class="[direction==='column'?'uni-steps__column-line':'uni-steps__row-line',direction==='column'?'uni-steps__column-line--after':'uni-steps__row-line--after']"
					 :style="{backgroundColor:index<active&&index!==options.length-1?activeColor:index===options.length-1?'transparent':'#3481F2'}"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	export default {
		name: 'UniSteps',
		components: {
			uniIcons
		},
		props: {
			direction: {
				// 排列方向 row column
				type: String,
				default: 'row'
			},
			activeColor: {
				// 激活状态颜色
				type: String,
				default: '#1aad19'
			},
			deactiveColor: {
				// 未激活状态颜色
				type: String,
				default: '#ffffff'
			},
			active: {
				// 当前步骤
				type: Number,
				default: 0
			},
			options: {
				type: Array,
				default () {
					return []
				}
			} // 数据
		},
		data() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-steps {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		flex-direction: column;
	}

	.uni-steps__row {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.uni-steps__column {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row-reverse;
	}

	.uni-steps__row-text-container {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-steps__column-text-container {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		flex: 1;
	}

	.uni-steps__row-text {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		flex: 1;
		flex-direction: column;
	}

	.uni-steps__column-text {
		padding: 10px 0px 2px;
		/* border-bottom-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: $uni-border-color; */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.uni-steps__row-title {
		font-size: $uni-font-size-base;
		line-height: 16px;
		text-align: center;
	}

	.uni-steps__column-title {
		font-size: 13px;
		text-align: left;
		line-height: 18px;
		color: #AFAFAF;
	}

	.uni-steps__row-desc {
		font-size: 12px;
		line-height: 14px;
		text-align: center;
	}

	.uni-steps__column-desc {
		font-size: 13px;
		text-align: left;
		line-height: 18px;
		width: 492rpx;
		color: #AFAFAF;
	}

	.uni-steps__row-container {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-steps__column-container {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		width: 30px;
		flex-direction: column;
	}

	.uni-steps__row-line-item {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		flex-direction: row;
		flex: 1;
		height: 14px;
		line-height: 14px;
		align-items: center;
		justify-content: center;
	}

	.uni-steps__column-line-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		flex: 1;
		align-items: center;
		justify-content: center;
	}

	.uni-steps__row-line {
		flex: 1;
		height: 1px;
		background-color: $uni-text-color-grey;
	}

	.uni-steps__column-line {
		width: 1px;
		background-color: $uni-text-color-grey;
	}

	.uni-steps__row-line--after {
		transform: translateX(1px);
	}

	.uni-steps__column-line--after {
		flex: 1;
		transform: translate(0px, 1px);
	}

	.uni-steps__row-line--before {
		transform: translateX(-1px);
	}

	.uni-steps__column-line--before {
		height: 12px;
		transform: translate(0px, -1px);
	}

	.uni-steps__row-circle {
		width: 5px;
		height: 5px;
		border-radius: 100px;
		background-color: $uni-text-color-grey;
		margin: 0px 3px;
	}

	.uni-steps__column-circle {
		width: 8px;
		height: 8px;
		border-radius: 100px;
		border: 1px solid #3481F2;
		background-color: #FFFFFF;
		//margin: 4px 0px 5px 0px;
	}

	.uni-steps__row-check {
		margin: 0px 6px;
	}

	.uni-steps__column-check {
		width: 8px;
		height: 8px;
		/* line-height: 14px;
		margin: 2px 0px; */
		border-radius: 100px;
		border: 1px solid #3481F2;
		background-color: #3481F2;
		//margin: 4px 0px 5px 0px;
	}
</style>
