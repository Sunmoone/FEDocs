var fs = require('fs');
var paths = [];
var jsonSource = "./jsonFile/config.json";        // source define dir tree
var pathKey = "pathID";                       // each leavel pathname
var destination = "./temp";               // mkdir to where
var subset = "subset";
fs.readFile(jsonSource,"utf8",function(err,data){
	if(err) throw err
	var webTree = eval(data);

	function getPath(arr,uppath){
		var uppath = uppath || '.';
		for(var i=0,l=arr.length;i<l;i++){
			if(arr[i][subset]){
				arguments.callee(arr[i][subset], uppath+"/"+arr[i][pathKey])
			} else {
				paths.push(uppath+"/"+arr[i][pathKey])
			}
		}
	}
	getPath(webTree,destination);
	fs.writeFile("mkdirLog.txt",new Date()+"\n"+paths)        // write log
	mkdirs(paths);
});

// 输入Url 创建目录
function mkdir(url,mode,cb){
	var path = require("path"),
		arr = url.split("/"),
		mode = mode || 0755,
		cb = cb || function(){};
	if(arr[0]==="."){
		arr.shift();
	}
	if(arr[0]===".."){
		arr.splice(0,2,arr[0]+"/"+arr[1]);
	}
	function inner(cur){
		if(!fs.existsSync(cur)){
			fs.mkdirSync(cur, mode)
		}
		if(arr.length){
			inner(cur+"/"+arr.shift())
		}else{
			fs.writeFileSync(cur+"/index.html",cur, 'utf8');　　// 写入当前路径到index文件
			cb()		//callback
		}
	}
	arr.length && inner(arr.shift());
}

// 输入Url Array创建目录
function mkdirs(urls){
	for(var i=0,l=urls.length; i<l; i++){
		mkdir(urls[i], 0755,function(){              // mode not work in windows??
			console.log("mkdir: "+urls[i])
		});
	}
}


/**********exports mkdir(url) / mkdirs(urls)************/

/**********(need disabled fs.readFile block line7-line24)************/

module.exports = {
	mkdirs: function(urls){
		return mkdirs(urls)
	},
	mkdir: function(url){
		return mkdir(url)
	}
};