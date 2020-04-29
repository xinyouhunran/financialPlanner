<template>
	<view class="l-container" v-if="!0">

		<view class="l-thead">
			<t-head :dataInfo="dataInfo" ></t-head>
		</view>

		<view class="l-body-swper">
			<view class="l-vswitch l-flex l-flex-ai_c l-flex-jc_sb" :class="{ 'l-tab-posi': tabPosi }">
				<view class="l-vswitch-item" @tap="vSwitchIndex = i" :class="{ 'l-vswitch-item-active' : vSwitchIndex == i }" v-for="(s, i) in vSwitch"
				 :key="i">
					{{ s.title }}<span class="l-vswitch-item-sub">{{ s.sub }}</span>
				</view>
			</view>

			<view :style="{ height: swiperTabHeight + 'px'}" class="l-placeholder-view" :class="{ 'l-placeholder': tabPosi }"></view>
			<!-- v-for="(s, i) in vSwitch" :key="i" -->
			<view class="l-swiper-item" :class="{ 'l-swiper-item-block': vSwitchIndex == 0 }">
				<view style="background-color: #FFFFFF;">
					<!-- <view>
						<t-data></t-data>
					</view> -->
					<view>
						<view>
							<view class="l-stat-info l-flex l-flex-ai_c l-flex-jc_sb">
								<view class="l-si-txt">
									<span class="l-square"></span>
									<span>本基金</span>
									<span class="l-color-E70012" style="margin-left: 11rpx;">
										{{ dataset[dataset.length - 1] && dataset[dataset.length - 1][isNav] || '0.00' }}
									</span>
									<span class="l-color-828282">
										(分红{{ isNav === 'accumNavChange' ? '再': '不' }}投资<span @tap="isNav = isNav === 'accumNavChange' ? 'adjNavChange' : 'accumNavChange'" class="l-icon l-icon-transfrom"></span>)
									</span>
								</view>
								<!-- <view  >
									<span>沪深300</span>
									<span class="l-triangle"></span>
									<span class="l-color-E70012">228.67%</span>
								</view> -->
							</view>
							<view style="position: relative;">
								<view class="cover-view-canvas"
								v-if="!dataset.length && qualified"
								style="width: 750rpx;height: 436rpx;">
									暂无数据
								</view>
								<view class="cover-view-canvas"
								v-if="!qualified"
								 style="width: 750rpx;height: 436rpx;">
									 认证可见
								</view>
								<canvas canvas-id="canvasa" 
								@touchstart="touchstart($event,'canvasa')" 
								@touchmove="touchmove" @touchend="touchend"
								 :style="'width: 750rpx;height: 436rpx;opacity: '+ (dataset.length && qualified? 1 : 0 ) +';'">
								 </canvas>
							</view>
						</view>
						<view class="l-stat-tab l-flex">
							<view class="l-stat-list l-flex-1" @tap="getStatInfoFn(i)" :class="{ 'l-stat-first': i == 0,'l-stat-active': i == statIndex }"
							 v-for="(s,i) in statTab" :key="i">
								<view class="l-stat-date">{{ s.date }}</view>
								<view class="l-stat-data">{{ s.data }}</view>
							</view>
						</view>
					</view>

					<view class="l-main-view l-main-view-2">
						<view class="l-jj-tab l-flex l-flex-ai_c-jc_c">
							<view class="l-jj-tab-view l-flex">
								<view class="l-jj-tab-item" @tap="JJIndex = i" :class="{ 'l-jj-tab-active': JJIndex == i }" v-for="(s, i) in JJTab"
								 :key="i">
									{{ s.title }}
								</view>
							</view>
						</view>
						<view :class="{ 'l-display-none' : JJIndex != 0 }">
							<fund-list :dataList="statList"></fund-list>
						</view>
						<view :class="{ 'l-display-none' : JJIndex != 1 }">
							<history-nav :dataList="hisNavList"></history-nav>
							<view class="l-look-more" @tap="++pageIndex,hisNav()" v-if="recordCount != hisNavList.length && hisNavList.length != 0">
								<span>查看更多</span> <span class="l-icon-more"></span>
							</view>
						</view>
						<view :class="{ 'l-display-none' : JJIndex != 2 }">
							<distribution-list :dataList="distributionList"></distribution-list>
						</view>
						<view :class="{ 'l-display-none' : JJIndex != 3 }">
							<risk-list :dataList="riskList"></risk-list>
						</view>

					</view>




					<view>
						<view class="l-stat-head">
							动态回撤 
							<!-- <span class="l-icon-gantan"></span> -->
						</view>
						 <view style="position: relative;">
						 	<view class="cover-view-canvas"
						 	v-if="!trendList.length && qualified"
						 	style="width: 750rpx;height: 436rpx;">
						 		暂无数据
						 	</view>
						 	<view class="cover-view-canvas"
						 	v-if="!qualified"
						 	 style="width: 750rpx;height: 436rpx;">
						 		 认证可见
						 	</view>
						 	<canvas canvas-id="canvasb"
						 	@touchstart="touchstart($event,'canvasb')" 
						 	@touchmove="touchmove" @touchend="touchend"
						 	  :style="'width: 750rpx;height: 436rpx;opacity: '+ (trendList.length && qualified? 1 : 0 ) +';'">
						 	 </canvas>
						 </view>
					</view>
					<view>
						<view class="l-stat-head">
							基金风格 
							<!-- <span class="l-icon-gantan"></span> -->
						</view>
						
						<view style="position: relative;width: 750rpx;margin-bottom: 26rpx;background-color: #FFFFFF;">
							<!-- <image style="width: 100%;height: 651rpx;" src="../../static/product/tu3@2x.png" mode="aspectFill"></image> -->
							<view :style="{ opacity: fundStyleList.length && qualified ? '1':'0'}" >
								<view class="l-stat-view">
									<view class="l-stat-left"><image class="l-stat-left-label" src="../../static/200312184625.jpg" mode="aspectFill"></image></view>
									<view class="l-stat-content">
										<!-- #ifdef APP-PLUS || H5 -->
										<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts">
										</view>
										<!-- #endif -->
									</view>
								</view>
								<view class="l-stat-bottom">
									<image class="l-stat-bottom-label" src="../../static/0200312184327.jpg" mode="aspectFill"></image>
								</view>
							</view>
							<view  class="cover-view-canvas"
							v-if="!fundStyleList.length && qualified"
							style="position:absolute; width:750rpx;height: 550rpx;top: 0;left: 0;text-align: center;">
								暂无数据
							</view>
							<view class="cover-view-canvas"
							 v-if="!qualified"
							 style="position:absolute; width:750rpx;height: 550rpx;top: 0;left: 0;text-align: center;">
								 认证可见
							</view>
						</view>
					</view>

					<view style="padding: 24rpx 30rpx 60rpx;background-color: #FFFFFF;">
						<!-- <project-footer></project-footer> -->
						<view style="line-height: 1.7;font-size: 24rpx;">
							数据来源：iFund数据中心，请以产品管理人/发行方出具的确认函或公告为准。
						</view>
						<view style="line-height: 1.7;font-size: 24rpx;">
							风险提示：激进的过往业绩不预示其未来变偶先，相关数据仅供参考，不构成投资建议。投资有风险，选择需谨慎。
						</view>
					</view>

				</view>
			</view>


			<view class="l-swiper-item" :class="{ 'l-swiper-item-block': vSwitchIndex == 1 }">
				<view style="padding-top: 47rpx;">
					<record :dataInfo="dataInfo" :recordInfo="recordInfo" :peopleInfo="peopleInfo"></record>
				</view>
			</view>

			<view class="l-swiper-item" :class="{ 'l-swiper-item-block': vSwitchIndex == 2 }">
				<view style="padding:20rpx 30rpx 0;">
					<view class="l-swiper-i-reply l-flex l-flex-ai_c l-flex-jc_sb">
						<span>匿名点评：目前仅限iFundVIP用户</span>
						<view class="l-flex l-flex-ai_c">
							<span>评论须知</span>
							<!-- <span class="l-icon l-icon-wenhao"></span> -->
						</view>
					</view>
					
					<comment-list :dataInfo="s" v-for="(s,i) in commentList"  :key="i"></comment-list>
					
					<view class="example-body" >
						<uni-load-more :status="status" />
					</view>
					<view class="l-reply-place"></view>
					<view class="l-reply">
						<!-- #ifdef APP-PLUS -->
						<view class="l-reply-send">
							<textarea class="l-txt" auto-height="true" 
							:disabled="disabled"
							@tap="sendClick"
							:cursor-spacing="10" v-model="reply.content" placeholder="发表匿名评论~" />
							<button class="l-btn l-btn-sub" @tap="sendReply">发送</button>
						</view>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<view class="l-reply-send" >
							<textarea class="l-txt" auto-height="true" 
							:disabled="!0"
							@click="$store.dispatch('downloadApp')"
							:cursor-spacing="10" v-model="reply.content" placeholder="发表匿名评论~" />
							<button class="l-btn l-btn-sub" @tap="sendReply">发送</button>
						</view>
						<!-- #endif -->
					</view>
				</view>
			</view>
		</view>
		<navgo-login :keys="'bottom'" :value="'118'"></navgo-login>
		<t-foot :securityId="id" :dataInfo="dataInfo"  @subscribe="isCFP = true"></t-foot>
		<uni-pop-vip v-if="isVip" @close="isVip = false"></uni-pop-vip>
		<uni-pop-lyp v-if="isCFP" type="2" :targetId="id" @success="isCFP = false" @close="isCFP = false"></uni-pop-lyp>
	</view>
	<view v-else>
		<web-view style="width: 100vw;height: calc(100vh - 44px);" :src="webviewSrc"></web-view>
	</view>
