const fs = require('fs'); // 引入fs模块

function deleteall(path) {
	var files = [];
	if (fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function (file, index) {
			var curPath = path + "/" + file;
			if (fs.statSync(curPath).isDirectory()) { // recurse
				deleteall(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};

function write(data) {
	let json = JSON.parse(data);
	let tags = json.tags //需要创建的文件名称 {"name": "spec-controller", "description": "Spec Controller"}
	let paths = json.paths

	tags.map(item => {

		fs.writeFile('./api/' + item.name + '.js', "import {postRequest} from '../../src/api/api'", {
			flag: "a"
		}, function (err) {
			if (err) {
				throw err
			}
		})
	})
	getWriteInfo(paths);
};

function getWriteInfo(paths) {
	//console.log(typeof(paths));
	let keys = Object.keys(paths); //获取所有的key值
	console.log(keys);
	keys.map(item => {
		let parameters = paths[item].post.parameters;
		let name = item.split('/');
		name = name[name.length - 1] ==='{skuId}'?name[name.length - 2]:name[name.length - 1];
		let path = `'${item}'`; //接口路径
		let fileName = './api/' + paths[item].post.tags + '.js' //要写入值的文件名
		if(parameters){
			path = otherName(parameters)
	}
		let fileContent = `
//${paths[item].post.summary}
export function ${name}(params,success) {
	let path = ${path};
	postRequest(path, params, success);
}
		
`;
		fs.writeFile(fileName, fileContent, {flag: "a"}, function (err) {
			if (err) {
				throw err
			}
		})
	})
}

function otherName(parameters){	
	let path
	parameters.map(item1 => {
		if (item1.name == 'page' || item1.name == 'pageSize' || item1.name == 'pageIndex') {
			path = `'${item}?page='+params.pageIndex + '&pageSize=' + params.pageSize;`
		}else if(item1.name=='skuId'){
			let a =DeepCopy(item)
			a = a.replace('{skuId}','')
			path = `'${a}'+params;`
		}
	})
	return path;
}

function DeepCopy(params) {
	let json = JSON.stringify(params);
	let obj = JSON.parse(json);
	return obj;
  }
module.exports = {
	deleteall,
	write
}