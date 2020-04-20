<template>
	<view class="l-container">

		<scroll-left-head :dataBgColor="dataBgColor" :dataList="pkList"></scroll-left-head>

		<view class="l-body">
			<view class="l-tab">
				<view class="l-tab-item" :class="{ 'l-tab-active': statIndex == i }" v-for="(s, i) in statTab" :key="i" @tap="getStatInfoFn(i)">
					{{ s.date }}</view>
			</view>

			<view class="l-list">
				<view class="l-list-item" v-for="(s, i) in dataBgColor" :key="i">
					<span class="l-icon-bg" :style="{ 'backgroundColor': s }"></span>
					<span>
						{{ produceSummary[indexList[i]] && produceSummary[indexList[i]].secShortName }}：
						<span class="l-color-E70012">{{ dataset[i][dataset[i].length - 1] &&  dataset[i][dataset[i].length - 1][isNav] || '0.00%'}}</span>
					</span>
				</view>
			</view>

			<view class="l-label">
				<view class="l-label-item">
					<span>分红{{ isNav === 'accumNavChange' ? '再': '不' }}投资</span>
					<span @tap="isNav = isNav === 'accumNavChange' ? 'adjNavChange' : 'accumNavChange'" class="l-icon l-icon-transfrom"></span>
				</view>
				<view class="l-label-item">
					<span class="l-icon-bg"></span>
					<span>{{ '对比基线' }}</span>
				</view>
			</view>

			<view style="position: relative;">
				<view class="cover-view-canvas" v-if="!dataset.length && qualified" style="width: 750rpx;height: 436rpx;">
					暂无数据
				</view>
				<view class="cover-view-canvas" v-if="!qualified" style="width: 750rpx;height: 436rpx;">
					认证可见
				</view>
				<canvas canvas-id="canvasa" @touchstart="touchstart($event,'canvasa')" @touchmove="touchmove" @touchend="touchend"
				 :style="'width: 750rpx;height: 436rpx;opacity: '+ (dataset.length && qualified? 1 : 0 ) +';'">
				</canvas>
			</view>

		</view>

		<scroll-body :dataList="dataInfoList" :labelKeyList="labelKeyList"></scroll-body>

		<view class="l-bottom">
			声明：以上数据仅供参考，若有疑问，请向我们<span style="color: #007AFF;" @tap="$nav({ url: '/pages/feedback/feedback' })">反馈意见</span>
		</view>

	</view>
</template>

