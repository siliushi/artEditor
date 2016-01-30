# artEditor   
artEditor是一款基于jQuery的移动端富文本编辑器，支持插入图片，后续完善其他功能。   
[demo](http://baixuexiyang.github.io/artEditor/)，为了更好的效果请将浏览器设置为手机模式        
# 引用
在页面中引入下面资源   
```
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>     
<script src="artEditor.min.js"></script>       
```   
    
# Options  
### imgTar  
  图片上传按钮     
### limitSize   
  图片最大限制，默认3兆   
### showServer    
  显示从服务端返回的图片，默认是显示本地资源的图片       
### uploadUrl    
  图片上传路劲       
### data    
  上传图片其他参数       
### uploadField    
  上传图片字段       
### placeholader    
  富文本编辑器holder       
### validHtml    
  粘贴时，去除不合法的html标签       
### uploadSuccess    
  图片上传成功回调       
### uploadError    
  图片上传失败回调       
    

# Methods      
  
### getValue   
    获取值，$('#content').getValue()    
### setValue   
    设置值，$('#content').setValue('<div></div>')    
    
     
# Example
html:
```
<div class="article-content" id="content">
</div>
```
js:

```
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
```

# Issues  
[new Issue](https://github.com/baixuexiyang/artEditor/issues/new)


# Release    
 +增加获取值和设置值的方法
 +去掉粘贴时过滤不允许的HTML标签
 +插入图片自动换行     
