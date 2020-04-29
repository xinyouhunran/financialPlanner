<template>
	<view class="l-container">
		<view class="l-ear-head">
			<view class="l-ear-place">
				<view class="l-title-nview-status"></view>
				<view class="l-title-nview">
					<view class="l-title-nview-back"  @tap="$back()">
						<image class="l-icon-back" src="../../static/mine/back@2x.png" mode="aspectFill"></image>
					</view>
					<view class="l-title-nview-h1">
						基金账本
					</view>
				</view>
			</view>
			
			<view class="l-ear-view">
				<view class="l-ear-view-body">
					<view class="l-ev-txt-1">
						{{ dataInfo.totalMarkValue || '--' }}
					</view>
					<view class="l-ev-txt-2">
						总参考市值(万)
					</view>
					<view class="l-ev-txt-3">
						({{ nowStr || '--' }})
					</view>
				</view>
			</view>
			
			<view class="l-ear-view">
				<view class="l-ear-view-body">
					<view class="l-ev-txt-1">
						{{ dataInfo.totalPrincipal || '--' }}
					</view>
					<view class="l-ev-txt-2">
						总参考本金(万)
					</view>
					<view class="l-ev-txt-3">
						({{ nowStr || '--' }})
					</view>
				</view>
				<view class="l-ear-view-body">
					<view class="l-ev-txt-1">
						{{ dataInfo.totalProfit || '--' }}
					</view>
					<view class="l-ev-txt-2">
						总参考收益(万)
					</view>
					<view class="l-ev-txt-3">
						({{ nowStr || '--'}})
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="l-ear-body">
			
			<view class="l-ear-body-title">
				<view class="l-ebt-title">
					我的账本
				</view>
				<view class="l-ebt-btn" @tap="goTallySearch">
					<span>+</span>
					<span>新增</span>
				</view>
			</view>
			
			<view class="l-ear-body-content">
				
				<view class="l-layout-lcr l-ebc-head">
					<view class="l-layout-item l-layout-left">
						<view class="l-layout-item-value">{{ dataInfo.totalMarkValue || '--' }}</view>
						<view class="l-layout-item-label">参考市值(万)</view>
					</view>
					<view class="l-layout-item l-layout-center">
						<view class="l-layout-item-value">{{ dataInfo.totalPrincipal || '--' }}</view>
						<view class="l-layout-item-label">参考本金(万)</view>
					</view>
					<view class="l-layout-item l-layout-right">
						<view class="l-layout-item-value">{{ dataInfo.totalProfit }}</view>
						<view class="l-layout-item-label">参考收益<span style="font-size: 22rpx;">({{ nowStr || '--' }})</span></view>
					</view>
				</view>
				
				<view class="l-ebc-item" v-for="(s, i) in dataList" :key="i" @tap="$nav({ url: '/pages/tally/tally-detail?id='+ s.id})">
					<view class="l-ebc-item-head">
						{{ s.secShortName || s.secFullName || '--' }}
					</view>
					<view class="l-ebc-item-body">
						<view class="l-layout-lcr l-ebc-head">
							<view class="l-layout-item l-layout-left">
								<view class="l-layout-item-value">{{ s.markValue || '--' }}</view>
								<view class="l-layout-item-label">参考市值(万)</view>
							</view>
							<view class="l-layout-item l-layout-center">
								<view class="l-layout-item-value">{{ s.profit || '--' }}</view>
								<view class="l-layout-item-label">参考收益(万)</view>
							</view>
							<view class="l-layout-item l-layout-right">
								<view class="l-layout-item-value">{{ s.nav || '--' }}</view>
								<view class="l-layout-item-label">
									<span>最新净值</span>
									<span style="font-size: 22rpx;" v-if="s.buyDateStr">({{ s.buyDateStr }})</span>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="example-body" v-if="status !== statusOption.noMore">
					<uni-load-more :status="status" />
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {
				isTop: false,
				dataInfo: {},
				dataList: [],
				params: {
					'pageInfo.pageIndex': 1,
					'pageInfo.pageSize': 10
				},
				status: 'loading',
				statusOption: {
					loading:'loading',
					more: 'more',
					noMore: 'noMore'
				},
				total: 0,
				nowStr: '01-01'
			}
		},
		computed:{
			...mapState({
				hasLogin:'hasLogin',
				qualified:'qualified',
				user:'user',
				employmentCertStatus:'employmentCertStatus'
			})
		},
		onReachBottom() {
			let pageInfo = this.params;
			let list = this.dataList;
			let pageIndex = pageInfo['pageInfo.pageIndex'];
			let pageSize = pageInfo['pageInfo.pageSize'];
			let total = this.total;
			let length = pageIndex * pageSize;
			if(length < total && list.length === length){
				++this.params['pageInfo.pageIndex']
				this.fundList();
			}
		},
		onPageScroll(e) {
			let top = e.scrollTop;
			if(top > 10){
				if(!this.isTop){
					this.isTop = !this.isTop;
				}
			}else{
				if(this.isTop){
					this.isTop = !this.isTop;
				}
			}
		},
		onLoad() {
			this.nowStr = this.getDateStr();
		},
		onShow() {
			this.init();
		},
		methods:{
			init(){
				this.params['pageInfo.pageIndex'] = 1;
				this.dataList = [];
				this.fundAccount();
				this.fundList();
			},
			fundAccount(){
				let _this = this;
				let params = _this.params;
				let url = 'user/fundAccount/index';
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || {};
						let list = [
							'totalMarkValue',
							'totalPriMarkValue',
							'totalPrincipal',
							'totalProfit',
							'totalRaisedMarkValue'
						]
						_this.$store.dispatch('getUserFn');
						// list.forEach(e => {
						// 	info[e] = _this.$tranNumber(info[e] || 0)
						// })
						_this.dataInfo = info;
					}
				})
			},
			fundList(){
				let _this = this;
				let params = _this.params;
				let url = 'user/fundAccount/list';
				_this.status = _this.statusOption.loading;
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || {};
						
						_this.total = info.pageInfo && info.pageInfo.recordCount || 0;
						
						let data = info.list || [];
						
						data.forEach(e => {
							if(e.navDate && e.navDate !== '认证可见'){
								e.buyDateStr = this.getDateStr(e.navDate);
							}
						})
						_this.dataList = _this.dataList.concat(data);
						console.log(_this.dataList.length)
						if(_this.dataList.length == _this.total){
							_this.status = _this.statusOption.noMore;
						}
					}
				})
			},
			getDateStr(buyDate){
				let d = buyDate ? new Date(buyDate.replace(/\-/g,'/')) : new Date();
				return [d.getMonth() + 1, d.getDate()].map(e => e > 9 ? e : '0' + e).join('-')
			},
			goTallySearch(){
				if(this.qualified){
					this.$nav({ url: '/pages/tally/tally-search' })
				}else{
					this.$toast('未认证,即将跳转认证页面',{
						fn:()=>{
							setTimeout(()=>{
								this.$nav({ url: '/pages/approve/approve' })
							},3000)
						}
					})
				}		
			}
		}
	}
</script>

<style scoped>
	@import url("./earnings.css"); 
</style>

<style scoped>
	.l-layout-lcr{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.l-layout-left{
		text-align: left;
	}
	
	.l-layout-center{
		text-align: center;
	}
	
	.l-layout-right{
		text-align: right;
	}
	
	.l-layout-item-value{
		color: #000000;
		font-size: 30rpx;
		font-weight: bold;
	}
	
	.l-layout-item-label{
		font-size: 26rpx;
		color: #828282;
		margin-top: 16rpx;
	}
</style>