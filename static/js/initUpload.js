var file_md5 = ''; // 用于MD5校验文件
var block_info = []; // 用于跳过已有上传分片

/*初始化上传*/
var uploader = WebUploader.create({
	// 选完文件后，是否自动上传。
	auto: false,
	// swf文件路径
	swf: '../lib/webuploader-0.1.5/Uploader.swf',
	// 文件接收服务端。
	server: '',
	// 选择文件的按钮。可选。
	// 内部根据当前运行是创建，可能是input元素，也可能是flash.
	pick: '#uploadFile',
	// 只允许选择图片文件。
	accept: {
		title: 'Images',
		extensions: 'gif,jpg,jpeg,bmp,png',
		mimeTypes: 'image/*'
	},
	resize: true,
	chunked: true, //开启分片上传
	chunkRetry: 3, // 如果遇到网络错误,重新上传次数
	threads: 1, //上传并发数。允许同时最大上传进程数。
});

// 当有文件被添加进队列的时候-md5序列化
uploader.on('fileQueued', function(file) {

	console.log("正在计算MD5值...",file);
	uploader.md5File(file).then(function(fileMd5) {
		file.wholeMd5 = fileMd5;
		file_md5 = fileMd5;
		console.log("MD5计算完成。");

		// 检查是否有已经上传成功的分片文件
//		$.post('check.php', {
//			md5: file_md5
//		}, function(data) {
//			data = JSON.parse(data);
//
//			// 如果有对应的分片，推入数组
//			if(data.block_info) {
//				for(var i in data.block_info) {
//					block_info.push(data.block_info[i]);
//				}
//				console.log("有断点...");
//			}
//		})
	});
});

// 发送前检查分块,并附加MD5数据
uploader.on('uploadBeforeSend', function(block, data) {
	var file = block.file;
	var deferred = WebUploader.Deferred();

	data.md5value = file.wholeMd5;
	data.status = file.status;

	if($.inArray(block.chunk.toString(), block_info) >= 0) {
		console.log("已有分片.正在跳过分片" + block.chunk.toString());
		deferred.reject();
		deferred.resolve();
		return deferred.promise();
	}
});

uploader.on('uploadSuccess', function(file) {
	//成功
	$.post('merge.php', {
		md5: file.wholeMd5,
		fileName: file.name
	}, function(data) {
		var object = JSON.parse(data);
		if(object.code) {
			console.log("上传成功",file);
		}
	});
});

// 文件上传过程中创建进度条实时显示。
uploader.on('uploadProgress', function(file, percentage) {
	if(percentage>0){
		$("#modelWaitting").fadeIn()
	}
	else if(percentage==1){
		$("#modelWaitting").fadeOut()
	}
	$(".progress-box p").css("width",parseInt(percentage * 100)+"%");
    $(".progress-box span").html(parseInt(percentage * 100) +"%");
});

uploader.on('uploadError', function(file) {
	//失败
	//uploader.retry();
});

uploader.on('uploadComplete', function(file) {
	//完成
});