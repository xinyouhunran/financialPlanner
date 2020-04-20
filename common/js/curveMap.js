let dataLineSize = 1;
let dataLineSize1 = 2;

class curveMap {
	constructor(arg) {
		let config = {
			el: null,
			option: {
				dataset: {
					source:[]
				}
			},
			context: {},
			width: 375,
			height: 250,
			reservedSpaceY: 30,
			reservedSpace: 55,
			textAndDotSpace: 10,
			spaceX: 4,
			spaceY: 70,
			keys: 'ctx',
			xWidth: 1,
			unit: '',
			xHeight: 1,
			fontFamily: 'px 宋体',
			lineHeight: 10,
			textIndent: 10,
			fontTxtSize: 12,
			xAxisListLength: 0,
			xScaleListLength: 0,
			scale: 5,
			retracement:{},//用于绘制最大回撤
			fontTxtSize: 12,
			xScaleSize: 0,
			xScaleSizeOriginal: 0,
			xyTxtColor: '#666666',
			dotColor: '#666666',
			dataLineXColor: [],
			dataBGColor: [],
			dataDotSize: 1,
			dataLineSize,
			tooltipWidth: 0
		}
		
		let config1 = {
			xLineList: [],
			yLineList: [],
			yAxisList: [],
			xAxisList: [],
			touchX: 0,
			touchY: 0,
			timeout: null,
			yScaleList: [],
			xScaleList: [],
			lineText: [],
			max: 0,
			min: 0,
			drawDataList: [],
		}
		
		let options = Object.assign({}, config, config1, arg || {});
		for (let key in options) {
			this[key] = options[key];
		}
		
		// 绑定事件
		if (this.el && this.el.addEventListener) {
			this.el.addEventListener('touchstart', touchstart, false);
			this.el.addEventListener('touchmove', touchmove, false);
			this.el.addEventListener('touchend', touchend, false);
			this.el.addEventListener('mouseout', mouseout, false);
			this.el.addEventListener('mousemove', mousemove, false);
		}
		this.init();
	}

	init() {
		this.proceData();
		this.getScaleFn();
		this.drawMap();
		this.draw();
	}

	draw() {
		let context = this.context;
		// #ifdef H5
		setTimeout(() => {
			context.draw(true);
		},100)
		// #endif
		// #ifndef H5
		context.draw(true);
		// #endif
		
	}


	proceData() {

		let {
			xWidth,
			xHeight,
			spaceX,
			width,
			height,
			scale,
			reservedSpace,
			fontTxtSize,
			option,
			dataLineXColor,
			dataBGColor
		} = this;
		
		let lineColor = ['#ff0000', '#00aaff', '#ffaa00', '#ff00ff', '#aaff00', '#aa5500'];
		this.dataLineXColor = Array.from(new Set(dataLineXColor.concat(lineColor)));

		scale = scale + 1;

		let xScaleListLength = this.xScaleListLength = option.dataset.source[0].length - 1;

		this.productName = option.dataset.source[0];
		this.productName = this.productName.filter((e, i) => i != 0);
		this.xAxisListLength = this.productName.length;
		
		if(this.retracement.date){
			this.retracement.index = this.productName.indexOf(this.retracement.date);
			let str = this.retracement.str = `历史最大回撤(${ this.retracement.data + this.unit || '-0%' })`;
			this.retracement.txtSize = this.context.measureText(str).width || str.length * this.fontTxtSize + str.length;
		}

		let length = (width - reservedSpace - fontTxtSize) / (xWidth + spaceX);
		for (let i = 0; i < length; i++) {
			this.xLineList.push(i * (spaceX + xWidth) + reservedSpace);
		}

		let xScaleAll = this.xLineList[this.xLineList.length - 1];

		let xScaleSize = this.xScaleSizeOriginal = this.xScaleSize = 
		parseFloat(((xScaleAll - reservedSpace) / (xScaleListLength - 1)).toFixed(2));
		console.log(xScaleSize)
		this.xScaleList = [...Array(xScaleListLength).keys()].map(i => Math.floor(i * xScaleSize + reservedSpace));
		
	}

