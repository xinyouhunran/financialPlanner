<template>
	<view class="l-record">
		
		<!-- <view class="l-record-list">
			<view class="l-record-title">
				经理荣誉
			</view>
			<view class="l-record-content">
				<view class="l-record-txt">
					{{ dataInfo.education || '' }}
				</view>
			</view>
		</view> -->
		
		<view class="l-record-list">
			<view class="l-record-title">
				公司简介
			</view>
			<view class="l-record-content">
				<view class="l-record-txt">
					{{ dataInfo.profile || '' }}
				</view>
			</view>
		</view>
		
		<view class="l-record-list">
			<view class="l-record-title">
				公司档案
			</view>
			<view class="l-record-content">
				<view class="l-list">
					<view class="l-label">
						公司全称
					</view>
					<view class="l-value">
						{{ dataInfo.partyFullName || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						公司简称
					</view>
					<view class="l-value">
						{{ dataInfo.partyShortName || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						备案号
					</view>
					<view class="l-value">
						{{ dataInfo.regCd || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						所在地区
					</view>
					<view class="l-value">
						{{ dataInfo.regCity || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						注册资金
					</view>
					<view class="l-value">
						{{ dataInfo.regCap ? dataInfo.regCap + '万' : '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						成立时间
					</view>
					<view class="l-value">
						{{ dataInfo.recordDate || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						机构类型
					</view>
					<view class="l-value">
						{{ dataInfo.mainFundType || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						会员类型
					</view>
					<view class="l-value">
						{{ dataInfo.isMember ? '会员' : '非会员' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						管理规模
					</view>
					<view class="l-value">
						{{ dataInfo.scale || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						核心人物
					</view>
					<view class="l-value">
						{{ dataInfo.keyPerson || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						代表作品
					</view>
					<view class="l-value">
						{{ dataInfo.repSecurityFullName || '--' }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default{
		props:{
			dataInfo:{
				type: Object,
				default(){
					return {}
				}
			}
		},
	}
</script>

<style scoped>
	
	.l-icon-stop {
		width: 32rpx;
		height: 32rpx;
		margin-right: 16rpx;
		background-image: url('~@/static/road/bofang@2x.png');
	}
	
	.l-icon-wenhao{
		width: 28rpx;
		height: 28rpx;
		vertical-align: middle;
		margin-left: 10rpx;
		background-image: url('~@/static/product/wenhao@2x.png');
	}
	
	.l-record{
		background-color: #FFFFFF;
		padding: 0 30rpx;
	}
	
	.l-record-list{
		width: 100%;
		padding-bottom: 68rpx;
	}
	
	.l-record-title{
		font-size: 16px;
		font-weight: bold;
		border-bottom: 1rpx solid #EDEDED;
		padding-bottom: 30rpx;
		margin-bottom: 31rpx;
	}
	
	.l-road-img{
		width: 100%;
		height: 320rpx;
	}

	.l-record-txt{
		line-height: 1.7;
		font-size: 15px;
	}
	
	.l-people{
		display: flex;
		align-items: center;
	}
	
	.l-people-left{
		width: 138rpx;
		height: 138rpx;
		margin-right: 31rpx;
	}
	
	.l-people-img{
		width: 138rpx;
		height: 138rpx;
		border-radius: 50%;
	}
	
	.l-people-right{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.l-people-right-main{
		display: flex;
		align-items: center;
	}
	
	.l-prm-left{
		width: calc(100% - 150rpx);
		margin-right: 30rpx;
	}
	
	.l-prm-left-name{
		font-size: 16px;
		font-weight: bold;
	}
	
	.l-prm-left-intr{
		font-size: 12px;
		color: #828282;
		padding-top: 13rpx;
	}
	
	.l-prm-right{
		width: 120rpx;
		height: 50rpx;
		font-size: 12px;
		color: #836438;
		display: flex;
		border: 1rpx solid;
		border-radius: 25rpx;
		align-items: center;
		justify-content: center;
	}
	
	.l-prm-right-circle{
		font-size: 12px;
		margin-right: 4rpx;
	}
	
	.l-people-right-foot{
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-top: 41rpx;
		white-space: nowrap;
	}
	
	.l-prf-left{
		margin-right: 25rpx;
	}
	
	.l-road-more{
		width: 100%;
		height: 60rpx;
		font-size: 13px;
		color: #836438;
		display: flex;
		margin-top: 12rpx;
		background-color: #F4F4F4;
		align-items: center;
		justify-content: center;
	}
	
	.l-list{
		width: 100%;
		display: flex;
		margin-top: 32rpx;
	}
	
	.l-list:first-of-type{
		margin-top: 0;
	}
	
	.l-label{
		width: 199rpx;
		color: #828282;
		font-size: 15px;
		line-height: 1.5;
	}
	
	.l-value{
		color: #000000;
		font-size: 15px;
		width: calc(100% - 199rpx);
		line-height: 1.5;
	}
</style>
