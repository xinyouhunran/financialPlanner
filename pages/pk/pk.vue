<template>
	<view class="l-container">
		<view class="l-navbar-parent">
			<navbar-lyp title="PK对比" handle="编辑" @onHandle="$nav({url: '/pages/pk/pk-manage'})"></navbar-lyp>
		</view>

		<view class="l-main">
			<view class="l-view-1 l-view">
				<view class="l-view-handle" @tap="navGoAdd">
					添加产品
				</view>
				<view class="l-view-product">
					<template v-if="storageList.length">
						<pk-list :dataInfo="s" type="myList" 
						type1="superList" :key="i"
						:index="i" v-for="(s, i) in storageList" 
						:isClick="isClick" @ontap="ontap"></pk-list>
					</template>
					<view class="l-list-none l-list-none-1" v-else>
						<view class="l-list-view">
							<image class="l-img-none" src="../../static/kong@2x.png" mode="aspectFill"></image>
							<view class="l-list-text">您尚未添加我的自选</view>
						</view>
					</view>
				</view>
			</view>

			<view class="l-view-2 l-view">
				<view class="l-tab">
					<view class="l-tab-item" @tap="tabIndex = i" 
					:class="{ 'l-tab-active': i == tabIndex }" 
					v-for="(s, i) in tab" :key="i">
						{{ s.title }}
					</view>
				</view>
			</view>

			<swiper @change="changeSwiper" :current="tabIndex" :style="{ height: swiperHeight + 'px' }">
				<swiper-item>
					<scroll-view class="l-scroll" scroll-y="true">
						<view class="l-view-3 l-view">
							<template v-if="myList.length">
								<pk-list :dataInfo="s" type="storageList" type1="superList"  :key="i"
								:isClick="isClick" v-for="(s, i) in myList" @ontap="ontap"></pk-list>
							</template>
							<view class="l-list-none" v-else>
								<view class="l-list-view">
									<image class="l-img-none" src="../../static/kong@2x.png" mode="aspectFill"></image>
									<view class="l-list-text">您尚未添加我的自选</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view class="l-scroll" scroll-y="true">
						<view class="l-view-3 l-view">
							<pk-select-item-home :dataInfo="s" v-for="(s, i) in superList" 
							:index="i" :isClick="isClick" type="myList" type1="storageList"
							:key="i" @ontap="ontap"></pk-select-item-home>
						</view>
					</scroll-view>

				</swiper-item>
				<swiper-item>
					<scroll-view class="l-scroll" scroll-y="true">
						<view class="l-view-3 l-view">
							<view v-if="historyList.length">
								<pk-record :dataInfo="s" v-for="(s, i) in historyList" :key="i"></pk-record>
							</view>
							<view v-else class="l-list-none">
								<view class="l-list-view">
									<image class="l-img-none" src="../../static/kong@2x.png" mode="aspectFill"></image>
									<view class="l-list-text">您尚未发起pk对比</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>


		</view>

		<view class="l-view-btn">
			<button class="l-btn l-btn-pk" @tap="submit" 
			:class="{ 'l-btn-pk-active': confirmList.length > 1 }" 
			:disabled="!(confirmList.length > 1)">
				开始对比{{ confirmList.length ? '(' + confirmList.length + ')' : '' }}
			</button>
		</view>
	</view>
</template>

