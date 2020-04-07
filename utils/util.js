const $nav = (option, str) => {
	option = option ? option : {};
	try {
		str = str ? str : 'navigateTo'
		uni[str]({
			url: option.url,
			success() {
				option.success && option.success();
			},
			fail() {
				option.fail && option.fail();
			},
			complete() {
				option.complete && option.complete();
			}
		})
	} catch (e) {
		//TODO handle the exception
		console.log(e);
	}
}

const $back = (delta, option) => {
	option = option ? option : {};
	try {
		uni.navigateBack({
			delta: delta || 1,
			success() {
				option.success && option.success();
			},
			fail() {
				option.fail && option.fail();
			},
			complete() {
				option.complete && option.complete();
			}
		})
	} catch (e) {
		//TODO handle the exception
	}
}

const $setStorage = (key, value) => {
	if (!key) {
		throw new Error('请填写正确的key值');
	}
	try {
		uni.setStorageSync(key, value);
	} catch (e) {
		//TODO handle the exception
		throw e
	}
}

const $getStorage = (key) => {
	if (!key) {
		throw new Error('请填写正确的key值');
	}
	try {
		return uni.getStorageSync(key);
	} catch (e) {
		//TODO handle the exception
		throw e
	}
}

const $removeStorage = (key) => {
	if (!key) {
		throw new Error('请填写正确的key值');
	}
	try {
		return uni.removeStorageSync(key);
	} catch (e) {
		//TODO handle the exception
		throw e
	}
}

const $toast = (str, option) => {
	if (!str) {
		throw new Error('请填写正确的提示');
	}
	option = option ? option : {};
	uni.showToast({
		title: str,
		icon: 'none',
		duration: option.duration ? option.duration : 2000,
		success: option.fn?option.fn:()=>{}
	})
}

const $showModal = (str, option) => {
	if (!str) {
		throw new Error('请填写正确的提示');
	}
	option = option ? option : {};
	uni.showModal({
		title: option.title ? option.title : '提示',
		content: str,
		confirmText: option.confirmText || '确定',
		success(res) {
			if (res.confirm) {
				option.success && option.success()
			} else {
				option.error && option.error()
			}
		}
	})
}

const $getDuration = (str) => {
	let num = typeof str === 'number' ? str : +str;
	let h = 3600;
	let m = 60;
	let duration = '';

	let hh = 0;
	if (num >= h) {
		let d = Math.floor(num / h);
		hh = num - d * h;
		duration = d > 9 ? d + ":" : "0" + d + ":";
	} else {
		hh = num;
		duration = '00:';
	}
	let mm = 0;
	if (hh >= m) {
		let d = Math.floor(hh / m);
		mm = hh - d * m;
		duration += d > 9 ? d + ":" : "0" + d + ":";
	} else {
		if (hh > 0) {
			mm = num;
		}
		duration += '00:';
	}

	if (mm >= 0) {
		let d = mm;
		duration += d > 9 ? d : "0" + d;
	} else {
		duration += '00';
	}

	return duration
}

const $yymmdd = (str, type = 'ymd',join = '/') => {
	let date = typeof str === 'string' ? new Date(str.replace(/\-/g, '/')) : str ? new Date(str) : new Date();
	if(type === 'ymd'){
		return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(e => e > 9 ? e : '0'+ e).join(join)
	}
	if(type === 'ym'){
		return [date.getFullYear(), date.getMonth() + 1].map(e => e > 9 ? e : '0'+ e).join(join)
	}
	if(type === 'md'){
		return [date.getMonth() + 1, date.getDate()].map(e => e > 9 ? e : '0'+ e).join(join)
	}
	return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(e => e > 9 ? e : '0'+ e).join(join)
}

const $formatting = (str) => {
	let date = new Date(str);
	let ymd = [date.getFullYear(),date.getMonth()+1,date.getDate()].map(e => e > 9 ? e : '0' + e).join('/')
	return ymd + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].map(e => e > 9 ? e : '0' + e).join(':');
}

const $formatDay = (str) => {
	let days = typeof str === 'number' ? str : +str;
	let yy = 365;
	let mm = 30;
	let dayStr = '';
	let y = 0;
	if (days >= yy) {
		let d = Math.floor(days / yy);
		y = days - d * yy;
		dayStr = d + '年';
	}

	if (y >= mm) {
		let d = Math.floor(y / mm);
		dayStr += d + '个月';
	} else {
		dayStr += '1个月';
	}

	return dayStr;
}

const $getBeforDate = (y = 0, m = 0) => {
	let nowDate = new Date();
	let mm = nowDate.getMonth() + 1;
	let mmm = mm <= m ? (++y, mm + 12 - m) : mm - m;
	let yyy = nowDate.getFullYear() - y;
	return [yyy, mmm, nowDate.getDate()].join('-');
}

const $dateDiff = (timestamp) => {
	// 补全为13位
	var arrTimestamp = (timestamp + '').split('');
	for (var start = 0; start < 13; start++) {
		if (!arrTimestamp[start]) {
			arrTimestamp[start] = '0';
		}
	}
	timestamp = arrTimestamp.join('') * 1;
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime();
	var diffValue = now - timestamp;

	// 如果本地时间反而小于变量时间
	if (diffValue < 0) {
		return '不久前';
	}
	// 计算差异时间的量级
	var monthC = diffValue / month;
	var weekC = diffValue / (7 * day);
	var dayC = diffValue / day;
	var hourC = diffValue / hour;
	var minC = diffValue / minute;

	// 数值补0方法
	var zero = function(value) {
		if (value < 10) {
			return '0' + value;
		}
		return value;
	};

	// 使用
	if (monthC > 4) {
		// 超过1年，直接显示年月日
		return (function() {
			var date = new Date(timestamp);
			return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
		})();
	} else if (monthC >= 1) {
		return parseInt(monthC) + "月前";
	} else if (weekC >= 1) {
		return parseInt(weekC) + "周前";
	} else if (dayC >= 1) {
		return parseInt(dayC) + "天前";
	} else if (hourC >= 1) {
		return parseInt(hourC) + "小时前";
	} else if (minC >= 1) {
		return parseInt(minC) + "分钟前";
	}
	return '刚刚';
};

const $pageList = (num = 2) => {
	let pages = getCurrentPages();
	let page = pages[pages.length - num];
	// #ifdef H5
	return page;
	// #endif
	// #ifdef APP-PLUS
	return page.$vm;
	// #endif
}

export default {
	$nav,
	$back,
	$toast,
	$yymmdd,
	$pageList,
	$dateDiff,
	$showModal,
	$setStorage,
	$getStorage,
	$removeStorage,
	$getDuration,
	$formatting,
	$formatDay,
	$getBeforDate
}
