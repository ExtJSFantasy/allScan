// 请求

const main = {
	mdRequst(requestUrl, params, type, successCallback, errCallback) {
		uni.request({
			url: requestUrl,
			data: params,
			method: type,
			header: {
				'content-type': 'application/json' // 默认值
			},
			success: (res) => {
				successCallback(res)
			},
			fail: (err) => {
				errCallback(err)
			}
		});
	}
}

module.exports = main;