<script>
	import navbarLyp from '@/components/navbar-lyp/navbar-lyp.vue';
	import pkSelectItemHome from './pk-select-item-home.vue';
	import pkRecord from './pk-record.vue';
	import pkList from './pk-list.vue';

	export default {
		components: {
			navbarLyp,
			pkList,
			pkRecord,
			pkSelectItemHome
		},
		data() {
			return {
				tab: [{
						title: '我的自选'
					},
					{
						title: '为你推荐'
					},
					{
						title: '对比记录'
					}
				],
				myList: [],
				historyList: [],
				storageList: [],
				params: {
					'pageInfo.pageIndex': 1,
					'pageInfo.pageSize': 10
				},
				status: 'loading',
				statusOption: {
					loading:'loading',
					more: 'more',
					noMore: 'noMore'
				},
				id: '',
				tabIndex: 1,
				tabHeight: 40,
				navbarHeight: 44,
				bottomHeight: 44,
				swiperHeight: 500,
				confirmList: [],
				superList: []
			}
		},
		computed: {
			isClick(){
				return this.confirmList.length == 5
			}
		},
		onLoad(e) {
			this.id = e.id || '';
			this.init()
		},
		onReady() {
			this.getHeadHeight();
		},
		methods: {
			init(){
				this.historyList = this.$getStorage('pkList') || [];
				this.storageList = this.$getStorage('storageList') || [];
				this.storageList.forEach(e => {
					e.isCheck = false;
				})
				if(this.id){
					this.formatData()
				}
				this.getListFn();
				this.superProduceFn()
			},
			manageInit(){
				this.historyList = this.$getStorage('pkList') || [];
				this.storageList = this.$getStorage('storageList') || [];
				this.$forceUpdate()
			},
			submit(){
				let pkList = this.$getStorage('pkList') || [];
				pkList.unshift({
					list: this.confirmList,
					date: this.$yymmdd(),
					id: +new Date() + ''
				});
				this.historyList = pkList;
				this.$setStorage('pkList', pkList)
				setTimeout(() => {
					this.$nav({ url: '/pages/pk/pk-contrast' })
				},300)
				
			},
			navGoAdd(){
				this.$setStorage('storageList', this.storageList);
				this.$nav({ url: '/pages/pk/pk-add' })
			},
			formatData(){
				let storageList = this.storageList;
				let index = storageList.map(e => e.id).indexOf(this.id);
				if(index === -1){
					this.getProduce()
				}else{
					this.confirmList.push(this.storageList[index])
					this.$set(this.storageList[index], 'isCheck', true)
				}
				this.$setStorage('storageList', storageList)
			},
			changeSwiper(e) {
				if (e.detail.source == "touch") {
					this.tabIndex = e.detail.current;
				}
			},
			ontap(s, i, type, type1){
				if(type){
					let index = this[type].map(e => e.id).indexOf(s.id);
					if(index !== -1){
						this.$set(this[type], index, s)
					}
				}
				if(type1){
					let index = this[type1].map(e => e.id).indexOf(s.id);
					if(index !== -1){
						this.$set(this[type1], index, s)
					}
				}
				if(s.isCheck){
					this.confirmList.push(s);
				}else{
					let index = this.confirmList.map(e => e.id).indexOf(s.id);
					if(index !== -1){
						this.confirmList.splice(index, 1);
					}
				}
			},
			superProduceFn(){
				let _this = this;
				let params = { 
					'pageInfo.pageSize': 10000,
					'pageInfo.pageIndex': 1
				};
				let url = 'product/recommend/list';
				
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || [];
						
						let storageList = _this.storageList;
						info.forEach(e => {
							let index = storageList.map(e => e.id).indexOf(e.securityId + '');
							if(index !== -1){
								e.isCheck = storageList[index].isCheck;
							}
						})
						
						_this.superList = _this.getStorageList(info);
					}
				})
			},
			getProduce(){
				let _this = this;
				let params = { securityId: _this.id };
				let url = 'produce/summary';
				
				
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || {};
						let d = {
							id: info.securityId + '',
							secShortName: info.secShortName,
							secFullName: info.secFullName,
							returnAccum: info.returnAccum,
							isCheck: true
						}
						_this.storageList.unshift(d)
						
						_this.confirmList.push(d)
						
						_this.$setStorage('storageList', _this.storageList);
					}
				})
			},
			getStorageList(list){
				return list.map(e => {
					return {
						id: e.securityId + '',
						secShortName: e.secShortName,
						secFullName: e.secFullName,
						returnAccum: e.returnAccum,
						isCheck: !!e.isCheck
					}
				})
			},
			getListFn(){
				let _this = this;
				let params = {
					'pageInfo.pageSize': 10000,
					'pageInfo.pageIndex': 1
				};
				let url = 'user/fav/funds/list';
				
				
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || {};
						let data = info.list || [];
						let storageList = _this.storageList;
						data.forEach(e => {
							let index = storageList.map(e => e.id).indexOf(e.securityId + '');
							if(index !== -1){
								e.isCheck = storageList[index].isCheck;
							}
						})
						
						_this.myList = this.getStorageList(data);
					}
				})
			},
			getHeadHeight() {
				let _this = this; 

				let query = uni.createSelectorQuery().in(this);

				// #ifdef APP-PLUS
				query
				.select('.l-navbar-parent')
				.boundingClientRect(data => {})
				.select('.l-view-btn')
				.boundingClientRect(data => {})
				.select('.l-tab')
				.boundingClientRect(data => {})
				.exec(data => {
					_this.swiperHeight = _this.$getSystem.windowHeight - data.map(e => e.height).reduce((a, b) => a + b)
				});
				// #endif
				// #ifdef H5
				query
				.select('.l-navbar-parent')
				.boundingClientRect(data => {})
				.select('.l-view-btn')
				.boundingClientRect(data => {})
				.select('.l-tab')
				.boundingClientRect(data => {})
				.exec(data => {
					_this.swiperHeight = _this.$getSystem.windowHeight - data.map(e => e.height).reduce((a, b) => a + b)
				});
				// #endif

				// query.
				// select('.l-view-btn')
				// 	.boundingClientRect(data => {
				// 		_this.bottomHeight = data.height;
				// 	}).exec();

				// query.
				// select('.l-view-1')
				// 	.boundingClientRect(data => {
				// 		_this.bottomHeight = data.height;
				// 	}).exec();

				// query.
				// select('.l-tab')
				// 	.boundingClientRect(data => {
				// 		_this.tabHeight = data.height;
				// 	}).exec();

			},
		}
	}
</script>

<style scoped>
	@import url("./pk.css");
</style>
