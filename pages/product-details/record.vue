<template>
	<view class="l-record">
		
		<!-- <view class="l-record-list">
			<view class="l-record-title">
				产品详情
			</view>
			<view class="l-record-content">
				<image class="l-road-img" src="../../static/road/tu@2x.png" mode="aspectFill"></image>
			</view>
		</view> -->
		
		<view class="l-record-list" v-if="peopleInfo.personId">
			<view class="l-record-title">
				基金经理
			</view>
			<view class="l-record-content">
				<view class="l-people"  @tap="$nav({ url: '/pages/people-details/people-details?id=' + peopleInfo.personId })">
					<view class="l-people-left">
						<image class="l-people-img" :src="dataInfo.headPortrait ? dataInfo.headPortrait : '../../static/ren@2x.png'" mode="aspectFill"></image>
					</view>
					<view class="l-people-right">
						<view class="l-people-right-main">
							<view class="l-prm-left">
								<view class="l-prm-left-name">{{ peopleInfo.realName }}</view>
								<view class="l-prm-left-intr">从业近{{ workYear }}年 {{ fundCounts }}</view>
							</view>
							<!-- <view class="l-prm-right">
								<span class="l-prm-right-circle">●</span>
								<span>直聊他</span>
							</view> -->
						</view>
						<view class="l-people-right-foot">
							<view class="l-prf-left">
								累计收益: <span style="color: #E70012;">{{ peopleInfo.returnAccum || '--' }}</span>
							</view>
							<view class="l-prf-right">
								今年收益: <span style="color: #E70012;">{{ peopleInfo.returnA || '--' }}</span>
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		
		<!-- <view class="l-record-list">
			<view class="l-record-title">
				产品路演
			</view>
			<view class="l-record-content">
				<road-list :recordInfo="recordInfo"></road-list>
				<view class="l-road-more">
					查看更多&gt;
				</view>
			</view>
		</view> -->
		
		<view class="l-record-list">
			<view class="l-record-title">
				基本资料
			</view>
			<view class="l-record-content">
				<view class="l-list">
					<view class="l-label">
						基金全称 
					</view>
					<view class="l-value">
						{{ recordInfo.secFullName || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						基金简称
					</view>
					<view class="l-value">
						{{ recordInfo.partyShortName || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						备案编号 
					</view>
					<view class="l-value">
						{{ recordInfo.recordCd || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						成立日期 
					</view>
					<view class="l-value">
						{{ recordInfo.establishDate || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						基金经理 
					</view>
					<view class="l-value l-color-836438" @tap="peopleInfo.personId && $nav({ url: '/pages/people-details/people-details?id=' + peopleInfo.personId })">
						{{ peopleInfo.realName || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						投资顾问 
					</view>
					<view class="l-value l-color-836438" @tap="dataInfo.partyId && $nav({ url: '/pages/company-details/company-details?id=' + dataInfo.partyId })">
						{{ dataInfo.partyShortName || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						管理人 
					</view>
					<view class="l-value l-color-836438" @tap="dataInfo.partyId && $nav({ url: '/pages/company-details/company-details?id=' + dataInfo.partyId })">
						{{ dataInfo.partyShortName || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						托管人 
					</view>
					<view class="l-value">
						{{ recordInfo.custodian || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						运行状态 
					</view>
					<view class="l-value">
						{{ recordInfo.status || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						初始规模 
					</view>
					<view class="l-value">
						{{ recordInfo.scaleInitial || '保密' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						存续期限 
					</view>
					<view class="l-value">
						{{ recordInfo.duration || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						产品类型 
					</view>
					<view class="l-value">
						{{ recordInfo.pfStyle || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						投资策略 
					</view>
					<view class="l-value">
						{{ recordInfo.investStrategy || '--' }} / {{ recordInfo.investStrategyChild || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						开放日 
					</view>
					<view class="l-value">
						{{ recordInfo.openDateDesc || '--' }} 
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						追加起点 
					</view>
					<view class="l-value">
						{{ recordInfo.minAdd || '--' }} 
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						预警线 
					</view>
					<view class="l-value">
						{{ recordInfo.warnLine || '--' }} 
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						止损线 
					</view>
					<view class="l-value">
						{{ recordInfo.stopLossLine || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						是否分级
					</view>
					<view class="l-value">
						{{ recordInfo.fen || '--' }}
					</view>
				</view>
				<view class="l-list">
					<view class="l-label">
						是否伞形 
					</view>
					<view class="l-value">
						{{ recordInfo.san || '--' }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import roadList from '../tabbar/componens/road-list.vue';
	
	export default{
		components:{
			roadList
		},
		props:{
			recordInfo:{
				type: Object,
				default(){
					return {}
				}
			},
			dataInfo:{
				type: Object,
				default(){
					return {}
				}
			},
			peopleInfo: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		computed:{
			fundCounts(){
				return this.peopleInfo.fundCounts === '认证可见' ? this.peopleInfo.fundCounts : `旗下${ this.peopleInfo.fundCounts }只产品`;
			},
			workYear(){
				return this.peopleInfo.workYear ? parseFloat(this.peopleInfo.workYear) : 10;
			}
		}
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
	
	.l-color-836438{
		color: #836438;
	}
</style>
