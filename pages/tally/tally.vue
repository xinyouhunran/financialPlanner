<template>
	<view class="l-container">
		<view class="l-navbar">
			<view class="l-navbar-place"></view>
			<view class="l-navbar-view">
				<view class="l-navbar-nav" @tap="cancel">
					取消
				</view>
				<view class="l-navbar-title">
					记账编辑
				</view>
				<view class="l-navbar-handle" @tap="onHandle">
					保存
				</view>
			</view>
		</view>
		 
		<view class="l-main">
			<view class="l-view-1">
				<view class="l-view-1-left l-txt-hidden">
					{{ dataInfo.secShortName || dataInfo.secFullName || '' }}
				</view>
				<view class="l-view-1-right" @tap="$nav({ url: '/pages/tally/tally-search' })">
					<text class="l-icon l-icon-transform"></text>
				</view>
			</view>
			<view class="l-view-2">
				<view class="l-view-left">
					<span class="l-color-red">*</span>
					<span>申购金额</span>
				</view>
				<view class="l-view-center">
					<input type="number" maxlength="8" placeholder="0.00" v-model="principal"/>
				</view>
				<view class="l-view-right l-view-2-right">
					(万) （不含手续费）
				</view>
			</view>
			<view class="l-view-3">
				<view class="l-view-left">
					<span class="l-color-red">*</span>
					<span>申购时间</span>
				</view>
				<view class="l-view-center">
					<input type="text" disabled v-model="buyDate" placeholder="选择申购时间" />
				</view>
				<view class="l-view-right">
					<span class="l-icon l-icon-date"></span>
				</view>
				<dyDatePicker class="l-picker" @getData="getData" placeholder="请选择日期" minSelect="2010/01/01" :maxSelect="maxSelect"></dyDatePicker>
			</view>
		</view>
		
	</view>
</template>

<script>
	import dyDatePicker from '@/components/dy-Date/dy-Date.vue'
	export default {
		components: {
			dyDatePicker
		},
		data(){
			return {
				dataInfo:{},
				buyDate: '',
				type: 'add',
				principal:'',
				securityId: '',
				maxSelect: ''
			}
		},
		onLoad(e) {
			this.type = e.type || 'add';
			this.id = e.id || '';
			let newDate = new Date();
			this.maxSelect = [newDate.getFullYear(),newDate.getMonth()+1,newDate.getDate()].join('/');
			this.init()
		},
		computed:{
			isType(){
				return this.type === 'edit'
			}
		},
		methods:{
			init(){
				if(this.isType){
					this.fundList();
				}else{
					this.summary();
				}
			},
			cancel(){
				let _this = this;
				_this.$back();
			},
			onHandle(){
				let _this = this;
				
				let securityId = _this.id;
				if(!securityId){
					_this.$toast('您还未选择基金');
					return
				}
				let principal = parseFloat(_this.principal||0);
				if(principal <= 0){
					_this.$toast('您还未输入金额');
					return
				}
				let buyDate = _this.buyDate;
				if(!buyDate){
					_this.$toast('您还未选择时间');
					return
				}
				this[_this.type]()
			},
			edit(){
				let _this = this;
				
				let url = 'user/fundAccount/edit';
				let buyDateStr = _this.buyDate;
				let id = _this.id;
				let principal = _this.principal;
				let params = { id, principal, buyDateStr };
				
				_this.$post(url, params)
				.then(res => {
					if(res.code == 200){
						let page = _this.$pageList();
						page.init();
						_this.$back();
						setTimeout(() => {
							_this.$toast('编辑成功');
						},500)
					}else{
						_this.$toast(res.message)
					}
				})
			},
			add(){
				let _this = this;
				
				let url = 'user/fundAccount/add';
				let buyDateStr = _this.buyDate;
				let securityId = _this.id;
				let principal = _this.principal;
				let params = { securityId, principal, buyDateStr };
				
				_this.$post(url, params)
				.then(res => {
					if(res.code == 200){
						let page = _this.$pageList(3);
						// #ifdef H5
						if(page.route.indexOf('pages/app/earnings/earnings') != -1){
							_this.$back(2)
						}else{
							_this.$nav({ url: '/pages/app/earnings/earnings' }, 'redirectTo')
						}
						// #endif
						// #ifdef APP-PLUS
						if(page.$scope.route.indexOf('pages/app/earnings/earnings') != -1){
							_this.$back(2)
						}else{
							_this.$nav({ url: '/pages/app/earnings/earnings' }, 'redirectTo')
						}
						// #endif
					}else{
						_this.$toast(res.message)
					}
				})
			},
			getData(e){
				this.buyDate = e;
			},
			summary(){
				let _this = this;
				let params = { securityId : _this.id };
				let url = "produce/summary";
				
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || {};
						_this.dataInfo = info;
					}
				})
			},
			fundList(){
				let _this = this;
				let params = { id: _this.id };
				let url = 'user/fundAccount/list';
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || {};
						
						let data = info.list || [];
						
						_this.buyDate = this.$yymmdd(data[0].buyDate,'', '-');
						_this.principal = parseFloat(data[0].principal);
						
						_this.dataInfo = data[0];
						
						
					}
				})
			}
		}
	}
</script>

<style scoped>
	.l-navbar{
		position: relative;
		width:750rpx;
		/* #ifdef H5 */
		height:94rpx;
		/* #endif */
		font-size: 30rpx;
	}
	
	.l-navbar-place{
		width:750rpx;
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height);
		/* #endif */
		height:94rpx;
	}
	
	.l-navbar-view{
		height: 94rpx;
		padding: 0 34rpx;
		position: fixed;
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height);
		/* #endif */
		top: 0;
		left: 0;
		width: calc(100% - 68rpx);
		display: flex;
		align-items: center;
		justify-content: space-between;
		background:rgba(237,237,237,1);
		z-index: 11;
	}
	
	.l-navbar-title{
		font-size: 36rpx;
	}
	
	.l-navbar-handle{
		color: #E70012;
	}
	
	
	.l-main{
		font-size: 34rpx;
		padding: 36rpx 30rpx;
	}
	
	.l-view-1{
		font-size: 36rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.l-view-1-left{
		width: calc(100% - 74rpx);
	}
	
	.l-view-2,
	.l-view-3{
		white-space: nowrap;
		display: flex;
		padding-top: 69rpx;
		align-items: center;
		position: relative;
	}
	
	.l-view-center{
		flex: 1;
		padding: 0 24rpx;
	}
	
	.l-view-2-right{
		font-size: 30rpx;
		color: #828282;
	}
	
	.l-icon-transform{
		width: 44rpx;
		height: 44rpx;
		background-image: url('~@/static/zhuanhuan@2x.png');
	}
	
	.l-icon-date{
		width: 44rpx;
		height: 44rpx;
		background-image: url('~@/static/date@2x.png');
	}
	
	.l-color-red{
		color: #E70012;
		font-weight: bold;
		margin-right: 12rpx;
	}
	
	.l-picker{
		position: absolute;
		width: calc(100% - 74rpx);
		left: 164rpx;
		height: 48rpx;
		bottom: 0;
		opacity: 0;
	}
</style>
