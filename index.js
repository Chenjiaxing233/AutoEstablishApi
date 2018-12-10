const http = require('http');
const fs = require('fs');
const commons = require('./common/commons')

let pageUrl = 'http://192.168.1.169:8080/atom/v2/api-docs'

http.get(pageUrl, function(res) {
    var html = '';
    res.on('data', function(data) {
        html += data;
    });
    res.on('end', function() {
        //console.log('html',html);
        fs.readdir('./',function(err,file){
            if(err){
                throw err;
            }
            if(file.indexOf('api')==1){
                //console.log('删除api')
                commons.deleteall('./api')
            }else{
                fs.mkdir('./api',function(err){
                    if(err){
                        throw err;
                    }
                    //console.log('创建新文件夹成功！')
                    let data = html.replace('<Json>','');
                    data = data.replace('</Json>','')
                    commons.write(data);
                })
            }
        })
    
    });
});
