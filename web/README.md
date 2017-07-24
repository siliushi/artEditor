# web editor
web editor     
     
# 引用     
在页面中引入下面资源     
```     
<link rel="stylesheet" href="../src/style/editor.css">     
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>     
<script src="dist/editor.min.js"></script>     
```     
     
# 使用       
```     
<div id="J_des_container">     
	<div id="J_des_editor"></div>     
</div>     
<script>     
	var editor = new editor('J_des_container','J_des_editor', {placeholder: '<p class="placeholder">请输入疾病概述</p>', imageUpload: "http://127.0.0.1:8080/upload"});    
	// 获取编辑器值     
	editor.getValue();     
	// 设置编辑器值     
	editor.setValue();     
</script>     
```     
     
