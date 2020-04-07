<template>
	<view>
		<view class="rank">
			<view class="l-status"></view>
			<view class="l-flex l-view rank-search l-flex-ai_c l-flex-jc_sb">
				<view class="backwhite" @tap="$back(1)">
					<image src="../../static/backwhite@2x.png" mode=""></image>
				</view>
				<view class="rank-input l-flex">
					<span class="l-icon l-icon-search"></span>
					<view class="af">
						请输入基金/经理/公司名称搜索
					</view>
				</view>
			</view>
		</view>
		<view class="l-body-view-1">
			<select-option @getOption="getOption" @getOptionList="getOptionList"></select-option>
		</view>
		<view class="l-body-view-2">
			<pred-table :dataList="dataList"></pred-table>
			<view class="example-body">
				<uni-load-more :status="status" />
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				dataList: [],
				total: 0,
				status: 'loading',
				statusOption: {
					loading:'loading',
					more: 'more',
					noMore: 'noMore'
				},
				params: {
					'pageInfo.pageSize': 10,
					'pageInfo.pageIndex': 1
				},
				key:'',
				pfStyle: '',
				regCity: '',
				returnOfEstablish: '',
				san: '',
				investStrategy: '1',
				searchInterval: '1',
				searchType: '',
				valueNumCd: ''
			}
		},
		onLoad() {
			this.init();
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
				this.rankingSimple();
			}
		},
		methods:{
			init(){
				this.rankingSimple();
			},
			keyword(key){
				this.key = key;
				this.initParma();
			},
			getOption(i, keys, bool){
				this[keys] = i;
				if(bool){
					this.initParma();
				}
			},
			getOptionList(list){
				let _this = this;
				list.forEach(e => {
					if(e.index != -1){
						_this[e.keys] = e.list[e.index].num;
					}
				})
				this.initParma();
			},
			initParma(){
				this.params['pageInfo.pageIndex'] = 1;
				this.dataList = [];
				this.rankingSimple();
			},
			/*
			* 获取排行榜数据
			*/
			rankingSimple(){
				let _this = this;
				let { 
					params,
					key,
					pfStyle,
					regCity,
					returnOfEstablish,
					san,
					investStrategy,
					searchInterval,
					searchType,
					valueNumCd ,
				} = _this;
				
				key && (params.key = key);
				san && (params.san = san);
				regCity && (params.regCity = regCity);
				pfStyle && (params.pfStyle = pfStyle);
				searchType && (params.searchType = searchType);
				valueNumCd && (params.valueNumCd = valueNumCd);
				investStrategy && (params.investStrategy = investStrategy);
				searchInterval && (params.searchInterval = searchInterval);
				returnOfEstablish && (params.returnOfEstablish = returnOfEstablish);
				
				let url = 'business/rankingSimple';
				_this.status = _this.statusOption.loading;
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || {};
						_this.total = info.pageInfo && info.pageInfo.recordCount || 0;
						
						let data = info.list || [];
						
						_this.dataList = _this.dataList.concat(data);
						
						if(_this.dataList.length == _this.total){
							_this.status = _this.statusOption.noMore;
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.rank{
	height: 192rpx; 
	background: url('../../static/ranking_back.png') no-repeat;
	background-size: cover;
	overflow: hidden;
	position: fixed;
	width: 100%;
	top: 0;
}
.backwhite{
	width: 21rpx;
	height: 37rpx;
}
.rank-search{
	margin-top: calc(102rpx - var(--status-bar-height));
}
.rank-input{
	width: 88%;
	background-color: #FFFFFF;
	border-radius: 30rpx;
	padding: 15rpx 20rpx;
	.af{
		color: #afafaf;
		font-size: 12px;
	}
}
.l-icon-search{
	width: 30rpx;
	height: 30rpx;
	margin-right: 11rpx;
	background-image: url('~@/static/sousuo@2x.png');
}
.l-body-view-1{
	position: fixed;
	top: 192rpx;
}
.l-body-view-2{
	margin-top: 292rpx;
}
</style>
