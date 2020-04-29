<template>
	<view class="container">
		<view class="l-view">
			<view class="add-item l-bb">
				<view class="l-flex name l-flex-ai_c">
					<view class="">
						产品类型
					</view>
					<span>*</span>
				</view>
				<view class="">
					<input type="text" value="" placeholder="请输入私募/公募" placeholder-class="placeclass"/>
				</view>
			</view>
			<view class="add-item">
				<view class="l-flex name l-flex-ai_c">
					<view class="">
						产品名称
					</view>
					<span>*</span>
				</view>
				<view class="">
					<input type="text" value="" placeholder="请输入产品名称" placeholder-class="placeclass"/>
				</view>
			</view>
		</view>
		<view class="backf4">
			
		</view>
		<view class="l-view">
			<view class="add-item l-bb">
				<view class="l-flex name l-flex-ai_c">
					<view class="">
						预期收益
					</view>
					<span>*</span>
				</view>
				<view class="">
					<input type="text" value="" placeholder="请输入年化收益" placeholder-class="placeclass"/>
				</view>
			</view>
			<view class="add-item l-bb">
				<view class="l-flex name l-flex-ai_c">
					<view class="">
						起投金额
					</view>
					<span>*</span>
				</view>
				<view class="">
					<input type="text" value="" placeholder="请输入起投金额" placeholder-class="placeclass"/>
				</view>
			</view>
			<view class="add-item l-bb">
				<view class="l-flex name l-flex-ai_c">
					<view class="">
						产品期限
					</view>
					<span>*</span>
				</view>
				<view class="">
					<input type="text" value="" placeholder="请输入产品期限" placeholder-class="placeclass"/>
				</view>
			</view>
			<view class="add-item l-bb">
				<view class="l-flex name l-flex-ai_c">
					<view class="">
						附件
					</view>
				</view>
				<view class="l-flex fujian l-flex-ai_c l-flex-jc_sb l-flex-1" @tap="$nav({url:'/pages/tool/select-attachment'})">
					<input type="text" value="" placeholder="请选择附件" placeholder-class="placeclass" disabled/>
					<view class="">
						<image src="../../static/right@2x.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="add-item">
				<view class="l-flex name l-flex-ai_c">
					<view class="">
						推荐理由
					</view>
					<span>*</span>
				</view>
				<view class="">
					
				</view>
			</view>
			<view class="div-textarea">
				<textarea value="" placeholder="请输入产品介绍及特色" placeholder-style="color:#afafaf;font-size:13px;" maxlength="200"/>
				<text class="div-count">0/200</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.add-item{
	display: flex;
	align-items: center;
	height: 88rpx;
	.name{
		width: 212rpx;
		font-size: 16px;
		span{
			width:14rpx;
			height: 16rpx;
			margin-left: 8rpx;
			color: #E70012;
		}
	}
	imput{
		flex: 1;
		font-size: 15px;
	}
	.placeclass{
		color: #AFAFAF;
	}
	.fujian{
		image{
			width: 14rpx;
			height: 22rpx;
		}
	}
}
.backf4{
	height: 20rpx;
	background-color: #F4F4F4;
}
.div-textarea{
	position: relative;
	width: 660rpx;
	height: 296rpx;
	border: 1px solid #E3E0E0;
	padding: 20rpx;
	textarea{
		width: 100%;
	}
	.div-count{
		position: absolute;
		right: 20rpx;
		bottom: 20rpx;
		color: #AFAFAF;
		font-size: 13px;
	}
}
</style>
