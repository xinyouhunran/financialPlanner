<template>
	<view class="l-container">
		<view class="l-thead">
			<t-head :dataInfo="orgInfo" :partyId="id"></t-head>
		</view>

		<view class="l-body-swper">
			<view class="l-vswitch l-flex l-flex-ai_c l-flex-jc_sb" :class="{ 'l-tab-posi': tabPosi }">
				<view class="l-vswitch-item" v-for="(s, i) in vSwitch" :key="i" @tap="vSwitchIndex = i" :class="{ 'l-vswitch-item-active' : vSwitchIndex == i }">
					{{ s.title }}<text class="l-vswitch-item-sub" v-if="s.sub && s.sub > 0">{{ s.sub }}</text>
				</view>
			</view>

			<view :style="{ height: swiperTabHeight + 'px'}" class="l-placeholder-view" :class="{ 'l-placeholder': tabPosi }"></view>

			<view class="l-swiper-item" :class="{ 'l-swiper-item-block': vSwitchIndex == ii }" v-for="(s, ii) in vSwitch" :key="ii">
				<view>
					<template v-if="orgInfo.storeUser && vSwitchIndex == 0">
						<view class="l-decorate">
							<view class="l-decorate-list" v-for="(s, i) in storeDesignList" :key="i">
								<view class="l-decorate-title">
									<span>{{ s.title || '' }}</span>
									<span class="l-decorate-title-sub">{{ s.subTitle || '' }}</span>
								</view>
								<view class="l-decorate-content" v-html="s.content">
									{{ s.content || '' }}
								</view>
							</view>
							<view v-if="!storeDesignList.length" class="l-more" style="color: #828282;font-size: 14px;text-align: center;line-height: 80rpx;">
								暂无信息
							</view>
						</view>
					</template>
					<template v-if="vSwitchIndex == index+0">
						<product-list :dataInfo="s" v-for="(s,i) in fundList" :key="i"></product-list>
						<view class="example-body" v-if="vSwitch[index].sub != fundList.length && fundList.length">
							<uni-load-more :status="status" />
						</view>
					</template>
					<template v-if="vSwitchIndex == index+1">
						<manager-list :dataInfo="s" v-for="(s,i) in orgInfo.managers" :key="i"></manager-list>
					</template>
					<template v-if="vSwitchIndex == index+2">
						<view style="padding-top: 47rpx;">
							<record :dataInfo="orgInfo"></record>
						</view>
					</template>
					<template v-if="vSwitchIndex == index+3">
						<view>
							<view class="l-swiper-i-title">相关路演{{ roadList.length ? '('+roadList.length+')' : '' }}</view>
							<road-list :dataInfo="s" v-for="(s,i) in roadList" :key="i"></road-list>
							<view v-if="!roadList.length" class="l-more" style="color: #828282;font-size: 14px;text-align: center;line-height: 80rpx;">
								暂无信息
							</view>
						</view>
						<view v-if="length">
							<view class="l-swiper-i-title">相关资讯({{ length }})</view>
							<windzxsh v-for="(s,i) in windzxshList" :dataInfo="s"  :key="i"></windzxsh>
						</view>
					</template>
					<template v-if="vSwitchIndex == index+4">
						<view class="l-swiper-i-reply l-flex l-flex-ai_c l-flex-jc_sb">
							<text>匿名点评：目前仅限iFundVIP用户</text>
							<view class="l-flex l-flex-ai_c">
								<text>评论须知</text>
								<!-- <text class="l-icon l-icon-wenhao"></text> -->
							</view>
						</view>
						<comment-list :dataInfo="s" v-for="(s,i) in commentList" :key="i"></comment-list>
						<view class="l-reply-place"></view>
						<view class="l-reply">
							<!-- #ifdef APP-PLUS -->
							<view class="l-reply-send">
								<textarea class="l-txt" auto-height="true" :disabled="!qualified" @click="isVip = !qualified" :cursor-spacing="10"
								 v-model="reply.content" placeholder="发表匿名评论~" />
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
					</template>
				</view>
			</view>
		</view>
		<navgo-login :keys="'bottom'" :value="'118'"></navgo-login>
		<uni-pop-vip v-if="isVip" @close="isVip = false"></uni-pop-vip>
		<uni-pop-lyp v-if="isCFP" type="0" :targetId="id" @success="isCFP = false" @close="isCFP = false"></uni-pop-lyp>
		<t-foot  :dataInfo="orgInfo" @getReport="isVip = !qualified" @subscribe="isCFP = true"></t-foot>
	</view>
