<template>
	<view class="l-toptitle">
		<view class="" @tap="$back()">
			<image src="../../static/back@2x.png" mode=""></image>
		</view>
		<view class="">
			{{title}}
		</view>
		<view class="">
			
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
