var express = require("express");
var app = express();

var url = require("url");
var multer = require ("multer");
var querystring  = require("querystring");

var http = require('http');
var fs = require('fs');

app.use(express.static('../static'));
//要用req.body,需要引入此模块
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var storage = multer.diskStorage({
    //存储文件地方
    destination:function(req,res,cb){
        cb(null,"../static");
    },
    //存储文件名字
    filename: function (req, file, cb) {
        var fileFormat = file.originalname.split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1])
    }
})
//配置上传参数
var upload = multer({
    storage:storage
})

app.all("/*", function(req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})

app.post("/upload",upload.any(),function(req,res){
    //res.append("Access-Control-Allow-Origin","*");
    /*var str="";
    req.on("data",function(data){
        str+=data;
    });
    req.on("end",function(){
        console.log(str);
    });*/
    if(req.files.length==0){
        res.send('');
    }else{
        res.send(req.files[0].filename);
    }
})
app.post("/uploadsecond",upload.any(),function(req,res){
    if(req.files.length==0){
        res.send('');
    }else{
        res.send(req.files[1].filename);
    }
})

//buffer
console.log(Buffer.from('liusong','ascii'));

app.get("/getDemo",function(req,res1){
	http.get("http://ga.sz.gov.cn/", function (res) {
	    var data = "";
	    res.setEncoding('UTF8');
		
	    // 处理流事件 --> data, end, and error
	    res.on('data', function (chunk) {
	        data += chunk;
	    });
	    res.on('end', function () {
			var writeStream = fs.createWriteStream('static/demo.html');
			writeStream.write(data,'utf-8');
			writeStream.end();
			res1.send('ok');
			})
		})
})

//child_process
/* const {execFile} = require('child_process');
const child = execFile('node',['--version'],(err,stdout,stderr) => {
	if(err){
		throw err;
	}
	console.log(stdout);
}) */

const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
async function getV(){
	const {stdout} = await execFile('node',['--version']);
	console.log(1,stdout);
}
getV();

//mock动态数据
app.get("/getPrivateFunds",function(req,res){
	let arr = [];
	for(let i=0;i<10;i++){
		arr.push({name:'中国',earnings:'12.50%'});
	}
	res.send(JSON.stringify(arr));
})

app.post("/getProductFeature",(req,res)=>{
	let arr = [];
	if(req.body.page==2){
		for(let i=0;i<3;i++){
			arr.push({
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'+6.88',
				latestnet:'1.4530',
				netchange:'1年1个月'
				});
		}
	}else{
		for(let i=0;i<3;i++){
			arr.push({
				name:'中战宏观对冲2号',
				tag1:'精选',
				tag2:'股票策略',
				earnings:'+6.88',
				latestnet:'1.4530',
				netchange:'8年6个月'
				});
		}
	}
	res.send(JSON.stringify(arr));
})

app.post("/getMainFeature",(req,res)=>{
	let arr = [];
	if(req.body.id==3){
		for(let i=0;i<3;i++){
			arr.push({
				content:'庵后覅玻尿酸房间爱不是的房价看哈水电费空间哈时代峰峻还款时间的发挥空间啊的说法复活甲',
				title:'国事直通车',
				time:'一小时前',
				img:'../../static/1577935511@2x.png',
				});
		}
	}else{
		for(let i=0;i<3;i++){
			arr.push({
				content:'庵后覅玻尿酸房间爱不是的房价看哈水电费空间哈时代峰峻还款时间的发挥空间啊的说法复活甲',
				title:'国事直通车',
				time:'两小时前',
				img:'../../static/1577935511@2x.png',
				});
		}
	}
	res.send(JSON.stringify(arr));
})
app.listen(1701);
console.log("开启服务器");