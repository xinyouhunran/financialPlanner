<template>
	<view class="l-record" >
		<view class="l-record-content">
			<view class="l-record-content-item" >
				<span class="l-record-content-text" v-for="(s,i) in dataInfo.list" :key="i"
				 :style="{ width: dataInfo.list && dataInfo.list.length > 3 ? i == 0 ? '100rpx' : '140rpx' : 'auto' }">
				 <span class="l-color-vs" v-if="i != 0">VS</span>
					{{ s.secShortName || '' }}
				</span>
			</view>
		</view>
		<view class="l-record-date">
			创建时间: {{ dataInfo.date }}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			dataInfo: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped>
	.l-record{
		width: 100%;
		font-size: 30rpx;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #EDEDED;
	}
	
	.l-record-content{
		display: flex;
		align-items: center;
	}
	
	.l-record-content-item{
		display: flex;
		align-items: center;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.l-record-content-text{
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.l-record-date{
		font-size: 26rpx;
		color: #828282;
		margin-top: 30rpx;
	}
	
	.l-color-vs{
		white-space: nowrap;
		color: #AC9472;
		margin:0 8rpx;
	}
</style>
