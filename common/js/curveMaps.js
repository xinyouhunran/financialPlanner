let dataLineSize = 1;
let dataLineSize1 = 2;

class curveMaps {
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
			padding: [20 , 10, 20, 60],
			reservedSpaceX: 40,
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
			xAxisAll: [],
			series:[],
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
			yScaleSize: 0,
			coordList: [],
			yTextList: [],
			scaleDataArr: [],
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
		// this.getScaleFn();
		// this.drawMap();
		// this.draw();
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
			context,
			dotColor,
			reservedSpace,
			fontTxtSize,
			option,
			padding,
			xyTxtColor,
			reservedSpaceY,
			reservedSpaceX,
			dataLineXColor,
			dataBGColor,
			scaleDataArr,
			yTextList,
			yLineList,
			xLineList,
			xScaleList,
			unit,
			yScaleSize,
			dataLineSize,
			textAndDotSpace,
			fontFamily
		} = this;
		
		let lineColor = ['#ff0000', '#00aaff', '#ffaa00', '#ff00ff', '#aaff00', '#aa5500'];
		this.dataLineXColor = Array.from(new Set(dataLineXColor.concat(lineColor)));
		
		if(!0){
			let num = (spaceX + xWidth);
			let reservedSpaceX = padding[1] + padding[3]
			let length = Math.floor((width - reservedSpaceX) / num);
			for (let i = 0; i < length; i++) {
				xLineList.push(i * num + padding[3]);
			}
		}
		
		if(!0){
			let series = option.series;
			let scaleDataArr = [];
			series.forEach(e => {
				scaleDataArr = scaleDataArr.concat(e.data);
			})
			this.scaleDataArr = scaleDataArr;
			this.tooltipWidth = (width / 2);
			this.setScaleFn()
		}
		if(!0){
			let scale = this.scale + 1;
			let spaceY = Math.floor((height - reservedSpaceY * 2) / scale);
			for (let i = 0; i < scale; i++) {
				yLineList.push(i * spaceY + reservedSpaceY);
			}
		}
		
		let xAxisAll = option.xAxisAll;
		
		if(!0){
			let xLength = xAxisAll.length;
			if(xLength - 1){
				let allWidth = xLineList[xLineList.length - 1] - xLineList[0];
				let xScaleSize = this.xScaleSize = parseFloat((allWidth / (xLength - 1)).toFixed(8));
				for (var i = 0; i < xLength; i++) {
					xScaleList.push(parseFloat((xScaleSize * i + padding[3]).toFixed(8)))
				}
			}
		}
		
		if(!0){
			let yTextList = this.yTextList;
			if(yTextList.length - 1){
				let series = option.series;
				let dataList = series.map(e => e.data);
				let xAxisList = series.map(e => e.xAxis);
				let nameList = series.map(e => e.name);
				this.coordList = [];
				
				let maxValue = yTextList[0];
				let minValue = yTextList[yTextList.length - 1];
				let yLinePage = yLineList[yLineList.length - 1] - padding[0];
				let maxHeight  = Math.abs(maxValue - minValue);
				let yScaleSize = this.yScaleSize = parseFloat((yLinePage / maxHeight).toFixed(8));
				
				xAxisList.forEach((xAxis, xAxisIndex) => {
					xAxis.forEach((date, idx) => {
						let index = xAxisAll.indexOf(date);
						let x = xScaleList[index];
						let data = dataList[xAxisIndex][idx];
						let y = Math.floor((maxValue - data) * yScaleSize + padding[0] + xHeight);
						if(!this.coordList[xAxisIndex]){
							this.coordList[xAxisIndex] = [];
						}
						this.coordList[xAxisIndex][idx] = { x, y }
					})
				})
			}
		}
		
		this.drawMap();
		this.draw()
		
		return
	}
	
	drawMap(){
		let {
			unit ,
			context,
			yLineList,
			xLineList,
			dotColor,
			xWidth,
			xHeight,
			width,
			height,
			option,
			xyTxtColor,
			lineHeight,
			fontTxtSize,
			fontFamily,
			yTextList,
			coordList,
			dataLineSize,
			dataLineXColor,
			textAndDotSpace
		} = this;
		context.clearRect(0, 0, width, height);
		let xAxisAll = option.xAxisAll;
		context.fillStyle = dotColor;
		yLineList.forEach((yLine, yIndex) => {
			xLineList.forEach((xLine, xIndex) => {
				context.fillRect(xLine, yLine, xWidth, xHeight)
			})
		})
		
		context.fillStyle = xyTxtColor;
		context.textAlign = 'end';
		context.textBaseline = 'middle';
		context.font = fontTxtSize + fontFamily;
		
		let x = xLineList[0] - textAndDotSpace;
		yLineList.forEach((y, i) => {
			context.fillText(yTextList[i] + unit, x, y);
		})
		context.textAlign = 'start';
		context.textBaseline = 'top';
		context.fillText(xAxisAll[0], xLineList[0], yLineList[yLineList.length - 1] + lineHeight);
		context.textAlign = 'end';
		context.textBaseline = 'top';
		context.fillText(xAxisAll[xAxisAll.length - 1], xLineList[xLineList.length - 1], yLineList[yLineList.length - 1] + lineHeight);
		
		context.lineWidth = dataLineSize;
		let series =option.series;
		coordList.forEach((item, index) => {
			context.beginPath();
			context.strokeStyle = dataLineXColor[index];
			for (var i = 1, length = item.length; i < length; i++) {
				let yy = item[i - 1].y;
				let xx = item[i - 1].x;
				let yy1 = item[i].y;
				let xx1 = item[i].x;
				
				let ax = (xx1 - xx) / 3;
				let bx = xx + ax;
				let bx1 = xx + ax * 2;
				context.moveTo(xx, yy);
				context.bezierCurveTo(bx, yy, bx1, yy1, xx1, yy1);
			}
			context.stroke();
		})
	}
	
	setScaleFn(){
		let arr = this.scaleDataArr;
		if(!arr.length){
			this.scale = 5
			return
		}
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
		
		this.yTextList = [...Array((this.scale || 0) + 1).keys()]
		.map(e => max3 ? parseFloat((((e - num) * sp10) / 10).toFixed(2)) : parseFloat(((e - num) * sp10).toFixed(2)))
		.reverse();
		
	}

	

	/**
	 * 悬停线
	 */
	drawMouseTooltipLine() {
		if (!this.isTouch()) return;
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
			dataLineXColor,
			xScaleList,
			yScaleList,
			fontTxtSize,
			lineHeight,
			fontFamily,
			textIndent,
			context,
			option,
			unit,
			width,
			xScaleSize,
			padding,
			coordList,
			tooltipWidth
		} = this;
		let touchIndex = 0
		if(!0){
			for (var i = 1, length = xScaleList.length; i < length; i++) {
				let xx = xScaleList[i - 1];
				let xx1 = xScaleList[i];
				if(touchX <= xx && i == 1){
					touchIndex = 0;
					break;
				}
				if(xx <= touchX && xx1 >= touchX){
					touchIndex = i;
					break;
				}else if(touchX >= xx1 && i == length - 1){
					touchIndex = length - 1;
					break;
				}
			}
		}
		context.beginPath();
		context.strokeStyle = 'rgba(0,0,0,0.3)';
		context.lineTo(xScaleList[touchIndex], yLineList[0]);
		context.lineTo(xScaleList[touchIndex], yLineList[yLineList.length - 1]);
		context.stroke();
		let title = option.xAxisAll[touchIndex];
		let series = option.series;
		let idxList = [];
		let xScaleSize2 = xScaleSize / 2;
		coordList.forEach((list, index) => {
			let minx = list[0].x;
			let maxx = list[list.length - 1].x;
			let xAxis = series[index].xAxis
			let idx = xAxis.indexOf(title);
			if(idx !== -1){
				idxList[index] = idx;
			}else{
				idxList[index] = null;
			}
		})
		
		if(!idxList.filter(e => e >= 0).length) return
		
		let f2 = this.fontTxtSize * 2;
		let dateY =  yLineList[0] + lineHeight + textIndent;
		let dif = 0;
		let txtLength = title.length * (fontTxtSize * 0.8);
		this.tooltipWidth = txtLength + f2 + textIndent * 2;
		idxList.forEach((index, idx)=> {
			if(index !== null){
				let name = series[idx].name;
				let number = series[idx].data[index];
				let title = name + ':' + number + unit;
				let txtLength = title.length * (fontTxtSize * 0.8);
				if(txtLength + f2 + textIndent * 2 > this.tooltipWidth){
					this.tooltipWidth = txtLength + f2 + textIndent * 2;
				}
			}else{
				dif++;
			}
		})
		this.tooltipHeight = (fontTxtSize + lineHeight) * (coordList.length + 1 - dif) + lineHeight;
		context.beginPath()
		context.fillStyle = 'rgba(0,0,0,0.5)';
		this.roundRect(xLineList[0], yLineList[0], this.tooltipWidth, this.tooltipHeight, 3);
		context.fill();
		context.beginPath()
		context.textAlign = 'start';
		context.textBaseline = 'middle';
		if(!0){
			context.font = fontTxtSize + fontFamily;
			context.fillStyle = '#FFFFFF'
			let x = xLineList[0] + textIndent;
			context.fillText(title, x, dateY);
		}
		dif = 0;
		idxList.forEach((index, idx)=> {
			if(index !== null){
				let name = series[idx].name;
				let number = series[idx].data[index];
				let y = coordList[idx][index].y
				let x = xScaleList[touchIndex]
				context.beginPath();
				context.fillStyle = dataLineXColor[idx];
				context.globalAlpha = 0.3;
				context.arc(x, y, fontTxtSize / 2, 0, 2 * Math.PI);
				context.fill();
					
				context.beginPath();
				context.globalAlpha = 1;
				context.fillStyle = '#FFFFFF';
				context.arc(x, y, fontTxtSize / 4 + 0.5, 0, 2 * Math.PI);
				context.fill();
					
				context.beginPath();
				context.globalAlpha = 1;
				context.fillStyle = dataLineXColor[idx];
				context.arc(x, y, fontTxtSize / 4, 0, 2 * Math.PI);
				context.fill();
				context.beginPath();
				
				context.fillStyle = '#FFFFFF';
				
				let title = name + ':' + number + unit;
				let xx = xLineList[0] + textIndent;
				let yy = dateY +  (textIndent * 2) * (idx + 1 - dif);
				context.font = fontTxtSize + fontFamily;
				context.fillText(title, xx + textIndent * 2, yy);
				
				context.beginPath();
				context.fillStyle = dataLineXColor[idx];
				context.arc(xx + textIndent / 2, yy, fontTxtSize / 4, 0, 2 * Math.PI);
				context.fill();
			}else{
				dif++;
			}
		})
		
	}

}


export default {
	init(parmas){
		return new curveMaps(parmas)
	}
} 



