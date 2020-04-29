/* const $baseUrl = 'http://120.24.108.106:9090/'//'http://112.74.30.157:9090/'//'http://localhost:1701/';

const $avatar = 'http://47.105.69.23/file/default.png';

const config = {
	$baseUrl,
	$avatar
}

export default config */
const $base = 'http://47.115.30.217'//'http://120.24.108.106''http://47.115.30.217''http://192.168.1.27'//本地---开发---正式：  
const config = {
	$baseUrl: `${ $base }:9092/`,
	$pcUrl: `${ $base }:7070/`,
	$avatarImg: `${ $base }:7788/emoji/`,
	$baseImgUrl: `${ $base }:7788/`,
	$h5Url: `${ $base }/#/`,
	$versions: '2.0.0',
	$appDownload: `${ $base }:7788/steward.apk`
}

export default config

// http://112.74.30.157:9090/swagger-ui.html#/%E4%BA%A7%E5%93%81%E4%B8%9A%E5%8A%A1/hostSearchUsingGET