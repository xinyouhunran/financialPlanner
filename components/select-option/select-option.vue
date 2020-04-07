<template>
	<view class="l-module">
		<view class="l-module-bg" :class="{ none: isBg }"></view>
		<view class="l-module-body l-flex l-flex-jc_sa l-flex-ai_c">
			<view class="l-select-item" @tap="menuDown(0)">
				{{ investStrategyList[investStrategyIndex].title }} <text class="l-icon l-icon-down"></text>
			</view>
			<view class="l-select-item" @tap="menuDown(1)">
				{{ searchIntervalList[searchIntervalIndex].title }} <text class="l-icon l-icon-down"></text>
			</view>
			<view class="l-select-item" @tap="menuDown(2)">
				筛选 <text class="l-icon l-icon-filter"></text>
			</view>
		</view>
		
		<view class="l-down-list"  :class="{ opacity: isRead }"
		:style="{ height: isNone ? 'auto' : downHeightList[0] + 'px'}">
			<view>
				<view class="l-down-view">
					<view class="l-down-item" :class="{ 'l-down-item-active': investStrategyIndex == i }"
					v-for="(s, i) in investStrategyList" :key="i" @tap="selectTabFn(s, i, 'investStrategyIndex', 'investStrategy')">
						{{ s.title }}
					</view>
				</view>
			</view>
		</view>
		
		<view class="l-down-list"  :class="{ opacity: isRead }" 
		:style="{ height: isNone ? 'auto' : downHeightList[1] + 'px'}">
			<view>
				<view class="l-down-view">
					<view class="l-down-item" :class="{ 'l-down-item-active': searchIntervalIndex == i }"
					v-for="(s, i) in searchIntervalList" :key="i" @tap="selectTabFn(s, i, 'searchIntervalIndex', 'searchInterval')">
						{{ s.title }}
					</view>
				</view>
			</view>
		</view>
		
		<view class="l-down-list" :class="{ opacity: isRead }"
		:style="{ height: isNone ? 'auto' : downHeightList[2] + 'px'}">
			<view v-for="(ss,u) in styleList " :key="u">
				<view class="l-down-head">{{ ss.title }}</view>
				<view class="l-down-view">
					<view class="l-down-item" :class="{ 'l-down-item-active': ss.index == i }"
					v-for="(s, i) in ss.list" :key="i" @tap="selectTabMuchFn(ss, i)">
						{{ s.title }}
					</view>
				</view>
			</view>
			
			<view class="l-down-button" :class="{ none: downHeightList[2] == 0 }">
				<button class="l-btn l-down-btn " @tap="reset(2)">重置</button>
				<button class="l-btn l-down-btn l-down-btn-confirm" @tap="confirm(2)">确认</button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				downHeightList: [],
				isActive: [],
				isNone: true,
				isRead:false,
				investStrategyIndex: 0,
				investStrategyList: [
					{ title: '股票策略', num: '1' },
					{ title: '相对价值', num: '2' },
					{ title: '宏观策略', num: '3' },
					{ title: '事件驱动', num: '4' },
					{ title: '组合基金', num: '5' },
					{ title: '债券策略', num: '6' },
					{ title: '管理期货', num: '7' },
					{ title: '复合策略', num: '8' },
					{ title: '其他策略', num: '9' }
				],
				searchIntervalIndex: 0,
				searchIntervalList:[
					{ title: '近一个月', num: '1' },
					{ title: '近三个月', num: '2' },
					{ title: '最近半年', num: '3' },
					{ title: '最近一年', num: '4' },
					{ title: '最近两年', num: '5' },
					{ title: '最近三年', num: '6' },
					{ title: '最近五年', num: '7' },
					{ title: '成产以来', num: '8' },
					{ title: '今年以来', num: '9' }
				],
				styleList:[
					{
						title: '产品类型',
						keys: 'pfStyle',
						index: -1,
						list: [
							{ title: '私募证券投资基金', num: '1' },
							{ title: '有限合伙', num: '2' },
							{ title: '信托', num: '3' },
							{ title: '券商集合理财', num: '4' },
							{ title: '期货资管', num: '5' },
							{ title: '海外基金', num: '6' },
							{ title: '公募专户及子公司', num: '7' },
							{ title: '单账户', num: '8' },
							{ title: '其他', num: '9' },
							{ title: '保险公司及其子公司的资产管理计划', num: '10' },
							{ title: '私募创业投资基金', num: '14' },
							{ title: '私募股权投资基金', num: '15' },
							{ title: '私募资产配置基金', num: '16' }
						]
					},
					{
						title: '所在地区',
						keys: 'regCity',
						index: -1,
						list: [
							{ title: '北京', num: '110000' },
							{ title: '上海', num: '310000' },
							{ title: '广州', num: '440100' },
							{ title: '深圳', num: '440300' }
						]
					},
					// {
					// 	title: '年化收益',
					// 	keys: 'returnOfEstablish',
					// 	index: -1,
					// 	list: [
					// 		{ title: '50%以上', num: '1' },
					// 		{ title: '40%～50%', num: '2' },
					// 		{ title: '30%~40%', num: '3' },
					// 		{ title: '20%~30%', num: '4' },
					// 		{ title: '10%~20%', num: '5' }
					// 	]
					// },
					{
						title: '是否伞形',
						keys: 'san',
						index: -1,
						list: [
							{ title: '非伞形', num: '0' },
							{ title: '伞形', num: '1' }
						]
					},
					{
						title: '搜索类型',
						keys: 'searchType',
						index: -1,
						list: [
							{ title: '区间收益', num: '0' },
							{ title: '年度收益', num: '1' }
						]
					}
				]
				
			}
		},
		computed:{
			isBg(){
				return this.downHeightList.filter(e => e != 0).length == 0;
			}
		},
		mounted() {
			this.getQuery()
			this.isRead = true;
		},
		methods:{
			getQuery(){
				let query = uni.createSelectorQuery().in(this);
				let _this = this;
				query.selectAll('.l-down-list')
				.boundingClientRect(data => {
					_this.downHeight = _this.downHeightList = data.map(e => e.height);
					_this.downHeightList = data.map(e => 0);
					_this.isActive = data.map(e => -1);
					_this.isNone = false;
				}).exec()
			},
			confirm(i){
				this.$set(this.downHeightList, i, 0);
				this.$emit('getOptionList', this.styleList);
			},
			reset(index){
				this.styleList.forEach((e, i) => {
					this.$set(this.styleList[i], 'index', -1);
				})
			},
			selectTabFn(s, i, keys, ukeys){
				this[keys] = i;
				this.$emit('getOption', s.num, ukeys, true);
				this.menuDown();
			},
			selectTabMuchFn(s, i){
				s.index = i;
				this.$emit('getOption', i, s.keys);
			},
			moveHandle(){},
			menuDown(i){
				
				this.downHeightList[i] = this.downHeightList[i] == 0 ? this.downHeight[i]  : 0;
				this.downHeightList = this.downHeight.map((e,ii) => ii != i ? 0 : e);
				this.$forceUpdate()
			}
		}
	}