</template>

<script>
	import tHead from './t-head.vue';
	import tFoot from './t-foot.vue';
	import tData from './t-data.vue';
	import record from './record.vue'
	import fundList from './fund-list.vue';
	import riskList from './risk-list.vue';
	import uniPopLyp from '@/components/uni-pop-lyp/uni-pop-lyp.vue';
	import historyNav from './history-nav.vue';
	import commentList from './comment-list.vue';
	import distributionList from './distribution-list.vue';
	import navgoLogin from '@/components/navgo-login/navgo-login.vue';
	import projectFooter from '@/components/project-footer/project-footer.vue';
	import curveMap from '@/common/js/curveMap.js';
	let dataLineSize = 1;
	let eCharts = {};
	let inter = null;
	
	export default {
		components: {
			tHead,
			tFoot,
			tData,
			record,
			riskList,
			navgoLogin,
			projectFooter,
			fundList,
			uniPopLyp,
			commentList,
			distributionList,
			historyNav
		},
		data() {
			return {
				option:{
					xAxis: {},
					yAxis: {},
					series: [{
						symbolSize: 20,
						data: [],
						emphasis: {
							label: {
								show: true,
								formatter: function(param) {
									return param.data[2];
								},
								position: 'top'
							}
						},
						type: 'scatter'
					}]
				},
				isCFP:false,
				recordInfo:{},
				peopleInfo:{},
				webviewSrc: 'http://192.168.110.230:8081/#/director',
				isNav: 'adjNavChange',
				isVip:false,
				tabPosi: false,
				keys: 'cmap',
				reply:{
					targetId: '',
					type: '2',
					content: ''
				},
				commentList:[],
				swiperTabHeight: 51,
				configA: {},
				configB: {},
				JJIndex: 0,
				JJTab: [
					{ title: '区间收益' },
					{ title: '历史净值' },
					{ title: '分红配送' },
					{ title: '风险参数' }
				],
				status: 'noMore',
				statusOption: {
					loading: 'loading',
					more: 'more',
					noMore: 'noMore'
				},
				total:0,
				params1: {
					'pageInfo.pageIndex': 1,
					'pageInfo.pageSize': 10
				},
				statIndex: 0,

				statTab: [{
						date: '成立以来',
						data: '--'
					},
					{
						date: '近三个月',
						data: '--'
					},
					{
						date: '最近半年',
						data: '--'
					},
					{
						date: '最近一年',
						data: '--'
					},
					{
						date: '最近三年',
						data: '--'
					}
				],
				statList: [{
						date: '今年以来',
						data: '--'
					},
					{
						date: '近一个月',
						data: '--'
					},
					{
						date: '近三个月',
						data: '--'
					},
					{
						date: '近六个月',
						data: '--'
					},
					{
						date: '最近一年',
						data: '--'
					},
					{
						date: '最近三年',
						data: '--'
					}
				],

				vSwitchIndex: 0,

				vSwitch: [{
						title: '收益走势',
						sub: ''
					},
					{
						title: '产品档案',
						sub: ''
					},
					{
						title: '多方点评',
						sub: ''
					}
				],
				dataInfo:{},
				id: '',
				startDate: '',
				pageIndex: 1,
				recordCount: 0,
				hisNavList:[],
				riskList: [],
				trendList:[],
				dataset:[],
				maxtrendInfo:[],
				fundStyleList:[],
				distributionList: [],
				intervalYieldInfo:{},
				
			}
		},
		onLoad(e) {
			this.id = e.id || this.$productId;
			this.reply.targetId = this.id;
			this.init();
		},
		onReady() {
			this.accumNavTrend();
			this.maxDrawdownTrend();
			this.getHeadHeight();
			this.fundStyle();
		},
		onReachBottom() {
			if(this.vSwitchIndex == this.vSwitch.length - 1){
				let pageInfo = this.params1;
				let list = this.commentList;
				let pageIndex = pageInfo['pageInfo.pageIndex'];
				let pageSize = pageInfo['pageInfo.pageSize'];
				let total = this.total;
				let length = pageIndex * pageSize;
				if(length < total && list.length === length){
					++this.params1['pageInfo.pageIndex']
					this.commentListFn();
				}
			}
		},
		watch:{
			qualified(){
				this.init();
				this.accumNavTrend();
				this.maxDrawdownTrend();
				this.fundStyle();
			}
		},
		computed: {
			hasLogin(){
				return this.$store.getters.hasLogin
			},
			getSystem() {
				return this.$getSystem;
			},
			qualified(){
				return this.$store.getters.qualified;
			},
			isLevel(){
				let level = this.$store.getters.level;
				return level && level > 0;
			},
			disabled(){
				return !(this.qualified && this.isLevel)
			}
		},
		onPageScroll(e) {
			if (e.scrollTop > this.tHeadHeight) {
				if (!this.tabPosi) {
					this.tabPosi = !this.tabPosi;
				}
			} else {
				if (this.tabPosi) {
					this.tabPosi = !this.tabPosi;
				}
			}
		},
		methods: {
			init(){
				this.summary();
				this.intervalReturn();
				this.hisNav();
				this.riskAssessment();
				this.produceInformation();
			},
			sendClick(){
				if(!this.qualified){
					this.$toast('您还进行投资者认证');
					return
				}
				if(!this.isLevel){
					this.isVip = true;
				}
			},
			commentListFn(){
				let _this = this;
				let params = _this.params1;
				params.targetId  = _this.id;
				params.type = 1;
				let url = 'comment/list';
				_this.status = _this.statusOption.more;
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || {};
						_this.total = info.pageInfo && info.pageInfo.recordCount || '';
						let data = info.list || [];
						_this.commentList = _this.commentList.concat(data);
						
						if(_this.total == _this.commentList.length){
							_this.status = _this.statusOption.noMore;
						}
					}
				})
			},
			sendReply(){
				let _this = this;
				let params = _this.reply;
				let url = 'user/center/comment/submit';
				if(!params.content){
					_this.$toast('评论内容不能为空')
					return
				}
				_this.$post(url, params)
				.then(res => {
					if(res.code == 200){
						_this.$toast('评论成功');
						 _this.reply.content = '';
						 _this.commentList = [];
						 _this.params1['pageInfo.pageIndex'] = 1;
						 _this.commentListFn();
					}else{
						_this.$toast(res.message)
					}
				})
			},
			onViewClick(options) {
			},
			createCanvas(){
				let width = this.cWidth = uni.upx2px(750);
				let height = this.cHeight = uni.upx2px(436);
				let dataLineXColor = ['#E70012', '#49A6E9']
				let option = {
					dataset: {
						source: []
					},
					fontTxtSize: 12,
				};
				if(this.dataset){
					let endDate = this.dataset[0].endDate;
					let num = '0%';
					this.dataset.unshift({ endDate, adjNavChange:num,accumNavChange:num })
				}
				this.dataset.forEach((e, i) => {
					if(i == 0){
						if(!option.dataset.source[0]){
							option.dataset.source[0] = []
						}
						if(!option.dataset.source[1]){
							option.dataset.source[1] = []
						}
						option.dataset.source[0].push('product');
						option.dataset.source[1].push('本基金');
					}
					option.dataset.source[0].push(e.endDate);
					option.dataset.source[1].push(parseFloat(e[this.isNav]));
				})
				let context = uni.createCanvasContext('canvasa', this)
				let config = {
					context,
					width,
					height,
					option,
					unit: '%',
					dataBGColor:[{ index: 0 }],
					dataLineXColor
				}
				eCharts.canvasa = curveMap.init(config);
			},
			drawdownTrendMap(){
				let width = this.cWidth = uni.upx2px(750);
				let height = this.cHeight = uni.upx2px(436);
				
				let dataLineXColor = ['#7e9df6']
				let option = {
					dataset: {
						source: []
					},
					fontTxtSize: 12,
				};
				if(this.trendList.length == 1){
					let endDate = this.trendList[0].endDate;
					let num = '0%';
					this.trendList.unshift({ endDate, maxDrawdown:num })
				}
				this.trendList.forEach((e, i) => {
					if(i == 0){
						if(!option.dataset.source[0]){
							option.dataset.source[0] = []
						}
						if(!option.dataset.source[1]){
							option.dataset.source[1] = []
						}
						option.dataset.source[0].push('product');
						option.dataset.source[1].push('本基金');
					}
					option.dataset.source[0].push(e.endDate);
					option.dataset.source[1].push(parseFloat(e.maxDrawdown));
				})
				let context = uni.createCanvasContext('canvasb', this)
				let retracement = {}
				if(this.maxtrendInfo.endDate){
					retracement = {
						data: parseFloat(this.maxtrendInfo.maxDrawdown),
						date: this.maxtrendInfo.endDate
					}
				}
				let config = {
					width,
					context,
					height,
					retracement,
					option,
					unit: '%',
					dataBGColor:[{ index: 0, 
						bg: [ 
							{key: '0', value: 'rgba(99,137,249,0.0)'},
							{key: '0.7', value: 'rgba(99,137,249,0.2)'},
							{key: '0.8', value: 'rgba(99,137,249,0.4)'},
							{key: '1', value: 'rgba(99,137,249,1)'} ,
						] 
					}],
					dataLineXColor
				}
				eCharts.canvasb = curveMap.init(config);
			},
			touchstart (e,id) {
				this.canvasId = id;
				if (!e || !e.touches[0] || !eCharts[this.canvasId]) return
				eCharts[this.canvasId].touchX = e.touches[0].x || e.touches[0].pageX;
				eCharts[this.canvasId].touchY = e.touches[0].y || e.touches[0].pageY;
				eCharts[this.canvasId].drawMouseTooltipLine()
			},
			
			touchmove (e) {
				if (!e || !e.touches[0] || !eCharts[this.canvasId]) return
				inter = setTimeout(() => {
					eCharts[this.canvasId].touchX = e.touches[0].x || e.touches[0].pageX;
					eCharts[this.canvasId].touchY = e.touches[0].y || e.touches[0].pageY;
					eCharts[this.canvasId].drawMouseTooltipLine()
					inter = null;
				},80)
			},
			touchend(e) {
				if(!eCharts[this.canvasId]) return
				eCharts[this.canvasId].dataLineSize = dataLineSize;
				eCharts[this.canvasId].drawMap();
				eCharts[this.canvasId].draw();
			},
			/*
			 * 获取 tab item height
			 */
			getHeadHeight() {
				let _this = this;

				let query = uni.createSelectorQuery().in(this);

				query
					.select('.l-vswitch')
					.boundingClientRect(data => {
						_this.swiperTabHeight = data.height;
					}).exec();

				query.
				select('.l-thead')
					.boundingClientRect(data => {
						_this.tHeadHeight = data.height;
					}).exec();
			},
			/*
			 * scroll 
			 */
			onScroll(e) {
				let _this = this;
				let top = e.detail.scrollTop;
				if (top > this.tHeadHeight) {
					top = this.tHeadHeight;
					if (_this.swiperHeight != _this.copySwiperHeight + top) {
						_this.swiperHeight = _this.copySwiperHeight + top;
					}
				} else {
					_this.swiperHeight = _this.copySwiperHeight + top;
				}

			},
			/*
			 * swiper change
			 */
			onChangeSwiper(e) {
				if (this.vSwitchIndex == e.detail.current) {
					return
				}
				this.vSwitchIndex = e.detail.current;
			},
			produceInformation(){
				let _this = this;
				let params = { securityId   : _this.id  };
				let url = "produce/produceInformation";
				
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || {};
						_this.recordInfo = info;
					}
				})
			},
			/*
			 *  历史最大回测
			 */
			peopleInfoFn(){
				let _this = this;
				let params = { personId  : _this.personId  };
				let url = "people/detail/info";
				
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || {};
						_this.peopleInfo = info;
					}
				})
			},
			/*
			 *  产品信息
			 */
			summary(){
				let _this = this;
				let params = { securityId : _this.id };
				let url = "produce/summary";
				
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || {};
						if(info.endDate){
							let d = new Date(info.endDate);
							info.endDateDay = [d.getMonth() + 1, d.getDay()].map(e => e > 9 ? e : '0' + e).join('-');
						}else{
							info.endDateDay = ''
						}
						info.produceTypeStr = info.produceType === "私募产品" ? '私募' : '公募';
						
						_this.personId = info.personId;
						_this.dataInfo = info;
						if(_this.personId){
							_this.peopleInfoFn();
						}
					}
				})
			},
			/*
			 *  区间收益
			 */
			intervalReturn(){
				let _this = this;
				let params = { securityId : _this.id };
				let url = "produce/intervalReturn";
				
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || {};
						_this.intervalYieldInfo = info;
						_this.statTab[0].data = info.returnRateEst || '--';
						_this.statTab[1].data = info.returnRate3m || '--';
						_this.statTab[2].data = info.returnRate6m || '--';
						_this.statTab[3].data = info.returnRate1y || '--';
						_this.statTab[4].data = info.returnRate3y || '--';
						
						_this.statList[0].data = info.returnRateYtd || '--';
						_this.statList[1].data = info.returnRate1m || '--';
						_this.statList[2].data = info.returnRate3m || '--';
						_this.statList[3].data = info.returnRate6m || '--';
						_this.statList[4].data = info.returnRate1y || '--';
						_this.statList[5].data = info.returnRate3y || '--';
					}
				})
			},
			/*
			 *  动态回测
			 */
			maxDrawdownTrend(){
				let _this = this;
				let params = { securityId : _this.id };
				let url = "produce/maxDrawdownTrend";
				
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || [];
						_this.trendList = info;
						_this.maxHisDrawdown()
					}
				})
			},
			/*
			 *  基金风格
			 */
			fundStyle(){
				let _this = this;
				let params = { securityId : _this.id };
				let url = "produce/fundStyle";
				
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || [];
						_this.option.series[0].data = info.map(e => [e.upCaptureRate, e.downCaptureRate, e.endDate]);
						_this.fundStyleList = info;
					}
				})
			},
			/*
			 *  历史最大回测
			 */
			maxHisDrawdown(){
				let _this = this;
				let params = { securityId : _this.id };
				let url = "produce/maxHisDrawdown";
				
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || {};
						_this.maxtrendInfo = info;
						_this.drawdownTrendMap()
					}
				})
			},
			
			/*
			 *  风险参数
			 */
			riskAssessment(){
				let _this = this;
				let params = { securityId : _this.id };
				let url = "produce/riskAssessment";
				
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || [];
						_this.riskList = info.length ? info : [''];
					}
				})
			},
			/*
			 *  历史净值
			 */
			hisNav(){
				let _this = this;
				let params = { 
					securityId : _this.id, 
					'pageInfo.pageIndex': this.pageIndex,
					'pageInfo.pageSize': 10
				};
				let url = "produce/hisNav";
				
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || [];
						_this.recordCount = info.pageInfo && info.pageInfo.recordCount || 0;
						_this.hisNavList = _this.hisNavList.concat(info.list || []) ;
					}
				})
			},
			/*
			 *  收藏产品
			 */
			collectProductFn(){
				let _this = this;
				let params = {};
				let url = 'user/fav/funds/add';
				
				_this.$post(url, params)
				.then(res => {
					if(res.code == 200){
						_this.$toast('收藏成功!');
					}
				})
			},
			/*
			* 走势图
			*/
			accumNavTrend() {
				let _this = this;
				let startDate = this.startDate;
				let params = {
					startDate,
					securityId: _this.id
				};
				let url = 'produce/accumNavTrend';
			
				_this.$get(url, params)
					.then(res => {
						if (res.code == 200) {
							let info = res.content || [];
							
							_this.dataset = info;
							_this.createCanvas();
						}
					})
			},
			getStatInfoFn(i){
				if(this.statIndex != i){
					this.statIndex = i;
					switch (+i){
						case 0:
							this.startDate = '';
							break;
						case 1:
							this.startDate = this.$getBeforDate(0,3);
							break;
						case 2:
							this.startDate = this.$getBeforDate(0,6);
							break;
						case 3:
							this.startDate = this.$getBeforDate(1,0);
							break;
						case 4:
						default:
							this.startDate = this.$getBeforDate(3,0);
							break;
					}
					this.accumNavTrend();
				}
			}
		}
	}
</script>

<script module="echarts" lang="renderjs">
	let myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				if(myChart){
					myChart.setOption(newValue)
				}
				
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
			}
		}
	}
</script>
<style>
	.echarts div,
	.echarts canvas,
	.echarts view{
		width: 100% !important;
	}
</style>

<style scoped lang="scss">
	@import url("./product-details.css");
</style>
