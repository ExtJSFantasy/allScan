const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
// 判断数据类型
const isType = obj => {
	var type = Object.prototype.toString.call(obj);
	if (type == '[object Array]') {
		return 'Array';
	} else if (type == '[object Object]') {
		return "Object"
	} else {
		return 'param is no object type';
	}
}
const formatTimeYMD = date => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	const day = date.getDate();

	return [year, month, day].map(formatNumber).join('-')
}
const getDateStr = AddDayCount => {
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1; //获取当前月份的日期 
	m = m < 10 ? '0' + m : m;
	var d = dd.getDate();
	d = d < 10 ? ('0' + d) : d;
	return y + "-" + m + "-" + d;
}
module.exports = {
	formatTime,
	isType,
	formatTimeYMD,
	getDateStr
}