</script>

<style scoped>
	.l-module{
		position: fixed;
		/* top: calc(140rpx + var(--status-bar-height)); */
		left: 0;
		width: 100%;
		min-height: 100rpx;
		background-color: #FFFFFF;
		/* box-shadow:0px 1rpx 2rpx 0px rgba(171,171,171,1); */
	}
	
	.l-module-bg{
		position: fixed;
		/* #ifdef APP-PLUS */
		top: calc(292rpx + var(--status-bar-height));
		height: calc(100vh - 292rpx - var(--status-bar-height));
		/* #endif */
		/* #ifdef H5 */
		top: 292rpx;
		height: calc(100vh - 292rpx);
		/* #endif */
		left: 0;
		width: 100%;
		
		z-index: 777;
		background-color: rgba(0,0,0,0.5);
	}
	
	.l-module-body{
		box-sizing: border-box;
		width: 100%;
		min-height: 100rpx;
		border-bottom: 1rpx solid #ABABAB;
	}
	
	.l-select-item{
		display: flex;
		align-items: center;
	}
	
	
	
	.l-icon-down{
		width: 24rpx;
		height: 13rpx;
		margin-left: 14rpx;
		background-image: url('~@/static/down@2x.png');
	}
	
	.l-icon-filter{
		width: 22rpx;
		height: 24rpx;
		margin-left: 14rpx;
		background-image: url('~@/static/filter.png');
	}
	
	.l-down-list{
		position: fixed;
		top: 292rpx;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		z-index: 777;
		overflow: auto;
		/* #ifdef APP-PLUS */
		max-height: calc(100vh - 340rpx);
		/* #endif */
		/* #ifdef H5 */
		max-height: calc(100vh - 440rpx);
		/* #endif */
		transition: all 0.3s;
		opacity: 0;
		background-color: #FFFFFF;
	}
	
	.l-down-view{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	
	.l-down-head{
		text-indent: 6%;
		font-size: 24rpx;
		color: #999999;
		padding: 20rpx 0;
	}
	
	.l-down-item{
		padding: 12rpx 0;
		width: 22%;
		box-sizing: border-box;
		text-align: center;
		margin: 14rpx 5%;
		border: 1rpx solid transparent;
		border-radius: 10rpx;
	}
	
	.l-down-button{
		position: fixed;
		left: 0;
		/* #ifdef APP-PLUS */
		top: calc(100vh - 100rpx);
		/* #endif */
		/* #ifdef H5 */
		top: calc(100vh - 202rpx);
		/* #endif */
		width: 100%;
		display: flex;
		/* #ifdef H5 */
		height: 106rpx;
		/* #endif */
		/* #ifdef APP-PLUS */
		height: 100rpx;
		/* #endif */
		align-items: center;
		background-color: #FFFFFF;
	}
	
	.l-down-btn{
		flex: 1;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 30rpx;
		background-color: #FFFFFF;
	}
	
	.l-down-btn-confirm{
		color: #FFFFFF;
		background-color: #FF0036;
	}
	
	.l-down-item-active{
		color: #FF0036;
		border: 1rpx solid;
	}
	.block{
		display: block !important;
	}
	
	.opacity{
		opacity: 1;
	}
	
	.none{
		display: none !important;
	}
</style>
