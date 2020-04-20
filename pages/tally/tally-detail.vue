<template>
	<view class="l-container">
		<view class="l-ear-top" @tap="$nav({ url: '/pages/product-details/product-details?id='+dataInfo.securityId })">
			<view class="l-ear-title">
				{{ dataInfo.secShortName || dataInfo.secFullName || '--' }}
			</view>
			<view class="l-ear-detail">
				<span>详情</span>
				<image class="l-icon-gt" src="../../static/app/gt.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="l-ear-head">
			<view class="l-ear-view">
				<view class="l-ear-view-body">
					<view class="l-ev-txt-1">
						{{ dataInfo.markValue || '--' }}
					</view>
					<view class="l-ev-txt-2">
						总参考市值(万)
					</view>
				</view>
			</view>
			
			<view class="l-ear-view">
				<view class="l-ear-view-body">
					<view class="l-ev-txt-1">
						{{ dataInfo.principal || '--' }}
					</view>
					<view class="l-ev-txt-2">
						总参考本金(万)
					</view>
				</view>
				<view class="l-ear-view-body">
					<view class="l-ev-txt-1">
						{{ dataInfo.profit || '--' }}
					</view>
					<view class="l-ev-txt-2">
						总参考收益(万)
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="l-ear-content">
			<view class="l-ec-item">
				<view class="l-ec-label">
					申购时间
				</view>
				<view class="l-ec-value">
					{{ dataInfo.buyDate || '--' }}
				</view>
			</view>
			<view class="l-ec-item">
				<view class="l-ec-label">
					申购时净值
				</view>
				<view class="l-ec-value">
					{{ dataInfo.thenNav }}
					<span class="l-ec-value-sub" v-if="dataInfo.buyDate">（{{ dataInfo.buyDate }}）</span>
				</view>
			</view>
			<view class="l-ec-item">
				<view class="l-ec-label">
					申购金额
				</view>
				<view class="l-ec-value">
					{{ dataInfo.principal }}
					<span class="l-ec-value-sub">（万）(不含手续费)</span>
				</view>
			</view>
			<view class="l-ec-item">
				<view class="l-ec-label">
					最新份额
				</view>
				<view class="l-ec-value">
					{{ dataInfo.share }}
					<span class="l-ec-value-sub">万份</span>
				</view>
			</view>
			<view class="l-ec-item">
				<view class="l-ec-label">
					最新净值
				</view>
				<view class="l-ec-value">
					{{ dataInfo.nav }}
					<span class="l-ec-value-sub" v-if="dataInfo.navDate">（{{ dataInfo.buyDateStr }}）</span>
				</view>
			</view>
			<view class="l-ec-explain">
				声明：以上数据仅供参考，请以基金管理人出具的确认函或
				公告为准。如有疑问，请<span style="color: #1C46DB;" @tap="$nav({ url: '/pages/service/service' })">联系客服</span>反馈您的宝贵意见。
			</view>
		</view>
		
		
		<view class="l-foot">
			<view class="l-foot-item l-foot-item-1" @tap="del">
				<image class="l-foot-img" src="../../static/scd-del@2x.png" mode="aspectFill"></image>
				<span>删除</span>
			</view>
			<view class="l-foot-item" @tap="$nav({ url: '/pages/tally/tally?type=edit&id=' + dataInfo.id})">
				<image class="l-foot-img" src="../../static/bj@2x.png" mode="aspectFill"></image>
				<span>编辑</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				dataInfo: {},
				id: ''
			}
		},
		onLoad(e) {
			this.id = e.id || '';
			
			this.init()
		},
		methods:{
			init(){
				this.fundList()
			},
			fundList(){
				let _this = this;
				let params = { id: _this.id };
				let url = 'user/fundAccount/list';
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || {};
						
						let data = info.list || [];
						
						data.forEach(e => {
							if(e.buyDate && e.navDate !== '认证可见'){
								e.buyDate = _this.$yymmdd(e.buyDate)
							}
							if(e.navDate && e.navDate !== '认证可见'){
								e.buyDateStr = _this.getDateStr(e.navDate);
							}
						})
						
						_this.dataInfo = data[0];
						
						
					}
				})
			},
			getDateStr(buyDate){
				let d = buyDate ? new Date(buyDate.replace(/\-/g,'/')) : new Date();
				return [d.getMonth() + 1, d.getDate()].map(e => e > 9 ? e : '0' + e).join('-')
			},
			del(){
				let _this = this;
				_this.$showModal('确定删除该记账吗？',{
					success(){
						let params = { ids: [_this.id] };
						let url = 'user/fundAccount/remove';
						_this.$post(url, params)
						.then(res => {
							if(res.code == 200){
								_this.$back();
								setTimeout(() => {
									_this.$toast('删除成功');
								},500)
							}else{
								_this.$toast(res.message);
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.l-container{
		box-sizing: border-box;
		padding-bottom: 117rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
	}
	
	.l-ear-view{
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 32rpx;
		color: #000000;
		background-color: #FFFFFF;
	}
	
	.l-ear-view-body{
		flex: 1;
		text-align: center;
	}
	
	.l-ev-txt-1{
		font-size: 50rpx;
		font-weight: bold;
	}
	
	.l-ev-txt-2{
		font-size: 28rpx;
		color: #828282;
		padding: 20rpx 0 16rpx;
	}
	
	.l-ev-txt-3{
		font-size: 24rpx;
	}
	
	.l-icon-gt{
		width: 18rpx;
		height: 28rpx;
		margin-left: 14rpx;
	}
	
	.l-ear-top{
		width: 100%;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding: 36rpx 32rpx;
	}
	
	.l-ear-top{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.l-ear-title{
		flex: 1;
		font-size: 36rpx;
		font-weight: bold;
		color: #000000;
		display: block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.l-ear-detail{
		color: #E70012;
		margin-left: 32rpx;
		font-size: 32rpx;
	}

	.l-ec-item{
		display: flex;
		align-items: center;
		height: 102rpx;
		border-bottom: 1rpx solid #EDEDED;
	}
	
	.l-ec-label{
		width: 156rpx;
		white-space: nowrap;
		color: #828282;
		font-size: 32rpx;
		margin-right: 51rpx;
	}
	
	.l-ec-value{
		display: flex;
		height: 100%;
		font-size: 32rpx;
		color: #000000;
		align-items: center;
	}
	
	.l-ec-value-sub{
		color: #828282;
		font-size: 26rpx;
		margin-left: 10rpx;
	}

	.l-ear-content{
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		margin: 20rpx 0;
		background-color: #FFFFFF;
	}
	
	.l-ec-explain{
		padding: 39rpx 0;
		font-size: 24rpx;
		color: #828282;
		line-height: 1.2;
	}
	
	.l-foot-img {
		width: 44rpx;
		height: 44rpx;
		margin-right: 37rpx;
	}
	
	.l-foot{
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 0;
		height: 117rpx;
		color: #E70012;
		display: flex;
		font-size: 36rpx;
		background-color: #FFFFFF;
	}
	
	.l-foot-item{
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.l-foot-item-1{
		border-right: 1rpx solid #EDEDED;
		color: #FFFFFF;
		color: #828282;
	}
</style>
