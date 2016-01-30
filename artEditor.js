/**
 * 移动端富文本编辑器
 * @author ganzw@gmail.com
 * @url    https://github.com/baixuexiyang/artEditor
 */
$.fn.extend({
	_opt: {
		placeholader: '<p>请输入文章正文内容</p>',
		validHtml: [],
		limitSize: 3,
		showServer: false
	},
	artEditor: function(options) {
		var _this = this,
			styles = {
				"-webkit-user-select": "text",
				"user-select": "text",
				"overflow-y": "auto",
				"text-break": "brak-all",
				"outline": "none"
			};
		$(this).css(styles).attr("contenteditable", true);
		_this._opt = $.extend(_this._opt, options);
		try{
			$(_this._opt.imgTar).on('change', function(e) {
				var file  = e.target.files[0];
				if(Math.ceil(file.size/1024/1024) > _this._opt.limitSize) {
					console.error('文件太大');
					return;
				}
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (f) {
                	if(_this._opt.showServer) {
                		_this.upload(f.target.result);
                		return ;
                	}
            		var img = '<img src="'+ f.target.result +'" style="width:90%;" />';
            	    _this.insertImage(img);
                };
			});
			_this.placeholderHandler();
			_this.pasteHandler();
		} catch(e) {
			console.log(e);
		}
	},
	upload: function(data) {
		var _this = this, filed = _this._opt.uploadField;
		$.ajax({
			url: _this._opt.uploadUrl,
			type: 'post',
			data: $.extend(_this._opt.data, {filed: data}),
			cache: false
		})
		.then(function(res) {
			var src = _this._opt.uploadSuccess(res);
			if(src) {
				var img = '<img src="'+ src +'" style="width:90%;" />';
			    _this.insertImage(img);
			} else {
				_this._opt.uploadError(res);
			}
		});
	},
	insertImage: function(src) {
	    $(this).focus();
		var selection = window.getSelection ? window.getSelection() : document.selection;
		var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
		if (!window.getSelection) {
		    range.pasteHTML(src);
		    range.collapse(false);
		    range.select();
		} else {
		    range.collapse(false);
		    var hasR = range.createContextualFragment(src);
		    var hasLastChild = hasR.lastChild;
		    while (hasLastChild && hasLastChild.nodeName.toLowerCase() == "br" && hasLastChild.previousSibling && hasLastChild.previousSibling.nodeName.toLowerCase() == "br") {
		        var e = hasLastChild;
		        hasLastChild = hasLastChild.previousSibling;
		        hasR.removeChild(e);
		    }
		    range.insertNode(range.createContextualFragment("<br/>"));
		    range.insertNode(hasR);
		    if (hasLastChild) {
		        range.setEndAfter(hasLastChild);
		        range.setStartAfter(hasLastChild);
		    }
		    selection.removeAllRanges();
		    selection.addRange(range);
		}
	},
	pasteHandler: function() {
		var _this = this;
		$(this).on("paste", function() {
			/*var content = $(this).html();
			valiHTML = _this._opt.validHtml;
			content = content.replace(/_moz_dirty=""/gi, "").replace(/\[/g, "[[-").replace(/\]/g, "-]]").replace(/<\/ ?tr[^>]*>/gi, "[br]").replace(/<\/ ?td[^>]*>/gi, "&nbsp;&nbsp;").replace(/<(ul|dl|ol)[^>]*>/gi, "[br]").replace(/<(li|dd)[^>]*>/gi, "[br]").replace(/<p [^>]*>/gi, "[br]").replace(new RegExp("<(/?(?:" + valiHTML.join("|") + ")[^>]*)>", "gi"), "[$1]").replace(new RegExp('<span([^>]*class="?at"?[^>]*)>', "gi"), "[span$1]").replace(/<[^>]*>/g, "").replace(/\[\[\-/g, "[").replace(/\-\]\]/g, "]").replace(new RegExp("\\[(/?(?:" + valiHTML.join("|") + "|img|span)[^\\]]*)\\]", "gi"), "<$1>");
			if (!/firefox/.test(navigator.userAgent.toLowerCase())) {
			    content = content.replace(/\r?\n/gi, "<br>");
			}
			$(this).html(content);*/
		});
	},
	placeholderHandler: function() {
		var _this = this;
		$(this).on('focus', function() {
			if($.trim($(this).html()) === _this._opt.placeholader) {
				$(this).html('');
			}
		})
		.on('blur', function() {
			if(!$(this).html()) {
				$(this).html(_this._opt.placeholader);
			}
		});

		if(!$.trim($(this).html())) {
			$(this).html(_this._opt.placeholader);
		}
	},
	getValue: function() {
		return $(this).html();
	},
	setValue: function(str) {
		$(this).html(str);
	}
});
