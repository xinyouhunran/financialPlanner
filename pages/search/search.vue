<template>
	<view class="search-container">
		<view class="l-titleNView-fixed">
			<view class="l-status"></view>
			<view class="l-titleNView-content l-flex l-flex-ai_c">
				<view class="l-titleNView-nav l-flex l-flex-ai_c" >
					<view class="l-title-icon1" @tap="$back(1)">
						
					</view>
					<view class="l-titleNView-form" >
						<input class="l-titleNView-input" type="text" placeholder="用户/产品搜索" v-model="searchText"/>
					</view>
					<view class="" @tap="search">
						<view class="l-title-icon3">
							
						</view>
						<text class="l-title-text">搜索</text>
					</view>
				</view>
			</view>
		</view>
		<view class="">
			<view class="l-status"></view>
			<view class="l-title-zhanwei"></view>
			<view class="sbt sbb customer">
				<view class="title">
					客户
				</view>
				<template v-if="customerList.length">
					<view class="l-flex intro" v-for="(v,i) in customerList" :key='i' :class="{sbb:i!=customerList.length-1}">
						<image src="../../static/logo.png" mode="aspectFill"></image>
						<view class="l-flex l-flex-direction mes">
							<view v-html="v.name" class="name"></view>
							<view class="birth">生日：<text v-text="v.birth"></text></view>
							<view class="addTime">添加时间：<text v-text="v.addTime"></text></view>
						</view>
						<view class="l-flex l-flex-1 l-flex-direction l-flex-ai_c l-flex-jc_sb">
							<template>
								<view v-if="online" class="online">在线</view>
								<view class="beforeHour" v-else>
									几小时前
								</view>
							</template>
							<view class="chat">
								聊天
							</view>
						</view>
					</view>
				</template>
				<template v-else>
					<view>空</view>
				</template>
			</view>
			
			<view class="sbt sbb private-funds">
				<view class="title">
					私募基金
				</view>
				<template>
					<view class="l-flex private-item sbb l-flex-jc_sb l-flex-ai_c" v-for="(v,i) in privatefundsList" :key='i'>
						<view class="ileft">{{v.name}}</view>
						<view class="iright">累计收益：{{v.earnings}}</view>
					</view>
				</template>
				<view class="l-flex l-flex-jc_c private-item" @tap="showMore">
					更多优质基金>
				</view>
			</view>
			
			<view class="sbt sbb public-funds">
				<view class="title">
					公募基金
				</view>
				<template>
					<view class="l-flex private-item l-flex-jc_sb l-flex-ai_c" v-for="(v,i) in publicfundsList" :key='i' :class="{sbb:i!=publicfundsList.length-1}">
						<view class="ileft">{{v.name}}</view>
						<view class="iright">累计收益：{{v.earnings}}</view>
					</view>
				</template>
			</view>
			
			<view class="sbt sbb company">
				<view class="title">
					公司
				</view>
				<template>
					<view class="l-flex company-item" v-for="(v,i) in companyList" :key='i' :class="{sbb:i!=companyList.length-1}">
						<image :src="v.imgSrc" mode="aspectFill"></image>
						<view class="l-flex l-flex-direction l-flex-jc_sb l-flex-1">
							<view class="company-name">
								{{v.name}}
							</view>
							<view class="l-flex l-flex-jc_sb">
								<view class="iright">
									{{v.setTime}}年成立
								</view>
								<view class="iright">
									代表产品：{{v.product}}
								</view>
							</view>
						</view>
					</view>
				</template>
			</view>
			
			<view class="sbt sbb insurance">
				<view class="title">
					保险
				</view>
				<template>
					<view class="l-flex company-item" v-for="(v,i) in companyList" :key='i' :class="{sbb:i!=companyList.length-1}">
						<image :src="v.imgSrc" mode="aspectFill"></image>
						<view class="l-flex l-flex-direction l-flex-jc_sb l-flex-1">
							<view class="company-name">
								{{v.name}}
							</view>
							<view class="l-flex l-flex-jc_sb">
								<view class="iright">
									{{v.setTime}}年成立
								</view>
								<!-- <view class="iright">
									代表产品：{{v.product}}
								</view> -->
							</view>
						</view>
					</view>
				</template>
			</view>
			
			<view class="sbt sbb other">
				<view class="title">
					其他
				</view>
				<template>
					<view class="l-flex company-item" v-for="(v,i) in companyList" :key='i' :class="{sbb:i!=companyList.length-1}">
						<image :src="v.imgSrc" mode="aspectFill"></image>
						<view class="l-flex l-flex-direction l-flex-jc_sb l-flex-1">
							<view class="company-name">
								{{v.name}}
							</view>
							<view class="l-flex l-flex-jc_sb">
								<view class="iright">
									{{v.setTime}}年成立
								</view>
								<!-- <view class="iright">
									代表产品：{{v.product}}
								</view> -->
							</view>
						</view>
					</view>
				</template>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchText:'',
				customerList:[],
				online:true,
				privatefundsList:[{
					name:'中战龙鳞1号私募证券投资基金',
					earnings:'42.35%'
				},{
					name:'中战龙鳞1号私募证券投资基金',
					earnings:'42.35%'
				},{
					name:'中战龙鳞1号私募证券投资基金',
					earnings:'42.35%'
				}],
				publicfundsList:[{
					name:'中战龙鳞基金',
					earnings:'42.35%'
				}],
				companyList:[{
					imgSrc:'../../static/logo.png',
					name:'深圳市龙鳞资本管理有限公司',
					setTime:'2014',
					product:'中战宏观对冲2号'
				}]
			}
		},
		onLoad() {
			
		},
		computed:{
			
		},
		methods: {
			search(){
				let reg = new RegExp(`${this.searchText}`,'gi');
				let res = [{
					name:'龙鳞儿',
					birth:'1971-12-30',
					addTime:'2020-02-20'
				}];
				this.customerList.push(...res.map(v => {
					v.name = v.name.replace(reg,`<text style='color: #E70012;font-weight: bold;'>${this.searchText}</text>`)
					return v;
				}))
				let res1 = [{
					name:'龙鳞儿1',
					birth:'1971-12-30',
					addTime:'2020-02-20'
				}];
				res1.map(v => {
					v.name = v.name.replace(reg,`<text style='color: #E70012;font-weight: bold;'>${this.searchText}</text>`)
					return v;
				});
				this.customerList.push(...res1);
			},
			showMore(){
				this.$get(
				'getPrivateFunds'
				).then(res => {
						console.log(res);
						this.privatefundsList.push(...res);
					}).catch(err =>{
						console.log(err);
					})
			}
		}
	}
