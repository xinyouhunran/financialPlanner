<template>
	<view class="qiun-columns">
		<!-- <view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">基本区域图</view>
		</view> -->
		<canvas canvas-id="canvasArea" id="canvasArea" :style="{width:width+'px',height:height+'px'}" @touchstart="touchArea"
		@touchmove="touchMove"
		@touchend="touchEnd">
			
		</canvas>
		<!-- <view class="qiun-charts">
			
		</view> -->
	</view>
</template>

<script>
	import uCharts from "@/js_sdk/u-charts/u-charts/u-charts.js";
	var _self;
	var canvaArea=null;
   
	export default {
		props:{
				height:{
					type:Number,
					default:250
				},
				width:{
					type:Number,
					default:375
				},
			},
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				temArea:{}
			}
		},
		beforeMount() {
			_self = this;
			this.cWidth=uni.upx2px(this.width*2);
			this.cHeight=uni.upx2px(this.height*2);
			this.getServerData();
		},
		methods: {
			getServerData(){
				let Area = {
					categories: ['2012-03-30', '2013', '2014', '2015', '2016', '2017-04-09'],
					series: [{
						name: '本基金',
						data: [0, -24, 50, 150, 112, 132],
						color: '#e70012'
					}]
				}
				this.temArea = Area;
				_self.showArea("canvasArea",Area,false);
				/* uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data:{
					},
					success: function(res) {
						console.log(res.data.data)
						let Area={categories:[],series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Area.categories=res.data.data.Area.categories;
						Area.series=res.data.data.Area.series;
					    Area = {
							categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
							series: [{
								name: '成交量A',
								data: [100, 80, 95, 150, 112, 132],
								color: '#facc14'
							}, {
								name: '成交量B',
								data: [70, 40, 65, 100, 44, 68],
								color: '#2fc25b'
							}, {
								name: '成交量C',
								data: [35, 20, 25, 37, 4, 20],
								color: '#1890ff'
							}]
						}
						_self.showArea("canvasArea",Area);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				}); */
			},
			showArea(canvasId,chartData,animationFlag){
				canvaArea=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'area',
					fontSize:12,
					legend:{
						show:false
					},
					dataLabel:false,
					dataPointShape:false,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: animationFlag,
					xAxis: {
						/* type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8, */
						disableGrid:true,
						axisLine:false,
						labelCount:2
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						data:[{
							//splitNumber:5,
							min:-50,
							max:200,
							axisLine:false,
							format:(val)=>{return val.toFixed()+'%'}
						}]
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						area:{
							type: 'straight',
							opacity:0.2,
							addLine:true,
							width:2,
							gradient:true
						}
					}
				});
				
			},
			touchArea(e) {
				let textList=[{text:'我是一个标题',color:null},{text:'自定义1：值1',color:'#2fc25b'},{text:'自定义2：值2',color:'#facc14'},{text:'自定义3：值3',color:'#f04864'}];
				canvaArea.showToolTip(e, {
					format: function (item, category) {
						return category + '  ' + item.name + ':' + item.data + '%'
					}
				});
			},
			touchMove(e){
				canvaArea.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data + '%'
					}
				});
			},
			touchEnd(e){
				this.showArea("canvasArea",this.temArea,false);
			}
		}
	}
</script>

<style scoped>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750rpx;
		height: 500rpx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 750rpx;
		height: 500rpx;
		background-color: #FFFFFF;
	}
</style>
