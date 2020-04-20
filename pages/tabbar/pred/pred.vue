<template>
	<!-- :style="{ overflow: hidden ? 'hidden' : 'auto' }" -->
	<view class="l-container" >
		<titleNView-bg @keyword="keyword"></titleNView-bg>
		
		<view class="l-body-view l-body-view-1">
			<select-option @getOption="getOption" @getOptionList="getOptionList"></select-option>
		</view>
		<view class="l-body-view l-body-view-2">
			<scroll-view scroll-y="true" class="l-scroll" @scrolltolower="reachBottom">
				<view>
					<pred-table :dataList="dataList"></pred-table>
					<view class="example-body">
						<uni-load-more :status="status" />
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import selectOption from '../componens/select-option.vue';
	import predTable from '../componens/pred-table.vue';
	import titleNViewBg from '../componens/l-titleNView-bg.vue';
	
	export default{
		components:{
			titleNViewBg,predTable,selectOption
		},
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
		
		computed:{
			hasLogin(){
				return this.$store.getters.hasLogin
			},
			qualified(){
				return this.$store.getters.qualified
			}
		},
		watch:{
			qualified(){
				console.log(111)
				uni.pageScrollTo({
					duration:1000,
					scrollTop:0
				})
				this.params['pageInfo.pageIndex'] = 1;
				this.dataList = [];
				setTimeout(() => {
					this.init()
				},1000)
			}
		},
		methods:{
			init(){
				this.rankingSimple();
			},
			reachBottom() {
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
					if(e.index == -1){
						_this[e.keys] = '';
					}else{
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
				console.log(pfStyle)
				let params = _this.$json(_this.params)
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

<style scoped>
	page,
	body,
	html,
	.l-container{
		width: 100%;
		
		/* #ifdef APP-PLUS */
		min-height: 100vh;
		/* #endif */
		/* #ifdef H5 */
		min-height: calc(100vh - 50px);
		/* #endif */
		position: relative;
		background-color: #FFFFFF;
	}
	
	.l-body-view-1{
		width: 100%;
		height: 100rpx;
		position: relative;
		z-index: 22;
	}
	
	.l-body-view-2{
		position: relative;
		z-index: 21;
	}
	
	.l-scroll{
		width: 100%;
		height: calc(100vh - 240rpx - 50px);
	}
</style>
