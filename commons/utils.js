const speechContant = require('@/commons/contants');
const main = require('@/commons/main');
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
const Audio2dataURL = async (path) => {
	return await new Promise((resolve,reject) => {
		plus.io.resolveLocalFileSystemURL(path, function(entry) {
			entry.file(function(file) {
				var reader = new plus.io.FileReader();
				reader.onloadend = function(e) {
					let obj = {};
					obj.speech = e.target.result.split(',')[1];
					obj.len = file.size;
					resolve(obj)
				};
				reader.readAsDataURL(file);
			}, function(e) {
				uni.showToast({
					title: '读写出现异常'
				})
			})
		})
	})
}
const dataURL2Audio = (base64Str) => {
	var base64Str = base64Str.replace('data:audio/amr;base64,', '');
	var audioName = (new Date()).valueOf() + '.amr';

	plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
		fs.root.getFile(audioName, {
			create: true
		}, function(entry) {
			// 获得平台绝对路径
			var fullPath = entry.fullPath;
			if (uni.getSystemInfoSync().platform === 'android') {
				// 读取音频
				var Base64 = plus.android.importClass("android.util.Base64");
				var FileOutputStream = plus.android.importClass("java.io.FileOutputStream");
				try {
					var out = new FileOutputStream(fullPath);
					var bytes = Base64.decode(base64Str, Base64.DEFAULT);
					out.write(bytes);
					out.close();
					// 回调
					//callback && callback(entry);
					return entry
				} catch (e) {
					console.log(e.message);
				}
			} else if (uni.getSystemInfoSync().platform === 'ios') {
				var NSData = plus.ios.importClass('NSData');
				var nsData = new NSData();
				nsData = nsData.initWithBase64EncodedStringoptions(base64Str, 0);
				if (nsData) {
					nsData.plusCallMethod({
						writeToFile: fullPath,
						atomically: true
					});
					plus.ios.deleteObject(nsData);
				}
				// 回调
				// callback && callback(entry);
				return entry
			}
		})
	})
}
const getToken = () => {
	let params = `grant_type=${speechContant.grant_type}&client_id=${speechContant.APIkey}&client_secret=${speechContant.SecretKey}`;
	let tokenP = new Promise((resolve, reject) => {
		main.mdRequst(speechContant.token_url, params, 'POST', (success) => {
			uni.setStorageSync('speechToken',success.data.access_token)
			resolve(success)
		}, (err) => {
			console.log(err, '22222');
		})
	})
	return tokenP
}
const getStorageToken = () => {
	return uni.getStorageSync('speechToken')
}
module.exports = {
	formatTime,
	isType,
	formatTimeYMD,
	getDateStr,
	Audio2dataURL,
	dataURL2Audio,
	getToken,
	getStorageToken
}
