<template>
	<view class="notice">
		<top-notice :texts='noticeStr' :show="true"></top-notice>
		<view class="publicmes">
			<view class="noticemsg l-flex">
				<view class="noticeimg">
					<image src="../../static/gx@2x.png" mode=""></image>
				</view>
				<view class="l-flex l-flex-direction l-flex-jc_sb l-flex-1" @tap="$nav({url:'/pages/road/road-details'})">
					<view class="l-flex l-flex-jc_sb">
						<view class="name">
							净值更新
						</view>
						<view class="time">
							<template v-if="beforetwelve">
								<view>12小时以前</view>
							</template>
							<template v-else>
								<view>03-24&nbsp;&nbsp;12:00</view>
							</template>
						</view>
					</view>
					<view class="l-flex l-flex-jc_sb">
						<view class="news">
							<view>尊敬的投资者，您订阅的产品净值有更新</view>
						</view>
						<view class="ubt" v-if="newsnum>0">
							{{newsnum}}
						</view>
					</view>
				</view>
			</view>
			
			<view class="noticemsg l-flex" @tap="$nav({url:'/pages/information/information'})">
				<view class="noticeimg">
					<image src="../../static/zx@2x.png" mode=""></image>
				</view>
				<view class="l-flex l-flex-direction l-flex-jc_sb l-flex-1">
					<view class="l-flex l-flex-jc_sb">
						<view class="name">
							路演资讯
						</view>
						<view class="time">
							<template v-if="beforetwelve">
								<view>12小时以前</view>
							</template>
							<template v-else>
								<view>03-24&nbsp;&nbsp;12:00</view>
							</template>
						</view>
					</view>
					<view class="l-flex l-flex-jc_sb">
						<view class="news">
							<view>尊敬的投资者，您订阅的产品净值有更新</view>
						</view>
						<view class="ubt" v-if="newsnum>0">
							{{newsnum}}
						</view>
					</view>
				</view>
			</view>
			
			<view class="noticemsg l-flex" @tap="$nav({url:'/pages/notification/system-infor'})">
				<view class="noticeimg">
					<image src="../../static/xttz.png" mode=""></image>
				</view>
				<view class="l-flex l-flex-direction l-flex-jc_sb l-flex-1">
					<view class="l-flex l-flex-jc_sb">
						<view class="name">
							系统通知
						</view>
						<view class="time">
							<template v-if="beforetwelve">
								<view>12小时以前</view>
							</template>
							<template v-else>
								<view>03-24&nbsp;&nbsp;12:00</view>
							</template>
						</view>
					</view>
					<view class="l-flex l-flex-jc_sb">
						<view class="news">
							<view>尊敬的投资者，您订阅的产品净值有更新</view>
						</view>
						<view class="ubt" v-if="newsnum>0">
							{{newsnum}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="privatemes">
			<view class="chat-list uni-padding-wrap" >
				<!-- <navigator url="../friend-invitiaon/friend-invitiaon">
					<uni-list-item title="好友通知" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" :badge-text="String(newFriendInvitiaon)"
					 :show-badge="newFriendInvitiaon?true:false" />
				</navigator> -->
			
			
					<view class="scroll-do">
			
						<view class="uni-flex uni-row items" @longpress="bindClick(index)" @click.stop="chatDetail(index)" v-for="(item,index) in lists" :key="index" >
							<view class="flex-item image">
								<image class="img" :src="item.avatar  || '../../static/ren@2x.png'" mode="aspectFill"></image>
								<view class="badge" v-if="item.target.isNoDisturb == false && item.unreadCount != ''">{{item.unreadCount}}</view>
							</view>
							<view class="flex-item contents">
								<view class="title">
									{{item.title}}
									<text>{{item.lastMessageTime}}</text>
								</view>
								<view class="text-small">{{item.lastMessageText}}</view>
							</view>
						</view>
					</view>
				<!-- </view> -->
			</view>
			<!-- <view class="noticemsg l-flex" @longpress="bindClick(index)" @click.stop="chatDetail(index)">
				<view class="noticeimg">
					<image src="../../static/picture.png" mode=""></image>
				</view>
				<view class="l-flex l-flex-direction l-flex-jc_sb l-flex-1">
					<view class="l-flex l-flex-jc_sb">
						<view class="name">
							用户名
						</view>
						<view class="time">
							<template v-if="beforetwelve">
								<view>12小时以前</view>
							</template>
							<template v-else>
								<view>03-24&nbsp;&nbsp;12:00</view>
							</template>
						</view>
					</view>
					<view class="l-flex l-flex-jc_sb">
						<view class="news">
							<view>尊敬的投资者，您订阅的产品净值有更新fdhsakjhfaskjfhkj</view>
						</view>
						<view class="ubt">
							99+
						</view>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	let _self;
	export default {
		data() {
			return {
				noticeStr:'最新净值、最新热点资讯、业务进度不容错过！去开启',
				beforetwelve:false,
				newsnum:1,
				
				isDel: null,
				lists: [],
				options2: [{
					text: '删除',
					style: {
						backgroundColor: '#FF3A30'
					}
				}],
			}
		},
		computed:{
			...mapState(['hasLogin', 'loginProvider', 'nickname', 'avatar', 'receiveMessage', 'newFriendInvitiaon']),
			qualified() {
				return this.$store.getters.qualified;
			},
			conversations(){
				return this.$store.getters.conversations;
			}
		},
		onLoad(){
			_self = this;
		},
		onShow() {
			if(this.hasLogin){
				this.getList();
			}else{
				let _this = this;
				_this.$showModal('您还未登录，是否立即去登录?',{
					success(){
						_this.$nav({ url: '/pages/register/register' })
					},
					error(){
						_this.$nav({ url: '/pages/index/index' }, 'switchTab')
					}
				})
			}
		},
		onPullDownRefresh() {
			if(this.hasLogin){
				this.getList();
			}
		},
		watch: {
			receiveMessage(res) {
				console.log("监听到新消息，更新列表");
				this.getList();
			},
			conversations(n){
				let list = this.setList(n);
				this.lists = list;
				this.$store.dispatch('getAllUnreadCount');
			},
		},
		methods: {
		
			bindClick(index) {
				let _this = this;
				
				_this.$showModal('删除会话会把历史消息也同时删除，确定删除该会话嘛？', {
					success(){
						let item = _this.lists[index]
						// 删除
						var params = {
							"type": "single",
							"username": item.target.username
						};
						_this.isDel = null
						_this.jpushIM.deleteConversation(params, (res) => {
							if (res.errorCode == 0) {
								_this.getList();
								_this.$toast('删除成功')
							} else {
								uni.showModal({
									title: '删除失败',
									content: "原因：" + res.errorMsg,
									showCancel: false,
									cancelText: '',
									confirmText: '关闭'
								});
							}
						})
					}
				})
				
			
			},
			// 从本地数据库中获取会话列表，默认按照会话的最后一条消息的时间，降序排列
			getList() {
				uni.stopPullDownRefresh();
				_self.$store.dispatch('getConversations')
			},
			setList: function(items) {
				var newItems = [];
				items.forEach((e) => {
					if (e) {
						if (e.latestMessage) {
							if (e.latestMessage.messageType == "image") {
								e.lastMessageText = "[图片]";
							} else if (e.latestMessage.messageType == "voice") {
								e.lastMessageText = "[语音]";
							} else {
								e.lastMessageText = e.latestMessage.messageString;
							}
							e.lastMessageTime = this.imUtils.formatDateTime((e.latestMessage.createTime), "str");
						} else {
							e.lastMessageText = "";
							e.lastMessageTime = "";
						}
						if(e.conversationType == "single"){
							// 单聊会话
							e.avatar = e.target.avatar ? e.target.avatar : "../../static/img/im/chat_icon.png";
						}else if(e.conversationType == "group"){
							// 群聊会话
							e.avatar = "../../static/img/im/chat_icon_group.jpg"
						}
						newItems.push(e);
					}
				});
				return newItems;
			},
			chatDetail(index) {
				let item = this.lists[index];
				
				let title = item.target.nickname ? item.target.nickname : item.target.username;
				uni.navigateTo({
					url: '/pages/im-chat/im-chat?title=' + title + '&fromUser=' + item.target.username
				});
				 
			}
		}
	}
</script>

<style scoped lang="scss">
.notice{
	background-color: #F6F6F6;
	min-height: calc(100vh - var(--window-top));
}
.publicmes{
	margin-bottom: 20rpx;
}
.privatemes{
	padding: 24rpx;
	background-color: #FFFFFF;
}
.noticemsg{
	padding: 24rpx;
	background-color: #FFFFFF;
	image{
		width: 94rpx;
		height: 94rpx;
	}
	.name{
		font-size: 17px;
	}
	.time{
		color: #828282;
		font-size: 12px;
	}
	.news{
		font-size: 14px;
		color: #828282; 
		align-items: flex-start;
		view{
			width: 502rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: pre; 
		}
	}
}
.noticeimg{
	margin-right: 25rpx;
}
.ubt{
	padding: 1px 4px;
	border-radius: 16px;
	color: #FFFFFF;
	text-align: center;
	background-color: #fd4857;
	font-size: 11px;
}
</style>
