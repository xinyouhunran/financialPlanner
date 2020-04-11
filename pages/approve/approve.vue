<template>
	<view class="l-container">
		<view class="l-body">
			
			<view class="l-body-item l-body-item-1" v-if="isYes">
				<view class="l-title">
					合格投资者认定-融总管
				</view>
				<view class="l-issue">
					根据《私募投资基金监督管理暂行办法》的规定，私募基金的合格投资者是指具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元且符合下列相关标准的机构和个人： (一)净资产不低于1000万元的机构； (二)金融资产不低于300万元或者最近三年个人年均收入不低于50万元的个人。 前款所称金融资产包括银行存款、股票、债券、基金份额、资产管理计划、银行理财产品、信托计划、保险产品、期货权益等。 此外，下列投资者视为合格投资者： (一)社会保障基金、企业年金、慈善基金； (二)依法设立并受国务院金融监督管理机构监管的投资计划； (三)投资于所管理私募基金的私募基金管理人及其从业人员； (四)中国证监会规定的其他投资者。 如果您接受此认定，即表明您已承诺符合《私募投资基金监督管理暂行办法》中的合格投资者标准,是私募基金的合格投资者。
				</view>
				<view class="l-option">
					<view class="l-option-item" @tap="investorType = 'A'">
						<span class="l-select l-icon l-icon-select" :class="{ 'l-icon-selected': investorType == 'A' }"></span>
						<span>️我已阅读并符合此认定（个人）</span>
					</view>
					<view class="l-option-item" @tap="investorType = 'B'">
						<span class="l-select l-icon l-icon-select" :class="{ 'l-icon-selected': investorType == 'B' }"></span>
						<span>我已阅读并符合此认定（机构）</span>
					</view>
				</view>
				
				<view class="next" @tap="nextTip">
					下一步
				</view>
			</view>
			
			<view class="l-body-item l-body-item-2" v-else>
				
				<view class="l-issue-item" v-for="(s, i) in issueList" :key='i'>
					<template v-if="i<5&&isnextPage">
						<view class="l-issue">
							<span class='l-color-70012'>*</span>
							<span class='l-font-17'>{{ s.issue }}</span>
						</view>
						<view class="l-option">
							<view class="l-option-item" v-if="s.isA" @tap="select(s, 'isA')">
								<span class="l-select l-icon l-icon-select" :class="{ 'l-icon-selected': s.isA.isSelect }"></span>
								<span class="l-select-txt">{{ s.isA.option }}</span>
							</view>
							<view class="l-option-item" v-if="s.isB" @tap="select(s, 'isB')">
								<span class="l-select l-icon l-icon-select" :class="{ 'l-icon-selected': s.isB.isSelect }"></span>
								<span class="l-select-txt">{{ s.isB.option }}</span>
							</view>
							<view class="l-option-item" v-if="s.isC" @tap="select(s, 'isC')">
								<span class="l-select l-icon l-icon-select" :class="{ 'l-icon-selected': s.isC.isSelect }"></span>
								<span class="l-select-txt">{{ s.isC.option }}</span>
							</view>
							<view class="l-option-item" v-if="s.isD" @tap="select(s, 'isD')">
								<span class="l-select l-icon l-icon-select" :class="{ 'l-icon-selected': s.isD.isSelect }"></span>
								<span class="l-select-txt">{{ s.isD.option }}</span>
							</view>
							<view class="l-option-item" v-if="s.isE" @tap="select(s, 'isE')">
								<span class="l-select l-icon l-icon-select" :class="{ 'l-icon-selected': s.isE.isSelect }"></span>
								<span class="l-select-txt">{{ s.isE.option }}</span>
							</view>
						</view>
					</template>
					<template v-if="i>4&&!isnextPage">
						<view class="l-issue">
							<span class='l-color-70012'>*</span>
							<span class='l-font-17'>{{ s.issue }}</span>
						</view>
						<view class="l-option">
							<view class="l-option-item" v-if="s.isA" @tap="select(s, 'isA')">
								<span class="l-select l-icon l-icon-select" :class="{ 'l-icon-selected': s.isA.isSelect }"></span>
								<span class="l-select-txt">{{ s.isA.option }}</span>
							</view>
							<view class="l-option-item" v-if="s.isB" @tap="select(s, 'isB')">
								<span class="l-select l-icon l-icon-select" :class="{ 'l-icon-selected': s.isB.isSelect }"></span>
								<span class="l-select-txt">{{ s.isB.option }}</span>
							</view>
							<view class="l-option-item" v-if="s.isC" @tap="select(s, 'isC')">
								<span class="l-select l-icon l-icon-select" :class="{ 'l-icon-selected': s.isC.isSelect }"></span>
								<span class="l-select-txt">{{ s.isC.option }}</span>
							</view>
							<view class="l-option-item" v-if="s.isD" @tap="select(s, 'isD')">
								<span class="l-select l-icon l-icon-select" :class="{ 'l-icon-selected': s.isD.isSelect }"></span>
								<span class="l-select-txt">{{ s.isD.option }}</span>
							</view>
							<view class="l-option-item" v-if="s.isE" @tap="select(s, 'isE')">
								<span class="l-select l-icon l-icon-select" :class="{ 'l-icon-selected': s.isE.isSelect }"></span>
								<span class="l-select-txt">{{ s.isE.option }}</span>
							</view>
						</view>
					</template>
				</view>
				<view class="l-flex l-flex-jc_c page">
					<span v-if="isnextPage" class="l-color-1c46db">第一页</span>
					<span v-else class="l-color-1c46db">第二页</span>
					<span class="mlmr">|</span>
					<span>共两页</span>
				</view>
				<button class="l-btn l-btn-submit" @tap="nextPage" v-if="isnextPage">下一步</button>
				<button class="l-btn l-btn-submit" @tap="submit" v-if="!isnextPage">提交</button>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	
	let keysList = ['isA', 'isB', 'isC', 'isD', 'isE'];
	
	
	
	export default {
		data(){
			let issueList = [{
					issue: '1：您选择资产管理业务的目的是？',
					keys: 'purpose',
					isA: {
						option: '养老',
						isSelect: false,
						select: 'A'
					},
					isB: {
						option: '子女教育 ',
						isSelect: false,
						select: 'B'
					},
					isC: {
						option: '购房置业 ',
						isSelect: false,
						select: 'C'
					},
					isD: {
						option: '资产增值 ',
						isSelect: false,
						select: 'D'
					},
					isE: {
						option: '资产保值 ',
						isSelect: false,
						select: 'E'
					},
				},
				{
					issue: '2：您对资产管理产品的收益有何预期？',
					keys: 'expected',
					isA: {
						option: '获取微利，但收益保持稳定 ',
						isSelect: false,
						select: 'A'
					},
					isB: {
						option: '获取适度盈利，低于同期股市或期市表现，但波动性小  ',
						isSelect: false,
						select: 'B'
					},
					isC: {
						option: '获取与同期股市或期市相当的收益，但需承受与股市或期市相当的波动性  ',
						isSelect: false,
						select: 'C'
					},
					isD: {
						option: '获取超高收益，但需承受比股市或期市更大的波动  ',
						isSelect: false,
						select: 'D'
					},
					isE: {
						option: '获取超越本金的收益  ',
						isSelect: false,
						select: 'E'
					},
				},
				{
					issue: '3：您一般的投资年限是多久？',
					keys: 'investmentPeriod',
					isA: {
						option: '1年以内',
						isSelect: false,
						select: 'A'
					},
					isB: {
						option: '1年到3年',
						isSelect: false,
						select: 'B'
					},
					isC: {
						option: '3年到5年',
						isSelect: false,
						select: 'C'
					},
					isD: {
						option: '5年到10年',
						isSelect: false,
						select: 'D'
					},
					isE: {
						option: '10年以上',
						isSelect: false,
						select: 'E'
					},
				},
				{
					issue: '4：投资有风险，在金融危机中，市场大幅波动，有些投资品的价格短期内可能大幅下跌。您能够承受的投资组合下跌的极限是多少？',
					keys: 'fallingLimit',
					isA: {
						option: '跌幅10%以下 ',
						isSelect: false,
						select: 'A'
					},
					isB: {
						option: '跌幅介于10-20%  ',
						isSelect: false,
						select: 'B'
					},
					isC: {
						option: '跌幅介于20-30%内  ',
						isSelect: false,
						select: 'C'
					},
					isD: {
						option: '跌幅介于30-50%内  ',
						isSelect: false,
						select: 'D'
					},
					isE: {
						option: '无所谓，我能够承受任何下跌，甚至跌幅超过50%  ',
						isSelect: false,
						select: 'E'
					},
				},
				{
					issue: '5：您对债券、基金、股票、期货四类投资品种，有多少了解？',
					keys: 'understandingInvestments',
					isA: {
						option: '全都不了解 ',
						isSelect: false,
						select: 'A'
					},
					isB: {
						option: '了解一种  ',
						isSelect: false,
						select: 'B'
					},
					isC: {
						option: '了解两种  ',
						isSelect: false,
						select: 'C'
					},
					isD: {
						option: '了解三种  ',
						isSelect: false,
						select: 'D'
					},
					isE: {
						option: '全都了解  ',
						isSelect: false,
						select: 'E'
					},
				},
				{
					issue: '6：您有多少年投资基金、股票、信托、私募证券或金融衍生产品等风险投资品的经验？',
					keys: 'vcExperience',
					isA: {
						option: '没有经验 ',
						isSelect: false,
						select: 'A'
					},
					isB: {
						option: '少于2年 ',
						isSelect: false,
						select: 'B'
					},
					isC: {
						option: '2至5年  ',
						isSelect: false,
						select: 'C'
					},
					isD: {
						option: '5至10年 ',
						isSelect: false,
						select: 'D'
					},
					isE: {
						option: '10年以上  ',
						isSelect: false,
						select: 'E'
					},
				},
				{
					issue: '7：您的金融资产或者最近三年个人年均收入情况?',
					keys: 'monetaryAssetsIncome',
					isA: {
						option: '个人金融资产＜300万元，个人最近三年平均年收入＞50万元 ',
						isSelect: false,
						select: 'A'
					},
					isB: {
						option: '个人金融资产＞300万元，个人最近三年平均年收入＜50万元  ',
						isSelect: false,
						select: 'B'
					},
					isC: {
						option: '个人金融资产＞300万元，个人最近三年平均年收入＞50万元  ',
						isSelect: false,
						select: 'C'
					},
					isD: {
						option: '个人金融资产＞500万元，个人最近三年平均年收入＞100万元及以上  ',
						isSelect: false,
						select: 'D'
					},
					isE: {
						option: '个人金融资产＞500万元，个人最近三年平均年收入＞1000万元及以上  ',
						isSelect: false,
						select: 'E'
					},
				},
				{
					issue: '8：您投资基金(非货币) 、股票或期货的资金占家庭总流动资产的比例？',
					keys: 'investmentRatio',
					isA: {
						option: '不到一成 ',
						isSelect: false,
						select: 'A'
					},
					isB: {
						option: '一至三成左右  ',
						isSelect: false,
						select: 'B'
					},
					isC: {
						option: '三至五成左右  ',
						isSelect: false,
						select: 'C'
					},
					isD: {
						option: '五至八成左右  ',
						isSelect: false,
						select: 'D'
					},
					isE: {
						option: '八成以上  ',
						isSelect: false,
						select: 'E'
					},
				},
				{
					issue: '9：您未来三年的收入成长情况如何？',
					keys: 'incomeGrowth',
					isA: {
						option: '收入状况不固定 ',
						isSelect: false,
						select: 'A'
					},
					isB: {
						option: '因退休或其他因素而减少  ',
						isSelect: false,
						select: 'B'
					},
					isC: {
						option: '成长速度会与通货膨胀率大体一致  ',
						isSelect: false,
						select: 'C'
					},
					isD: {
						option: '成长速度会超过通货膨胀率  ',
						isSelect: false,
						select: 'D'
					},
					isE: {
						option: '预期收入会有较快成长  ',
						isSelect: false,
						select: 'E'
					},
				},
				{
					issue: '10：您如何看待投资亏损？',
					keys: 'treatInvestmentLosses',
					isA: {
						option: '无法接受 ',
						isSelect: false,
						select: 'A'
					},
					isB: {
						option: '很难接受，但不影响正常的生活  ',
						isSelect: false,
						select: 'B'
					},
					isC: {
						option: '对日后的投资受到一定的影响  ',
						isSelect: false,
						select: 'C'
					},
					isD: {
						option: '平常心看待，对情绪没有明显的影响  ',
						isSelect: false,
						select: 'D'
					},
					isE: {
						option: '很正常，投资有风险，没有人只赚不赔 ',
						isSelect: false,
						select: 'E'
					},
				},
			]
			return {
				investorType: '',
				isQualified: false,
				isYes:true,
				issueList: issueList,
				isnextPage:true
			}
		},
		methods: {
			nextPage(){
				let issueList = this.issueList;
				let bool = false;
				
				for(let i = 0, length = 5; i < length; ++i){
					let bo = true;
					let e = issueList[i];
					for(let j = 0, len = keysList.length; j < len; ++j){
						let key = keysList[j];
						if(e[key].isSelect){
							bo = false;
							continue;
						}
					}
					if(bo){
						bool = true;
						break;
					}
				}
				
				if(bool){
					this.$toast('您还有问题未选择')
					return 
				}else{
					this.isnextPage = false;
					uni.pageScrollTo({
						scrollTop: 0
					})
				}
			},
			nextTip(){
				!this.investorType
					?this.$toast('您还未做出选择')
					:this.isYes = false;
			},
			select(s, keys){
				let bool = !s[keys].isSelect;
				
				for(let key in s){
					if(keysList.indexOf(key) !== -1){
						s[key].isSelect = false;
					}
				}
				
				s[keys].isSelect = bool;
			},
			submit(){
				let investorType = this.investorType;
				let params = { investorType };
				let url = 'user/center/qualified/update';
				let issueList = this.issueList;
				let bool = false;
				
				for(let i = 0, length = issueList.length; i < length; ++i){
					let bo = true;
					let e = issueList[i];
					for(let j = 0, len = keysList.length; j < len; ++j){
						let key = keysList[j];
						if(e[key].isSelect){
							bo = false;
							params[e.keys] = e[key].select;
							continue;
						}
					}
					if(bo){
						bool = true;
						break;
					}
				}
				
				if(bool){
					this.$toast('您还有问题未选择')
					return 
				}

				this.$post(url, params)
				.then(res => {
					if(res.code == 200){
						this.$store.dispatch('getUserFn')
						this.$back()
					}else{
						this.$toast(res.message);
					}
				})
			}
		}
	}