</script>

<style scoped lang="scss">
.search-container{
	background-color: #FFFFFF;
	margin-bottom: 188rpx;
	.l-titleNView {
		width: 100%;
	}
	
	.l-titleNView-fixed{
		position: fixed;
		z-index: 800;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #2B2A2A;
	}
	
	.l-titleNView-content {
		height: 116rpx;	
	}
	.l-title-icon1{
		width: 48rpx;
		height: 48rpx;
		border: 1px solid #FFFFFF;
		margin-left: 32rpx;
	}
	.l-title-icon2{
		width: 64rpx;
		height: 64rpx;
		border: 1px solid #FFFFFF;
		margin-left: 30rpx;
	}
	.l-title-icon3{
		width: 48rpx;
		height: 48rpx;
		border: 1px solid #FFFFFF;
		margin-left: 36rpx;
		align-self: flex-start;
	}
	.l-title-text{
		margin-left: 36rpx;
		color: #FFFFFF;
		font-size: 20rpx;
		display: inline-block;
		width: 48rpx;
		text-align: center;
	}
	.l-titleNView-form{
		width: 516rpx;
		height: 72rpx;
		border-radius: 36rpx;
		background-color: #FFFFFF;
		margin-left: 30rpx;
	}
	.l-titleNView-input{
		width: 100%;
		height: 100%;
		color: #101010;
		font-size: 28rpx;
		padding: 0 36rpx;
	}
	.l-title-zhanwei{
		height: 116rpx;
	}
	.sbb{
		border-bottom: 1px solid #BBBBBB;
	}
	.sbt{
		border-top: 1px solid #BBBBBB;
	}
	.title{
		font-weight: bold;
	}
	.customer{
		padding: 28rpx 0 0 66rpx;
		.intro{
			padding: 30rpx 0;
		}
		.mes{
			margin-left: 36rpx;
			color: #979393;
		}
		.name{
			margin-bottom: 6rpx;
			font-size: 24rpx;
		}
		.birth,.addTime{
			font-size: 24rpx;
			margin-bottom: 2rpx;
		}
		.online,.beforeHour{
			position: relative;
		}
		.online::before, .beforeHour::before{
			content: '';
			width: 10rpx;
			height: 10rpx;
			position: absolute;
			right: 20rpx;
			left: -20rpx;
			top: 8rpx;
			border-radius: 10rpx;
		}
		.online::before{
			background-color: #1E953C;
		}
		.beforeHour::before{
			background-color: #979393;
		}
		.chat{
			width: 80rpx;
			height: 34rpx;
			border: 1px solid #101010;
			text-align: center;
			line-height: 17px;
		}
	}
	.private-funds,.public-funds,.company,.insurance,.other{
		padding: 28rpx 0 0 66rpx;
		margin-top: 20rpx;
		font-size: 24rpx;
		.private-item{
			padding: 36rpx 0;
		}
		.company-item{
			padding: 38rpx 0;
			image{
				margin-right: 36rpx;
			}
		}
		.ileft{
			width: 330rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: pre;
		}
		.iright{
			margin-right: 44rpx;
			color: #979393;
		}
		.company-name{
			font-size: 12px;
			font-weight: bold;
		}
	}
	
	image{
		width: 74rpx;
		height: 74rpx;
	}
}

</style>
