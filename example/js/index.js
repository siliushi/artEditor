$(function() {
	"use strict";

	$('#content').artEditor({
		imgTar: '#imageUpload',
		limitSize: 5,   // 兆
		showServer: false,
		uploadUrl: '',
		data: {},
		uploadField: 'image',
		placeholader: '<p>请输入文章正文内容</p>',
		validHtml: ["br"],
		uploadSuccess: function(res) {
			// return img url
			return res.path;
		},
		uploadError: function(res) {
			// something error
			console.log(res);
		}
	});
});
