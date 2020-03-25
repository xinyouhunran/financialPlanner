<template>
	<view class="l-container">
		<view class="l-titleNView-fixed">
			<view class="l-status"></view>
			<view class="l-titleNView-content l-flex l-flex-ai_c">
				<view class="l-titleNView-nav l-flex l-flex-ai_c" >
					<view class="l-title-icon1">
						
					</view>
					<view @tap="$nav({ url: '/pages/search/search' })"
					class="l-titleNView-form" >
						<input disabled class="l-titleNView-input" type="text" placeholder="用户/产品搜索" />
					</view>
					<view class="l-title-icon2">
						
					</view>
					<view class="l-title-icon3">
						
					</view>
				</view>
			</view>
		</view>
		<view class="l-view">
			<view class="l-status"></view>
			<view class="l-title-zhanwei"></view>
			
			<view class="uni-flex l-mt l-bb l-pb">
				<view class="uni-flex uni-column l-pic">
					<image class="l-image" src="../../static/logo.png" mode="aspectFill"></image>
					<text class="l-p">李先生</text>
					<text class="l-span">认证</text>
				</view>
				<view class="uni-flex uni-column l-message">
					<view class="uni-flex l-num">
						<text class="l-line">123</text>
						<text class="l-line">12</text>
						<text class="l-line">473</text>
						<text class="l-line l-line-none">5</text>
					</view>
					<view class="uni-flex mt8">
						<text class="l-num-n">粉丝</text>
						<text class="l-num-n">产品</text>
						<text class="l-num-n">聊天</text>
						<text class="l-num-n">成交</text>
					</view>
					<view class="l-edit">编辑资料</view>
				</view>
			</view>
			
			<view class="uni-flex uni-column ptb l-bb">
				<view class="uni-flex l-tab l-flex-jc_sa">
					<view @tap="$nav({url:'/pages/personal-card/personal-card'})">
						<image src="../../static/logo.png" mode="aspectFill"></image>
						<text>个人名片</text>
					</view>
					<view>
						<image src="../../static/logo.png" mode=""></image>
						<text>个人名片</text>
					</view>
					<view>
						<image src="../../static/logo.png" mode=""></image>
						<text>个人名片</text>
					</view>
					<view>
						<image src="../../static/logo.png" mode=""></image>
						<text>个人名片</text>
					</view>
					<view>
						<image src="../../static/logo.png" mode=""></image>
						<text>个人名片</text>
					</view>
				</view>
				<view class="uni-flex l-tab l-flex-jc_sa l-mt">
					<view>
						<image src="../../static/logo.png" mode="aspectFill"></image>
						<text>个人名片</text>
					</view>
					<view>
						<image src="../../static/logo.png" mode=""></image>
						<text>个人名片</text>
					</view>
					<view>
						<image src="../../static/logo.png" mode=""></image>
						<text>个人名片</text>
					</view>
					<view>
						<image src="../../static/logo.png" mode=""></image>
						<text>个人名</text>
					</view>
					<view>
						<image src="../../static/logo.png" mode=""></image>
						<text>132</text>
					</view>
				</view>
			</view>
			
			<view class="cjzb l-bb">
				<view class="uni-flex l-flex-jc_sb">
					<text class="l-black">财金早报</text>
					<text class="l-more">更多</text>
				</view>
				<view class="uni-flex l-zb l-flex-jc_sb">
					<view class="">
						<view class="lt"><text class="ltmr">融融早报</text><text class="ltmr">2月27日</text><text>星期四</text></view>
						<view class="lh">中国恢复的看见爱上发挥</view>
					</view>
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
			</view>
			
			<view class="zxzk">
				<view class="uni-flex l-flex-jc_sb">
					<text class="l-black">资讯智库</text>
					<view class="uni-flex">
						<view class="l-ib" v-for="(v,i) in zxzklabelList" :key="i" :class="{'l-ib-actived': zxzklabelListIndex == i}" @tap="zxzkTab(v.id)">{{v.name}}</view>
					</view>
				</view>
				<view class="uni-flex l-zb l-flex-jc_sb l-bb zxzkpb">
					<view class="">
						<view class="lt-zx">庵后覅玻尿酸房间爱不是的房价看哈水电费空间哈时代峰峻还款时间的发挥空间啊的说法复活甲</view>
						<view class="lh"><text class="ltmr">国事直通车</text><text>一小时前</text></view>
					</view>
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
				<view class="uni-flex l-zb l-flex-jc_sb l-bb zxzkpb">
					<view class="">
						<view class="lt-zx">庵后覅玻尿酸房间爱不是的房价看哈水电费空间哈时代峰峻还款时间的发挥空间啊的说法复活甲</view>
						<view class="lh"><text class="ltmr">国事直通车</text><text>一小时前</text></view>
					</view>
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
				<view class="uni-flex l-zb l-flex-jc_sb l-bb zxzkpb">
					<view class="">
						<view class="lt-zx">庵后覅玻尿酸房间爱不是的房价看哈水电费空间哈时代峰峻还款时间的发挥空间啊的说法复活甲</view>
						<view class="lh"><text class="ltmr">国事直通车</text><text>一小时前</text></view>
					</view>
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
				<view class="uni-flex l-zb l-flex-jc_sb l-bb zxzkpb">
					<view class="">
						<view class="lt-zx">庵后覅玻尿酸房间爱不是的房价看哈水电费空间哈时代峰峻还款时间的发挥空间啊的说法复活甲</view>
						<view class="lh"><text class="ltmr">国事直通车</text><text>一小时前</text></view>
					</view>
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
				<view class="watch-more">
					点击查看更多
				</view>
			</view>
			
		</view>
		<view class="l-footer">
			<view class="l-flex l-flex-jc_c">
				<view class="tag-line">
					
				</view>
				<view class="red-title">
					融总管
				</view>
				<view class="tag-line">
					
				</view>
			</view>
			<view class="l-footer-tip">
				中国领先的高净值人士财富管理大数据平台
			</view>
			<view class="l-flex l-flex-jc_sa">
				<view class="l-flex l-flex-jc_c l-flex-direction l-flex-ai_c">
					<image src="../../static/logo.png" mode="aspectFill"></image>
					<view class="lw">
						证监会核准
					</view>
					<view class="">
						基金销售持牌机构
					</view>
				</view>
				<view class="l-flex l-flex-jc_c l-flex-direction l-flex-ai_c">
					<image src="../../static/logo.png" mode="aspectFill"></image>
					<view class="lw">
						16年资深
					</view>
					<view class="">
						行业服务专家
					</view>
				</view>
				<view class="l-flex l-flex-jc_c l-flex-direction l-flex-ai_c">
					<image src="../../static/logo.png" mode="aspectFill"></image>
					<view class="lw">
						67万累计
					</view>
					<view class="">
						高净值用户的选择
					</view>
				</view>
			</view>
			<view class="l-flex l-flex-jc_c l-connect">
				<image src="../../static/logo.png" mode="aspectFill"></image>
				<text>联系我们</text>
			</view>
		</view>
		<ink-knife></ink-knife>
		<compliance-certification v-if="popupShow"></compliance-certification>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				zxzklabelList:[
					{name:'全部',id:0},
					{name:'研报',id:1},
					{name:'内参',id:2},
					{name:'独家',id:3},
					{name:'商学院',id:4},
					],
				zxzklabelListIndex:0,
				popupShow:false
			}
		},
		onLoad() {
			console.log('开启');
		},
		methods: {
			zxzkTab(i){
				this.zxzklabelListIndex = i;
			}
		}
	}
</script>

<style scoped>
	@import url("./index.css");
</style>