	getScaleFn() {
		let source = JSON.parse(JSON.stringify(this.option.dataset.source));

		source.shift();
		source.forEach(e => {
			this.lineText.push(e.shift())
		});

		this.productList = JSON.parse(JSON.stringify(source));

		let arr = this.scaleArr = [].concat.apply([], source);

		let magic = [10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100]; //魔数数组经过扩充，放宽魔数限制避免出现取不到魔数的情况。

		let kedu = this.scale;

		let max = this.max = arr.length ? Math.max.apply(null, arr) ? Math.max.apply(null, arr) : 5 : 5; //调用js已有函数计算出最大值
		let min = this.min = arr.length ? Math.min.apply(null, arr) ? Math.min.apply(null, arr) : 0 : 0; //计算出最小值

		let tempGap = max - min ? max - min : max ? max : 10;

		let tg = tempGap > kedu ? tempGap / kedu : tempGap;

		let max3 = max < 5 && min > 0;
		let l10 = 0;
		if(max3){
			l10 = Math.floor(Math.log10(Math.abs(max)))
		}else{
			l10 = Math.floor(Math.log10(Math.abs(tg)));
		}
		
		let pow = Math.pow(10, l10)
		
		let max10 = Math.ceil(tempGap / pow);
		
		if(max3){
			max10 = max;
			magic = magic.map(e => e / 10);
		}
		
		let estep = magic[0];
		
		let i = 0;
		while (magic[i]) {
			if (magic[i] > max10) {
				estep = magic[i];
				break;
			}
			i++;
		}
		let splace = 0;
		while (1) {
			let s = 0;
			if(max3){
			   s = this.scale / 10;
			}else{
			   s =  this.scale;
			}
			if (estep%s === 0) {
				splace = estep / s;
				break;
			}
			this.scale++;
		}
		
		let num = 0;
		let num1 = 0;
		let sp10 = splace * pow;
		
		if (min < 0 && max > 0) {
			num = Math.ceil(Math.abs(min) / sp10);
			num1 = Math.ceil(Math.abs(max) / sp10);
			this.scale = num + num1;
		}
		
		if (max <= 0) {
			num = Math.ceil(Math.abs(min) / sp10);
			this.scale = num;
		}

		let YText = this.yTextList = [...Array((this.scale || 0) + 1).keys()].map(e => max3 ? parseFloat((((e - num) * sp10) / 10).toFixed(2)) : parseFloat(((e - num) * sp10).toFixed(2))).reverse();

		let scale = this.scale + 1;
		let reservedSpace = this.reservedSpace;
		let height = this.height;
		let reservedSpaceY = this.reservedSpaceY;
		let spaceY = this.spaceY = Math.floor((height - reservedSpaceY) / scale);

		for (let i = 0; i < scale; i++) {
			this.yLineList[i] = i * spaceY + reservedSpaceY;
		}

		this.xAxisLength = (this.width - this.reservedSpace) / 2;

		// 刻度最大值最小值
		let minData = YText[YText.length - 1];
		let maxScaleList = YText[0];
		// Y刻度总高度
		let yHeight = this.yLineList[this.yLineList.length - 1] - reservedSpaceY;
		if(yHeight == 0){
			yHeight = this.spaceY;
		}
		let yScaleSize = this.yScaleSize = 0;
		// 当刻度最大值是0或者负数的时候
		if (YText[0] <= 0 && min < 0) {
			this.yScaleSize = yScaleSize = parseFloat((yHeight / (Math.abs(minData) - Math.abs(maxScaleList))).toFixed(8));
			source.forEach((data,idx) => {
				let list = data;
				this.yScaleList[idx] = (list.map(e => e === null || e === undefined ? undefined : Math.floor((Math.abs(e)) * yScaleSize + this.reservedSpaceY + this.xWidth * 2)));
			})
		} else {
			this.yScaleSize = yScaleSize = parseFloat((yHeight / (maxScaleList - minData)).toFixed(8));
			source.forEach((data,idx) => {
				let list = data;
				this.yScaleList[idx] = (list.map(e => e === null || e === undefined ? undefined : Math.floor((maxScaleList - e) * yScaleSize + this.reservedSpaceY + this.xWidth * 2 )));
			})
		}
	}


