<template>
	<view class="container">
		<view class="l-status"></view>
		<view class="l-toptitle">
			<view class="" @tap="$back()">
				<image src="../../static/back@2x.png" mode=""></image>
			</view>
			<view class="">
				产品管理
			</view>
			<view class="add" @tap="$nav({url:'/pages/tool/product-add'})">
				添加
			</view>
		</view>
		<view class="backf4"></view>
		
		<view class="">
			<uni-swipe-action>
			    <uni-swipe-action-item :options="options" @click="onClick" @change="change">
			        <view class="l-view">
			        	<view class="product-manage-item l-bb" @tap="$nav({url:'/pages/product-details/add-product-detail'})">
			        		<view class="top l-flex l-flex-jc_sb l-flex-ai_c">
			        			<view class="l">
			        				<view class="tag">
			        					私募
			        				</view>
									<view class="name">
										龙鳞十号
									</view>
			        			</view>
								<view class="r bgred">
									未通过
								</view>
			        		</view>
							<view class="bottom l-flex l-flex-jc_sb">
								<view class="l">
									<view class="">
										10.65%
									</view>
									<view class="">
										近一年收益
									</view>
								</view>
								<view class="m">
									<view class="">
										100万
									</view>
									<view class="">
										起投金额
									</view>
								</view>
								<view class="r">
									<view class="">
										12个月
									</view>
									<view class="">
										期限
									</view>
								</view>
							</view>
			        	</view>
			        </view>
			    </uni-swipe-action-item>
				<uni-swipe-action-item :options="options" @click="onClick" @change="change">
				    <view class="l-view">
				    	<view class="product-manage-item l-bb">
				    		<view class="top l-flex l-flex-jc_sb l-flex-ai_c">
				    			<view class="l">
				    				<view class="tag">
				    					公募
				    				</view>
									<view class="name">
										龙鳞十号
									</view>
				    			</view>
								<view class="r bgblue">
									审核中
								</view>
				    		</view>
							<view class="bottom l-flex l-flex-jc_sb">
								<view class="l">
									<view class="">
										10.65%
									</view>
									<view class="">
										近一年收益
									</view>
								</view>
								<view class="m">
									<view class="">
										1.3562
									</view>
									<view class="">
										基金净值
									</view>
								</view>
								<view class="r">
									<view class="">
										股票型
									</view>
									<view class="">
										基金类型
									</view>
								</view>
							</view>
				    	</view>
				    </view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		components: {
		        uniSwipeAction,
		        uniSwipeActionItem
		},
		data() {
			return {
				options:[
					{
						text: '删除',
						style: {
							backgroundColor: '#E22C3B'
						}
					}
				]
			}
		},
		methods: {
			onClick(e){
			    //console.log('当前点击的是第'+e.index+'个按钮，点击内容是'+e.content.text)
				this.$showModal('确定删除此产品？',{
					success(){
						console.log(1)
					},
					error(){
						console.log(2)
					}
				})
			},
			change(open){
			  //console.log('当前开启状态：'+ open)
			}
		}
	}
</script>

<style lang="scss" scoped>
.l-toptitle{
	.add{
		color: #418DE3;
		font-size: 16px;
	}
}
.backf4{
	background-color: #F4F4F4;
	height: 20rpx;
}
.product-manage-item{
	width: 700rpx;
	padding-bottom: 28rpx;
	.top{
		height: 48px;
		.l{
			display: flex;
			align-items: center;
		}
		.tag{
			padding: 4rpx 10rpx;
			font-size: 12px;
			color: #E70012;
			border: 1px solid #E70012;
			border-radius: 4rpx;
			margin-right: 10rpx;
		}
		.name{
			font-size: 16px;
		}
		.r{
			padding: 6rpx 10rpx;
			color: #FFFFFF;
			font-size: 12px;
			border-radius: 8rpx;
		}
		.bgred{
			background-color: #E22C3B;
		}
		.bgblue{
			background-color: #3A7DC9;
		}
		.bgyellow{
			background-color: #D3A35C;
		}
	}
	.bottom{
		.l,.m,.r{
			display: flex;
			flex-direction: column;
			view:nth-of-type(1){
				font-size: 18px;
			}
			view:nth-of-type(2){
				font-size: 13px;
				color: #828282;
				margin-top: 22rpx;
			}
		}
		.l{
			align-items: flex-start;
		}
		.m{
			align-items: center;
		}
		.r{
			align-items: flex-end;
		}
	}
}
</style>