</template>

<script>
	import tHead from './t-head.vue';
	import tFoot from './t-foot.vue';
	import record from './record.vue';
	import uniPopLyp from '@/components/uni-pop-lyp/uni-pop-lyp.vue';
	import productList from './product-list.vue';
	import managerList from './manager-list.vue';
	import commentList from './comment-list.vue';
	import windzxsh from '../tabbar/componens/windzxsh.vue';
	import roadList from '../tabbar/componens/road-list-conpany.vue';
	import navgoLogin from '@/components/navgo-login/navgo-login.vue';

	export default {
		components: {
			tHead,
			tFoot,
			productList,
			navgoLogin,
			managerList,
			roadList,
			windzxsh,
			commentList,
			record,
			uniPopLyp
		},
		data() {
			return {
				tabPosi:false,
				isCFP:false,
				isVip: false,
				roadList:[],
				reply:{
					targetId: '',
					type: '0',
					content: ''
				},
				windzxshList: [],
				commentList:[],
				params: {
					'pageInfo.pageIndex': 1,
					'pageInfo.pageSize': 10
				},
				params1: {
					'pageInfo.pageIndex': 1,
					'pageInfo.pageSize': 10
				},
				params2: {
					'pageInfo.pageIndex': 1,
					'pageInfo.pageSize': 10
				},
				fundList:[],
				status: 'loading',
				status2: 'loading',
				statusOption: {
					loading:'loading',
					more: 'more',
					noMore: 'noMore'
				},
				swiperTabHeight: 51,
				
				vSwitchIndex: 0,
				index: 0,
				vSwitch: [{
						title: '产品',
						sub: ''
					},
					{
						title: '经理',
						sub: ''
					},
					{
						title: '档案',
						sub: ''
					},
					{
						title: '路演',
						sub: ''
					},
					{
						title: '点评',
						sub: ''
					}
				],
				id: '',
				storeDesignList: [],
				orgInfo: {}
			}
		},
		onLoad(e) {
			this.id = e.id || this.$companyId;
			this.reply.targetId = this.id;
			this.init();
		},
		onReady() {
			this.getHeadHeight();
		},
		watch:{
			qualified(){
				this.init();
			},
			orgInfo(){
				if(this.orgInfo.storeUser){
				   this.vSwitch.unshift({ title: '首页', sub: '' })
				   this.storeDesignListFn()
			    }
			}
		},
		computed:{
			getSystem() {
				return this.$getSystem;
			},
			qualified(){
				return this.$store.getters.qualified;
			},
			user(){
				return this.$store.getters.user
			},
			length(){
				return this.windzxshList.length
			}
		},
		onReachBottom() {
			if(this.vSwitch[this.index].title === '产品' || this.vSwitchIndex == this.vSwitch.length - 1){
				let bool = this.vSwitchIndex == this.vSwitch.length - 1;
				let pageInfo = this.params;
				let list = bool ? this.commentList : this.fundList;
				let pageIndex = pageInfo['pageInfo.pageIndex'];
				let pageSize = pageInfo['pageInfo.pageSize'];
				let total = this.vSwitch[this.index].sub;
				let length = pageIndex * pageSize;
				if(length < total && list.length === length){
					if(!bool){
						++this.params['pageInfo.pageIndex']
						this.getFundFn();
					}else{
						++this.params1['pageInfo.pageIndex']
						this.commentListFn();
					}
				}
			}
		},
		onPageScroll(e) {
			if(e.scrollTop > this.tHeadHeight){
				if(!this.tabPosi){
					this.tabPosi = !this.tabPosi;
				}
			}else{
				if(this.tabPosi){
					this.tabPosi = !this.tabPosi;
				}
			}
		},
		methods:{
			init(){
				this.orgInfoFn();
				this.roadListFn();
				this.commentListFn();
				
			},
			windzxshListFn(){
				let _this = this;
				let params = { key: _this.orgInfo.partyShortName };
				let url = 'news/search';
				_this.$get(url, params)
				.then(res => { 
					if(res.code == 200){
						let info = res.content || {};
						
						let data = info.list || [];
						
						_this.windzxshList = data;
						
					}
				})
			},
			commentListFn(){
				let _this = this;
				let params = _this.params1;
				params.targetId  = _this.id;
				params.type = 1;
				let url = 'comment/list';
				_this.status1 = _this.statusOption.more;
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || {};
						_this.vSwitch[_this.vSwitch.length - 1].sub = info.pageInfo && info.pageInfo.recordCount || '';
						let data = info.list || [];
						_this.commentList = _this.commentList.concat(data);
						
						if(_this.vSwitch[_this.vSwitch.length - 1].sub == _this.commentList.length){
							_this.status1 = _this.statusOption.noMore;
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
			/*
			* 
			*/
			getHeadHeight(){
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
			* 
			*/
			onScroll(e){
				let _this = this;
				let top = e.detail.scrollTop;
				if(top > this.tHeadHeight){
					top = this.tHeadHeight;
					if(_this.swiperHeight != _this.copySwiperHeight + top){
						_this.swiperHeight = _this.copySwiperHeight + top;
					}
				}else{
					_this.swiperHeight = _this.copySwiperHeight + top;
				}
				
			},
			/*
			* 
			*/
			onChangeSwiper(e){
				if(this.vSwitchIndex == e.detail.current){
					return
				}
				this.vSwitchIndex = e.detail.current;
			},
			/*
			* 公司详情
			*/
		   orgInfoFn(){
			   let _this = this;
			   let params = { partyId : _this.id };
			   let url = 'org/index/info';
			   
			   _this.$get(url, params)
			   .then(res => {
				   if(res.code == 200){
					   let info = res.content || {};
						_this.orgInfo = info;
						
						let index = _this.vSwitch.map(e => e.title).indexOf('经理');
						_this.vSwitch[index].sub = info.managers.length || ''
					   
					   _this.getFundFn();
					   _this.windzxshListFn()
				   }
			   })
		   },
		   /*
		    * 装潢
		    */
		   storeDesignListFn(){
			    let _this = this;
			    let params = { partyId: _this.id }
			    let url = 'store/design/list'  
				
				_this.$get(url, params)
				.then(res => {
					if(res.code == 200){
						let info = res.content || [];
						this.vSwitch[0].sub = info.length;
						this.storeDesignList = info;
					}
				})
		   },
		   /*
		    * 获取机构下面基金
		    */
		   getFundFn() {
		   	let _this = this;
		   	let params = _this.params;
		   	let url = 'org/fund/list';
		   	params.partyId = _this.id;
		   	_this.status = _this.statusOption.more;
		   	_this.$get(url, params)
		   		.then(res => {
		   			if (res.code == 200) {
		   				let info = res.content || {};
		   				let data = info.list || [];
						_this.index = _this.vSwitch.map(e => e.title).indexOf('产品');
		   				_this.vSwitch[_this.index].sub = info.pageInfo && info.pageInfo.recordCount || '';
						
		   				_this.fundList = _this.fundList.concat(data);
		   				
		   				if(_this.vSwitch[_this.index].sub == _this.fundList.length){
		   					_this.status = _this.statusOption.noMore;
		   				}
		   			}
		   		})
		   },
		   /*
		   * 路演列表
		   */
		   roadListFn(){
		   	let _this = this;
		   	let params = {};
		   	let url = 'roadShow/list';
		   	params.partyId = _this.id;
		   	// _this.status = _this.statusOption.loading;
		   	_this.$get(url, params)
		   	.then(res => { 
		   		if(res.code == 200){
		   			let info = res.content || {};
		   			
		   			// _this.total = info.pageInfo.recordCount || 0;
		   			
		   			let data = info.list || [];
					
					let index = _this.vSwitch.map(e => e.title).indexOf('路演');
					_this.vSwitch[index].sub = info.pageInfo && info.pageInfo.recordCount || '';
		   			
		   			data.forEach(e => {
		   				e.duration = _this.$getDuration(e.showDuration);
		   			})
		   			
		   			_this.roadList = _this.roadList.concat(data);
		   			
		   			// if(_this.dataList.length == _this.total){
		   			// 	_this.status = _this.statusOption.noMore;
		   			// }
		   		}
		   	})
		   }
		}
	}
</script>

<style scoped lang="scss">
	@import url("./company-details.css");
</style>