</script>

<style scoped>
	.l-title{
		text-align: center;
		padding: 58rpx 0;
		font-weight: 700;
		font-size: 48rpx;
		color: #4c9af6;
	}
	.l-body-item{
		padding: 25rpx;
		font-size: 15px;
		line-height: 1.4;
	}
	
	.l-option{
		margin-top: 30rpx;
		border: 1px solid #EDEDED;
	}
	.l-option-bb{
		border: 1px solid #EDEDED;
	}
	
	.l-issue-item{
		margin-bottom: 50rpx;
	}
	
	.l-option-item{
		padding: 0 17px 0 13px;
		min-height: 50px;
		display: flex;
		align-items: center;
		color: #494949;
		font-size: 15px;
		border-bottom: 1px solid #EDEDED;
	}
	.l-option-item:last-of-type{
		border-bottom: none;
	}
	.l-select{
		/* display: inline-block;
		min-width: 40rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		margin-right: 20rpx;
		border-radius: 50%; */
		min-width: 17px;
		height: 17px;
		margin-right: 5px;
	}
	.l-icon-select{
		background-image: url(~@/static/xzz@2x.png);
	}
	.l-icon-selected{
		background-image: url(~@/static/xz@2x.png);
	}
	.l-select-active{
		background-color: #AC9472;
		color: #FFFFFF;
	}
	
	.l-btn-submit{
		width:100%;
		height:94rpx;
		color: #FFFFFF;
		display: flex;
		font-size: 18px;
		align-items: center;
		justify-content: center;
		background-color: #D3A35C;
		border-radius:47rpx;
	}
	.next{
		background-color: #D3A35C;
		height: 94rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		border-radius: 47rpx;
		margin-top: 106rpx;
	}
	.l-color-70012{
		color: #E70012;
	}
	.l-font-17{
		font-size: 17px;
		font-weight: bold;
	}
	.page{
		font-size: 13px;
		margin-top: 79rpx;
		margin-bottom: 46rpx;
	}
	.l-color-1c46db{
		color: #1c46db;
	}
	.mlmr{
		margin: 0 16rpx;
	}
</style>