<script>
	import scrollLeftHead from './scroll-left-head.vue';
	import scrollBody from './scroll-body.vue';
	import curveMaps from '@/common/js/curveMaps.js';
	let dataLineSize = 1;
	let eCharts = {};
	let inter = null;

	let colorList = ['#ff0000', '#00aaff', '#ffaa00', '#ff00ff', '#aaff00', '#aa5500']

	export default {
		components: {
			scrollBody,
			scrollLeftHead
		},
		data() {
			// #E70012 #89622F
			
			return {
				option:{
					xAxis: {},
					yAxis: {},
					calculable: true,
					series: [{
						name: '',
						type: 'line',
						color: "red",
						data: []
					}]
				},
				labelKeyList: [{
						title: '基金业绩',
						key: 'produceSummary',
						keyList: [{
							title: '单位净值',
							key: 'accumNav',
							isColor: '',
							isNavColor: '',
							isNav: ''
						}, {
							title: '累计收益',
							key: 'returnRateEst',
							isColor: '#E70012',
							isNavColor: '',
							isNav: ''
						}, {
							title: '成立时长',
							key: 'createTime',
							isColor: '',
							isNavColor: '',
							isNav: ''
						}, {
							title: '年化收益率',
							key: 'annualTotalReturn',
							isColor: '#E70012',
							isNavColor: '',
							isNav: ''
						}, {
							title: '成立以来最大回撤',
							key: 'maxDrawdown',
							isColor: '#E70012',
							isNavColor: '',
							isNav: ''
						}, {
							title: '今年以来收益率',
							key: 'returnRate1y',
							isColor: '#E70012',
							isNavColor: '',
							isNav: ''
						}, {
							title: '近一月收益率',
							key: 'returnRate1m',
							isColor: '#E70012',
							isNavColor: '',
							isNav: ''
						}, {
							title: '近三月收益率',
							key: 'returnRate3m',
							isColor: '#E70012',
							isNavColor: '',
							isNav: ''
						}, {
							title: '近半年收益率',
							key: 'returnRate6m',
							isColor: '#E70012',
							isNavColor: '',
							isNav: ''
						}, {
							title: '近一年收益率',
							key: 'returnRate1y',
							isColor: '#E70012',
							isNavColor: '',
							isNav: ''
						}, {
							title: '近三年收益率',
							key: 'returnRate3y',
							isColor: '#E70012',
							isNavColor: '',
							isNav: ''
						}, {
							title: '近五年收益率',
							key: 'returnRate5y',
							isColor: '#E70012',
							isNavColor: '',
							isNav: ''
						}]
					},
					{
						title: '基金概况',
						key: 'produceSummary',
						keyList: [{
							title: '基金状态',
							key: 'status',
							isColor: '',
							isNavColor: '',
							isNav: ''
						}, {
							title: '基金经理',
							key: 'userName',
							isColor: '',
							isNavColor: '#89622F',
							isId: 'personId',
							isNav: '/pages/people-details/people-details?id='
						}, {
							title: '基金公司',
							key: 'partyShortName',
							isColor: '',
							isNavColor: '#89622F',
							isId: 'partyId',
							isNav: '/pages/company-details/company-details?id='
						}, {
							title: '投资策略',
							key: 'investStrategy',
							isColor: '',
							isNavColor: '',
							isNav: ''
						}, {
							title: '成立时间',
							key: 'establishDate',
							isColor: '',
							isNavColor: '',
							isNav: ''
						}]
					},
					{
						title: '基金经理',
						key: 'managerInfo',
						keyList: [{
							title: '姓名',
							key: 'realName',
							isColor: '',
							isNavColor: '#89622F',
							isId: 'personId',
							isNav: '/pages/people-details/people-details?id='
						}, {
							title: '最高学历',
							key: 'education',
							isColor: '',
							isNavColor: '',
							isNav: ''
						}, {
							title: '从业年限',
							key: 'workYear',
							isColor: '',
							isNavColor: '',
							isNav: ''
						}, {
							title: '旗下基金',
							key: 'raisedFundCounts',
							isColor: '',
							isNavColor: '',
							isNav: ''
						}, {
							title: '累计收益',
							key: 'accumNav',
							isColor: '',
							isNavColor: '',
							isNav: ''
						}]
					},
					{
						title: '基金公司',
						key: 'org',
						keyList: [{
							title: '名称',
							key: 'partyShortName',
							isColor: '',
							isNavColor: '',
							isNav: ''
						}, {
							title: '成立时间',
							key: 'recordDate',
							isColor: '',
							isNavColor: '',
							isNav: ''
						}, {
							title: '管理规模',
							key: 'scale',
							isColor: '',
							isNavColor: '',
							isNav: ''
						}, {
							title: '管理产品数量',
							key: 'maxDrawdown',
							isColor: '',
							isNavColor: '',
							isNav: ''
						}, {
							title: '注册城市',
							key: 'regCity',
							isColor: '',
							isNavColor: '',
							isNav: ''
						}]

					}
				],
				pkList: [],
				dataBgColor: [],
				dataList: [],
				dataInfoList: [],
				statIndex: 0,
				options: '',
				type: 0,
				dataInfo: {},
				produceSummary: [],
				dataset: [],
				isNav: 'adjNavChange',
				scrollLeft: 0,
				startDate: '',
				statTab: [{
						date: '成立以来',
						data: '--',
						time: '1980-01-01'
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
				indexList: [],
				interval: null
			}
		},
		computed: {
			qualified() {
				console.log(this.$store.getters.qualified);
				return this.$store.getters.qualified
			}
		},
		onLoad(e) {
			let pklist = this.$getStorage('pkList') || [];
			let index = 0;
			if (e.id) {
				index = pklist.map(e => e.id).indexOf(e.id);
			}
			this.pkList = pklist[index].list;
		},
		onReady() {
			this.init();
		},
		methods: {
			touchstart(e, id) {
				this.canvasId = id;
				if (!e || !e.touches[0] || !eCharts[this.canvasId]) return
				eCharts[this.canvasId].touchX = e.touches[0].x || e.touches[0].pageX;
				eCharts[this.canvasId].touchY = e.touches[0].y || e.touches[0].pageY;
				eCharts[this.canvasId].drawMouseTooltipLine()
			},

			touchmove(e) {
				if (!e || !e.touches[0] || !eCharts[this.canvasId]) return
				inter = setTimeout(() => {
					eCharts[this.canvasId].touchX = e.touches[0].x || e.touches[0].pageX;
					eCharts[this.canvasId].touchY = e.touches[0].y || e.touches[0].pageY;
					eCharts[this.canvasId].drawMouseTooltipLine()
					inter = null;
				}, 80)
			},
			touchend(e) {
				if (!eCharts[this.canvasId]) return
				eCharts[this.canvasId].dataLineSize = dataLineSize;
				eCharts[this.canvasId].drawMap();
				eCharts[this.canvasId].draw();
			},
			init() {
				this.produceCompare()
			},
			onstart(e) {
				this.type = e;
			},
			scroll(e) {
				if (this.interval) {
					return
				}
				this.interval = setTimeout(() => {
					this.interval = null;
					this.scrollLeft = e.detail.scrollLeft
				}, 40)

			},
			produceCompare() {
				let _this = this;
				let params = {
					securityIds: this.pkList.map(e => e.id).join(',')
				};
				let url = 'produce/produceCompare';
				if (this.startDate) {
					params.startDate = this.startDate;
				}
				uni.showLoading({
					title: '加载中'
				})
				//{baseUrl:'http://112.74.30.157:9090/'}
				this.$get(url, params)
					.then(res => {
						uni.hideLoading()

						if (res.code == 200) {
							let info = res.content || [];

							let date = [];

							let hisNavs = info.map(e => e.hisNavs || []);
							this.indexList = [];
							let dataset = []
							hisNavs.forEach((e, i) => {
								if (e) {
									_this.indexList.push(i);
									dataset.push(e)
								}
							})

							this.dataset = dataset;
							let intervalReturn = info.map(e => e.intervalReturn || {});
							let produceSummary = info.map((e, i) => Object.assign({}, e.produceSummary, intervalReturn[i] || {}));
							this.produceSummary = produceSummary;

							this.dataList = info;
							let org = info.map(e => e.org || {});
							let managerInfo = info.map(e => e.manager ? e.manager : {})

							managerInfo.forEach(e => {
								if(e.workYear){
									e.workYear = parseFloat(e.workYear)
								}
							})

							produceSummary.forEach(e => {
								if (e.listDays) {
									e.createTime = e.listDays ?
										e.listDays !== '认证可见' ?
										this.$formatDay(e.listDays) :
										'认证可见' :
										'--';
								}
							})


							this.dataInfoList = {
								managerInfo,
								org,
								produceSummary
							};


							this.createCanvas();
						}
					}).catch(res => {
						uni.hideLoading()
					})
			},
			
			createCanvas() {
				let width = this.cWidth = uni.upx2px(750);
				let height = this.cHeight = uni.upx2px(436);
				let option = {
					fontTxtSize: 12,
					xAxisAll: [],
					series:[
						{
							data: [],
							xAxis: [],
							name: ''
						}
					]
				};
				let _this = this;
				let dataset = this.dataset;
				let length = dataset.length;
				let reg = /\-/g;
				let list = dataset.reduce((a, b) => a.concat((b || [])))
				let timeList = list.map(e => new Date(e.endDate.replace(reg, '/')).getTime());
				timeList.sort((a, b) => a - b);
				timeList = Array.from(new Set(timeList))
				option.xAxisAll = timeList.map(e => {
					let d = new Date(e);
					let time = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
					return time.map(e => e > 9 ? e : '0' + e).join('-');
				})
				let indexList = _this.indexList;
				dataset.forEach((e, i) => {
					if(!option.series[i]){
						option.series[i] = {
							name: ''
						}
					}
					option.series[i].name = _this.produceSummary[indexList[i]] &&  _this.produceSummary[indexList[i]].secShortName || '本基金';
					option.series[i].data =  e.map(f => (f[_this.isNav] + '') !== 'undefined' ? parseFloat(f[_this.isNav]) : 0);
					option.series[i].xAxis =  e.map(f => f.endDate);
				})
				let context = uni.createCanvasContext('canvasa', this)
				let config = {
					context,
					width,
					height,
					option,
					unit: '%'
				}
				
				eCharts.canvasa = curveMaps.init(config);
				let dataLineXColor = eCharts.canvasa.dataLineXColor
				this.dataBgColor = dataLineXColor.slice(0, this.dataset.length);
			},
			getStatInfoFn(i) {
				if (this.statIndex != i) {
					this.statIndex = i;
					switch (+i) {
						case 0:
							this.startDate = '';
							break;
						case 1:
							this.startDate = this.$getBeforDate(0, 3);
							break;
						case 2:
							this.startDate = this.$getBeforDate(0, 6);
							break;
						case 3:
							this.startDate = this.$getBeforDate(1, 0);
							break;
						case 4:
						default:
							this.startDate = this.$getBeforDate(3, 0);
							break;
					}
					this.produceCompare();
				}
			}
		}
	}
</script>

<style scoped>
	@import url("./pk-contrast.css");
</style>
