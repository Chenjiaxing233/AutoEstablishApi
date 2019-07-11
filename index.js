const http = require('http');
const fs = require('fs');
const commons = require('./common/commons')
let loginUrl = '***'
let pageUrl = '***'

http.get(loginUrl,(res)=>{
    res.on('data',(data)=>{
        console.log(data)
        console.log(data.toString('utf8'));
    });
    res.on('end',()=>{})
})

// http.get(pageUrl, function(res) {
//     var html = '';
//     res.on('data', function(data) {
//         html += data;
//     });
//     res.on('end', function() {
//         console.log('html',html);
//         fs.readdir('./',function(err,file){
//             if(err){
//                 throw err;
//             }
//             console.log(file)
//             if(file.indexOf('api')>-1){
//                 console.log('删除api')
//                 commons.deleteall('./api')
//                 commons.writeApi(html)
//             }else{
//                 commons.writeApi(html)
//             }
//         })
    
//     });
// });