	/**
	 * 悬停线
	 */
	drawMouseTooltipLine() {
		if (!this.isTouch()) return;
		if(!this.xAxisListLength) return
		this.dataLineSize = dataLineSize1;

		this.drawMap();
		this.drawMouseTooltip();
		this.draw();
	}

	/**
	 * 用于判断是否是在图指定区域里
	 * @return {Boolean} true在指定区域里
	 */
	isTouch() {
		let xLineList = this.xLineList;
		let yLineList = this.yLineList;
		let touchX = this.touchX;
		let touchY = this.touchY;

		let maxX = xLineList[xLineList.length - 1];
		let minX = xLineList[0];
		let maxY = yLineList[yLineList.length - 1];
		let minY = yLineList[0];

		return (
			touchX >= minX && touchX <= maxX &&
			touchY >= minY && touchY <= maxY
		)
	}
	/**
	 * 获取数据点下标
	 */
	getBigValueMin(array, x) {
		for (let i = 1, length = array.length; i <= length; i++) {
			if(i == length) return i - 1;
			if (array[i - 1] <= x && array[i] > x) {
				return i - 1;
			}
		}
		return array.length - 1;
	}
	/**
	 * 绘制圆角矩形
	 */
	roundRect(x, y, w, h, r) {
		if (w < 2 * r) r = w / 2;
		if (h < 2 * r) r = h / 2;
		let context = this.context;
		context.beginPath();
		context.moveTo(x + r, y);
		context.arcTo(x + w, y, x + w, y + h, r);
		context.arcTo(x + w, y + h, x, y + h, r);
		context.arcTo(x, y + h, x, y, r);
		context.arcTo(x, y, x + w, y, r);
		context.closePath();
	}
	/**
	 * 绘制悬停圈
	 * 绘制坐标点数据
	 */
	drawMouseTooltip() {
		let {
			xLineList,
			yLineList,
			touchX,
			productList,
			dataLineXColor,
			xScaleList,
			yScaleList,
			fontTxtSize,
			lineHeight,
			fontFamily,
			textIndent,
			productName,
			xAxisListLength,
			context
		} = this;
		let minXValue = xLineList[0];
		let minYValue = yLineList[0];
		
		let index = this.touchIndex = this.getBigValueMin(xScaleList, touchX);
		let xBool = xAxisListLength > 1;
		let number = xBool ? (xScaleList[1] - xScaleList[0]) / 2 : xScaleList[1] - xScaleList[0];
		number = number > 6 ? number : 6;
		if(xBool){
			if(touchX > xScaleList[index] + number && xScaleList.length - 1 > index){
				index++;
			}
		}else{
			index = 0;
		}
		
		context.beginPath();
		context.strokeStyle = 'rgba(0,0,0,0.3)';
		let xB = xBool ? xScaleList[index] : xScaleList[1];
		context.lineTo(xB, this.yLineList[0]);
		context.lineTo(xB, this.yLineList[this.yLineList.length - 1]);
		context.stroke();
		
		let bool = touchX > xScaleList[index] - number && touchX < xScaleList[index] + number;

		// tip长度
		context.textAlign = 'start';
		context.textBaseline = 'middle';
		context.fillStyle = '#FFFFFF';
		let measure = context.measureText(productName[index]).width;
		let tooltipWidth = measure ? measure + this.fontTxtSize * 2 : (this.width - this.reservedSpace) / 2;
		this.tooltipWidth = tooltipWidth > this.tooltipWidth ? tooltipWidth : this.tooltipWidth;
		let idxx = 0;
		productList.forEach((e, i) => {
			let dataTxt = e;
			if(dataTxt[index] === null || dataTxt[index] === undefined){
				idxx++;
			}
			let title = (this.lineText[i] || '') + ':' + dataTxt[index];
			let measure = context.measureText(title).width || title.length * (this.fontTxtSize * 0.6);
			let tooltipWidth = measure ? measure + this.fontTxtSize * 2 + minXValue : (this.width - this.reservedSpace) / 2;
			if (tooltipWidth > this.tooltipWidth) {
				this.tooltipWidth = tooltipWidth;
			}
		})
		this.tooltipHeight = (fontTxtSize + lineHeight) * (productList.length + 1 - idxx) + lineHeight;
		context.beginPath()
		context.fillStyle = 'rgba(0,0,0,0.5)';
		this.roundRect(minXValue, minYValue, this.tooltipWidth, this.tooltipHeight, 3);
		context.fill();

		// context.beginPath()
		// context.strokeStyle = 'rgba(220,65,55,1)';
		// context.moveTo(minXValue, minYValue);
		// context.lineTo(minXValue + this.tooltipWidth, minYValue);
		// context.lineTo(minXValue + this.tooltipWidth, minYValue + this.tooltipHeight);
		// context.lineTo(minXValue, minYValue + this.tooltipHeight);
		// context.closePath()
		// context.stroke();

		context.beginPath()
		context.fillStyle = '#FFFFFF';
		context.font = this.fontTxtSize + this.fontFamily;
		context.fillText(productName[index], minXValue + textIndent, minYValue + lineHeight + textIndent / 2);
		let x = 0;
		let y = 0;
		let idx = 0;
		productList.forEach((e, i) => {
			let dataTxt = e;
			if(dataTxt[index] === null || dataTxt[index] === undefined){
				return
			}
			let num = ++idx;
			context.beginPath();
			if (bool) {
				
				context.fillStyle = dataLineXColor[i];
				context.globalAlpha = 0.3;
				context.arc(xB, yScaleList[i][index], fontTxtSize / 2, 0, 2 * Math.PI);
				context.fill();
					
				context.beginPath();
				context.globalAlpha = 1;
				context.fillStyle = '#FFFFFF';
				context.arc(xB, yScaleList[i][index], fontTxtSize / 4 + 0.5, 0, 2 * Math.PI);
				context.fill();
					
				context.beginPath();
				context.globalAlpha = 1;
				context.fillStyle = dataLineXColor[i];
				context.arc(xB, yScaleList[i][index], fontTxtSize / 4, 0, 2 * Math.PI);
				context.fill();
			}
			context.beginPath();
			context.fillStyle = '#FFF';
			let title = (this.lineText[i] || '') + ':' + dataTxt[index] + this.unit;
			x = minXValue + textIndent;
			
			y = minYValue + (fontTxtSize + lineHeight) * num + textIndent / 2;
			context.font = fontTxtSize + fontFamily;
			context.fillText(title, x + textIndent * 2, y + lineHeight);
			
			context.beginPath();
			context.fillStyle = dataLineXColor[i];
			context.arc(x + textIndent / 2, y + lineHeight, fontTxtSize / 4, 0, 2 * Math.PI);
			context.fill();
			
			
		})
	}
	/**
	 * 绘制统计图刻度XY轴曲线线条
	 */
	drawMap() {
		let {
			xLineList,
			yLineList,
			yAxisList,
			xAxisList,
			touchX,
			touchY,
			timeout,
			yScaleList,
			xScaleList,
			max,
			min,
			xWidth,
			dataLineSize,
			dataLineXColor,
			xHeight,
			context,
			dotColor,
			fontTxtSize,
			xyTxtColor,
			fontFamily,
			xAxisListLength,
			reservedSpace,
			drawDataList,
			productName,
			yTextList,
			datBGIndex,
			dataBGColor,
			retracement,
			textAndDotSpace
		} = this;

		context.clearRect(0, 0, this.width, this.height);
		/*
		 * 绘制X 线点
		 */
		context.fillStyle = dotColor;
		yLineList.forEach((y, i) => {
			xLineList.forEach((x, j) => {
				context.fillRect(x - xWidth * 2, y + xHeight * 2, xWidth, xHeight);
			})
		})
		/*
		 * 绘制y文本
		 */
		let x = reservedSpace - textAndDotSpace;
		context.fillStyle = xyTxtColor;
		context.textAlign = 'end';
		context.textBaseline = 'middle';
		yLineList.forEach((y, i) => {
			context.font = fontTxtSize + fontFamily;
			context.fillText(yTextList[i]+ this.unit, x, y);
		})
		/*
		 * 绘制X文本
		 */
		context.textAlign = 'start';
		context.textBaseline = 'middle';
		context.font = fontTxtSize + fontFamily;

		context.fillText(productName[0] || '', xLineList[0],
			yLineList[yLineList.length - 1] + fontTxtSize);

		context.font = fontTxtSize + fontFamily;
		context.textAlign = 'end';

		context.fillText(productName[productName.length - 1] || '',
			xLineList[xLineList.length - 1], yLineList[yLineList.length - 1] + fontTxtSize);

		context.lineWidth = dataLineSize;
		/*
		 * 绘制bg颜色
		 */
		if (dataBGColor.length) {
			let indexOf0 = this.yTextList.indexOf(0);
			let index0 = this.yLineList[indexOf0];

			let gradient = xAxisListLength ? context.createLinearGradient(xScaleList[0], yLineList[0], xScaleList[0], yLineList[yLineList.length - 1]) : '';

			let datBGIndex = dataBGColor.map(e => e.index);
			yScaleList.forEach((yD, yI) => {
				if (datBGIndex.indexOf(yI) !== -1) {
					dataBGColor.forEach((e, i) => {
						if (e.index == yI) {
							let bg = e.bg || [{
								key: 0,
								value: 'rgba(231, 0, 18, 0.5)'
							}, {
								key: 1,
								value: 'rgba(231, 0, 18, 0.1)'
							}];
							if (typeof bg === 'string') {
								gradient = bg;
							} else {
								bg.forEach((ee, ii) => {
									if(gradient){
										gradient.addColorStop(ee.key, ee.value);
									}
								})
							}
						}
					})
					context.fillStyle = gradient || 'rgba(231, 0, 18, 0.5)';
					for (var i = 1, length = xScaleList.length; i < length; i++) {
						let xx = xScaleList[i - 1];
						let yy = yD[i - 1];
						let xx1 = xScaleList[i];
						let yy1 = yD[i];
						
						let ax = (xx1 - xx) / 3;
						let bx = xx + ax;
						let bx1 = xx + ax * 2;

						context.beginPath();
						context.moveTo(xx, yy);
						context.bezierCurveTo(bx, yy, bx1, yy1, xx1, yy1);

						context.lineTo(xx1, index0 + this.xHeight * 2)
						context.lineTo(xx, index0 + this.xHeight * 2)
						context.lineTo(xx, yy)
						context.fill();
					}
				}
			})
		}
		let bool = !!retracement.str;
		/*
		 * 绘制曲线
		 */
		yScaleList.forEach((yD, yI) => {
			context.beginPath();
			context.strokeStyle = dataLineXColor[yI];
			for (var i = 1, length = yD.length; i < length; i++) {
				let yy = yD[i - 1];
				let xx = xScaleList[i - 1];
				let xx1 = xScaleList[i];
				let yy1 = yD[i];
				
				let ax = (xx1 - xx) / 3;
				let bx = xx + ax;
				let bx1 = xx + ax * 2;
				context.moveTo(xx,yy)
				context.bezierCurveTo(bx, yy, bx1, yy1, xx1, yy1);
			}
			context.stroke();
		})
		if(bool){
			context.beginPath();
			context.fillStyle = '#f75861';
			xLineList.forEach((x, j) => {
				if(j%2 == 0 || j == 0){
					context.fillRect(x, yScaleList[0][retracement.index], xWidth * 4, xHeight);
				}
			})
			context.fillStyle = '#000000';
			context.font = fontTxtSize + fontFamily;
			context.textAlign = 'end';
			context.fillText(retracement.str,xLineList[xLineList.length - 1], yScaleList[0][retracement.index] + fontTxtSize);
		}

	}

}


export default {
	init(parmas){
		return new curveMap(parmas)
	}
} 



